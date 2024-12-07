import React from "react";

interface CompanyButtonProps {
  name: string;
  img: string;
  openModal: () => void;
  setCompany: () => void;
}

const CompanyButton = ({ name, img, openModal, setCompany }: CompanyButtonProps) => {
  const handleComapny = () => {
    setCompany()
    openModal()
  }
  return (
    <button
      onClick={handleComapny}
      className={`w-96 h-48 bg-white shadow-[3px_3px_20px_-5px_rgba(0,0,0,0.3)] rounded-md bg-cover bg-no-repeat`}
      style={{ backgroundImage: img }}
      title={name}
    ></button>
  );
};

export default CompanyButton;
