import React from "react";

interface BalanceProps {
  balanceNum: number;
  setBalance: (balance: number) => void;
  openModalForm: () => void;
  onClose: () => void;
}

const Balance = ({ balanceNum, setBalance, openModalForm, onClose }: BalanceProps) => {
  const handleBalance = () => {
    setBalance(balanceNum);
    openModalForm();
    onClose()
  };
  return (
    <button
      onClick={handleBalance}
      className="w-10/12 h-5/6 bg-[#1F6B71] rounded-md text-white text-3xl font-bold"
    >
      ${balanceNum}
    </button>
  );
};

export default Balance;
