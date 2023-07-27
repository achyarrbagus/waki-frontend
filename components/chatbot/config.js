import { createChatBotMessage } from "react-chatbot-kit";
import Header from "@/components/chatbot/widget/Header";
import Botavatar from "@/components/chatbot/widget/Botavatar";
import NamaOrtu from "@/components/chatbot/widget/NamaOrtu";
import StatusVaksin from "@/components/chatbot/widget/StatusVaksin";
import Data_anak from "@/components/chatbot/widget/Data_anak";
import No_hp from "@/components/chatbot/widget/No_hp";
import HpBelumVaksin from "@/components/chatbot/widget/HpBelumVaksin";
import Link_profile from "@/components/chatbot/widget/Link_profile";
import DetailAnakAfterSubmit from "./widget/GetVaksinAnak";
import GetVaksinAnak from "./widget/GetVaksinAnak";
// import Contact from "./widgets/Contact";
// import MedicineDelivery from "./widgets/MedicineDelivery";
// import CoBotAvatar from "./CoBotAvatar";

const config = {
  lang: "id",
  botName: "Vaksini",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#E8F4F7",
    },
    chatButton: {
      backgroundColor: "#ffffff",
    },
  },
  initialMessages: [
    createChatBotMessage(`Halo selamat datang!`, {
      delay: 100,
    }),
    createChatBotMessage(
      `Saya Vaksini siap membantu Anda untuk cek status vaksin anak Anda.`,
      {
        delay: 200,
      },
    ),
    createChatBotMessage("Sebelumnya, Vaksini berbicara dengan siapa?", {
      withAvatar: false,
      delay: 300,
      widget: "NamaOrtu",
    }),
  ],
  customComponents: {
    // Replaces the default header
    header: () => <Header />,
    botAvatar: (props) => <Botavatar {...props} />,
  },
  state: {
    NamaOrtu: "",
    nama: "",
    gender: "",
    dateofbirth: "",
    usia: "",
  },
  widgets: [
    {
      widgetName: "NamaOrtu",
      widgetFunc: (props) => <NamaOrtu {...props} />,
      mapStateToProps: ["NamaOrtu"],
    },
    {
      widgetName: "StatusVaksin",
      widgetFunc: (props) => <StatusVaksin {...props} />,
      mapStateToProps: ["NamaOrtu"],
    },
    {
      widgetName: "Data_anak",
      widgetFunc: (props) => <Data_anak {...props} />,
    },
    {
      widgetName: "GetVaksinAnak",
      widgetFunc: (props) => <GetVaksinAnak {...props} />,
    },
    {
      widgetName: "No_hp",
      widgetFunc: (props) => <No_hp {...props} />,
    },
    {
      widgetName: "HpBelumVaksin",
      widgetFunc: (props) => <HpBelumVaksin {...props} />,
    },
    {
      widgetName: "Link_profile",
      widgetFunc: (props) => <Link_profile {...props} />,
    },
  ],

  //     {
  //       widgetName: "globalStatistics",
  //       widgetFunc: (props) => <GlobalStatistics />
  //     },
  //     {
  //       widgetName: "localStatistics",
  //       widgetFunc: (props) => <LocalStatistics />
  //     },
  //     {
  //       widgetName: "emergencyContact",
  //       widgetFunc: (props) => <Contact />
  //     },
  //     {
  //       widgetName: "medicineDelivery",
  //       widgetFunc: (props) => <MedicineDelivery />
  //     }
};

export default config;
