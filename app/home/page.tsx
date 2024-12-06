"use client";
import React, { useActionState, useState } from "react";
import RootLayout from "../layout";
import HeaderHome from "@/components/home/HeaderHome";
import { cellularCarriers } from "../../constants/home/cellularCarriers";
import CompanyButton from "@/components/home/CompanyButton";
import Image from "next/image";
import BalanceOptions from "@/components/balanceOptions/BalanceOptions";
import CellphoneForm from "@/components/cellphoneForm/CellphoneForm";
import { sendBalance } from "./action";

const Page = () => {
  const [state, action] = useActionState(sendBalance, undefined);
  const cellularCarriersOptions = cellularCarriers;
  const [showModal, setShowModal] = useState(false);
  const [showModalForm, setShowModalForm] = useState(false);
  const [balance, setBalance] = useState(0);
  console.log(balance);

  const handleSendBalance = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      action(formData); // Asegúrate de que action devuelva la respuesta

    } catch (error) {
      console.error("Error en el envío del formulario:", error);
    }
  };

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
