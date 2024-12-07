"use server";

import { FormState, BalanceFormSchema } from "../lib/definitions";

export async function sendBalance(formData: FormData): Promise<FormState> {
  // 1. Validate form fields

  const { cellphone, cellphoneConfirm, balance, company } = {
    cellphone: formData.get("cellphone"),
    cellphoneConfirm: formData.get("cellphoneConfirm"),
    balance: formData.get("balance"),
    company: formData.get("company"),
  };

  const validatedFields = BalanceFormSchema.safeParse({
    cellphone,
    cellphoneConfirm,
    balance,
    company,
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  let res = null;
  const cellphoneForm = formatearNumero(validatedFields.data.cellphone);
  const balanceForm = parseFloat(validatedFields.data.balance);
  switch (company) {
    case "movilstart":
      res = await patchBalanceMS(cellphoneForm, balanceForm);
      break;
    case "aserrin":
      break;
    case "ososCarpinteroTelec":
      break;

    default:
      break;
  }
  if (res === null) {
    return { message: "Algo salio mal" };
  } else if (res.status === 200) {
    const messageString = JSON.stringify(res.message);
    const resTransaction = await sendTransaction(
      cellphoneForm,
      balanceForm,
      validatedFields.data.company,
      messageString
    );
    console.log(resTransaction);
    
    if (resTransaction.status === 201) {
      return { res: res };
    }
  }
  return { message: "Algo salio mal" };
}

const patchBalanceMS = async (cellphone: string, balance: number) => {
  try {
    const res = await fetch("http://localhost:8000/api", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cellphone, balance }),
    });

    if (res.ok) {
      return await res.json();
    } else {
      console.error("Error durante la solicitud PATCH:", res);
      return null;
    }
  } catch (error) {
    console.error("Error durante fetch:", error);
    return null;
  }
};

function formatearNumero(numero: string): string {
  // Asegúrate de que el número tenga exactamente 10 caracteres
  if (numero.length !== 10) {
    throw new Error("El número debe tener exactamente 10 dígitos.");
  } // Divide la cadena en las partes requeridas
  const parte1 = numero.slice(0, 3);
  const parte2 = numero.slice(3, 6);
  const parte3 = numero.slice(6, 10); // Forma el número con el formato requerido
  return `${parte1}-${parte2}-${parte3}`;
}

const sendTransaction = async (
  cellphone: string,
  balance: number,
  company: string,
  resAPI: string
) => {
  try {
    const res = await fetch("http://localhost:3000/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cellphone,
        amount: balance,
        company,
        res: resAPI,
      }),
    });

    if (res.ok) {
      return await res.json();
    } else {
      console.error("Error durante la solicitud PATCH:", res);
      return null;
    }
  } catch (error) {
    console.error("Error durante fetch:", error);
    return null;
  }
};

// const dateNow = () => {
//   const today = new Date();
//   const day = today.getDate();
//   const month = today.getMonth() + 1; // Los meses empiezan desde 0
//   const year = today.getFullYear();
//   return `${day}/${month}/${year}`;
// };
