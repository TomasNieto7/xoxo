"use client";
import React, { useEffect, useState } from "react";
import RootLayout from "../layout";
import HeaderHome from "@/components/home/HeaderHome";
import { cellularCarriers } from "../../constants/home/cellularCarriers";
import CompanyButton from "@/components/home/CompanyButton";
import Image from "next/image";
import BalanceOptions from "@/components/balanceOptions/BalanceOptions";
import CellphoneForm from "@/components/cellphoneForm/CellphoneForm";
import { sendBalance } from "./action";
import { FormState } from "../lib/definitions";

const Page = () => {
  // Tu hook useActionState
  const [state, setState] = useState<FormState>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  // Otros hooks y estados
  const cellularCarriersOptions = cellularCarriers;
  const [showModal, setShowModal] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [balance, setBalance] = useState(0);
  const [company, setCompany] = useState("");

  // Manejo del envío del balance
  const handleSendBalance = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("balance", balance.toString());
    formData.append("company", company);

    setIsLoading(true);
    try {
      const response = await sendBalance(formData);
      setState(response);
      console.log(isLoading);
    } catch (error) {
      console.error("Error en el envío del balance:", error);
      setState({ res: { status: 500, message: "Error en el servidor" } });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state?.message) alert(state.message)
    if (state?.res?.status === 404) alert("Telefono no existe");
    else if (state?.res?.status === 200) {
      alert("Recarga realizada");
      setShowModalForm(false);
    }
  }, [state]);

  return (
    <RootLayout>
      <div className="w-screen h-screen flex flex-col">
        <HeaderHome />
        <main className="flex flex-col w-full grow">
          <h2 className="text-xl font-bold w-full flex justify-center items-center h-20">
            Seleccione una opcion
          </h2>
          <section className="grow min-w-[50vw] max-w-[70vw] flex justify-around items-center pl-10">
            {cellularCarriersOptions.map((cellularCarrier, index) => (
              <CompanyButton
                key={index}
                name={cellularCarrier.name}
                img={cellularCarrier.img}
                openModal={() => setShowModal(true)}
                setCompany={() => setCompany(cellularCarrier.name)}
              />
            ))}
            <BalanceOptions
              show={showModal}
              onClose={() => setShowModal(false)}
              setBalance={(balance) => setBalance(balance)}
              openModalForm={() => setShowModalForm(true)}
            />
            <CellphoneForm
              show={showModalForm}
              onClose={() => setShowModalForm(false)}
              sendBalance={handleSendBalance}
              state={state}
            />
          </section>
          <section className="w-full flex justify-end pr-5 select-none">
            <Image
              src={"/home/gatoGrande.png"}
              width={500}
              height={24}
              className=""
              alt=""
            />
          </section>
        </main>
      </div>
    </RootLayout>
  );
};

export default Page;
