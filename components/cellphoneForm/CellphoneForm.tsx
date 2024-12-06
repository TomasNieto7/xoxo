import { FormState } from "@/app/lib/definitions";
import React, { useEffect } from "react";

interface CellphoneFormProps {
  show: boolean;
  onClose: () => void;
  sendBalance: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  state: FormState;
}

const CellphoneForm = ({ show, onClose, sendBalance, state }: CellphoneFormProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  if (!show) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        className="bg-white p-8 rounded shadow-lg w-[30vw] h-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold w-full flex justify-center items-center h-auto">
          Ingrese los datos
        </h2>
        <form
          onSubmit={sendBalance}
          className="w-full h-auto min-h-56 flex flex-col justify-around items-center"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="cellphone">Número de teléfono</label>
            <input
              type="text"
              id="cellphone"
              name="cellphone"
              className="bg-[#D9D9D9] rounded h-[5vh]"
            />
            {state?.errors?.cellphone && (
              <div className="text-[0.7rem] text-red-500 mb-1">
                <ul>
                  {state.errors.cellphone.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="cellphoneConfirm">Confirmar teléfono</label>
            <input
              type="text"
              id="cellphoneConfirm"
              name="cellphoneConfirm"
              className="bg-[#D9D9D9] rounded h-[5vh]"
            />
            {state?.errors?.cellphoneConfirm && (
              <div className="text-[0.7rem] text-red-500 mb-1">
                <ul>
                  {state.errors.cellphoneConfirm.map((error) => (
                    <li key={error}>- {error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button>Realizar recarga</button>
        </form>
      </div>
    </div>
  );
};

export default CellphoneForm;
