
import React from "react";

interface CompanyButtonProps {
  name: string;
  img: string;
}

const CompanyButton = ({ name, img }: CompanyButtonProps) => {
    console.log(name);
    
  return (
    <button className={`w-96 h-48 bg-white shadow-[3px_3px_20px_-5px_rgba(0,0,0,0.3)] rounded-md bg-cover`}
    style={{ backgroundImage: img }} title={name}>
    </button>
  );
};

export default CompanyButton;
