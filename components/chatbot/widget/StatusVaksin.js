import Options from "@/components/chatbot/widget/Options";
import { useState, useContext } from "react";
import AppContext from "@/components/AppContext";

const StatusVaksin = (props) => {
  const options = [
    {
      name: "Sudah",
      handler: props.actionProvider.handleSudahVaksin,
      id: 1,
    },
    {
      name: "Belum",
      handler: props.actionProvider.handleBelumVaksin,
      id: 2,
    },
  ];

  return (
    <>
      <Options options={options} title="" />
    </>
  );
};

export default StatusVaksin;
