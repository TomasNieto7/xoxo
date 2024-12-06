import React from "react";
import { useEffect } from "react";
import Balance from "./Balance";

interface BalanceOptionsProps {
  show: boolean;
  onClose: () => void;
  setBalance: (balance:number) => void;
  openModalForm: () => void;
}

const BalanceOptions = ({ show, onClose, setBalance, openModalForm }: BalanceOptionsProps) => {
  const balances = [20, 30, 50, 100, 200];
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
        className="bg-white p-4 rounded shadow-lg w-[50vw] h-[50vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold w-full flex justify-center items-center h-20">
          Seleccione una opcion
        </h2>
        <div className="w-full grow grid grid-cols-3 place-items-center">
          {balances.map((balance, index) => (
            <Balance key={index} balanceNum={balance} setBalance={setBalance} openModalForm={openModalForm} onClose={onClose}/>
          ))}
          <div className="w-7/12 h-5/6 bg-cover bg-no-repeat" style={{ backgroundImage: "url('/balance/gatoBalance.png')" }}>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceOptions;
