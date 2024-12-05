import React from "react";
import RootLayout from "../layout";
import HeaderHome from "@/components/home/HeaderHome";
import { cellularCarriers } from '../../constants/home/cellularCarriers';
import CompanyButton from "@/components/home/CompanyButton";
import Image from "next/image";

const page = () => {
    const cellularCarriersOptions = cellularCarriers
  return (
    <RootLayout>
      <div className="w-screen h-screen flex flex-col">
        <HeaderHome />
        <main className="flex flex-col w-full grow">
            <h2 className="text-xl font-bold w-full flex justify-center items-center h-20">Seleccione una opcion</h2>
            <section className="grow min-w-[50vw] max-w-[70vw] flex justify-around items-center pl-10">
                {cellularCarriersOptions.map((cellularCarrier, index)=>(<CompanyButton key={index} name={cellularCarrier.name} img={cellularCarrier.img}/>))}
            </section>
            <section className="w-full flex justify-end pr-5 select-none">
                <Image src={'/home/gatoGrande.png'} width={500} height={24} className="" alt=""/>
            </section>
        </main>
      </div>
    </RootLayout>
  );
};

export default page;
