import Options from "@/components/chatbot/widget/Options";

const NamaOrtu = (props) => {
  const options = [
    {
      name: "Bunda : Nama",
      handler: props.actionProvider.handleBunda,
      id: 1,
    },
    {
      name: "Ayah : Nama",
      handler: props.actionProvider.handleAyah,
      id: 2,
    },
  ];
  return <Options options={options} title="" />;
};

export default NamaOrtu;
