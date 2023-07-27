import { useContext, useEffect } from "react";
import AppContext from "@/components/AppContext";
import moment, { months } from "moment";

class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    state,
    moment,
    context,
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.state = state;
    this.createClientMessage = createClientMessage;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    this.context = useContext(AppContext);
  }

  setChatbotMessage = (messages) => {
    if (Array.isArray(messages)) {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, ...messages],
      }));
    } else {
      this.setState((state) => ({
        ...state,
        messages: [...state.messages, messages],
      }));
    }
  };

  greet = (botMessage) => {
    const message = this.createChatBotMessage(botMessage);
    this.addMessageToState(message);
  };

  clientMessage = (clientMessage) => {
    const message = this.createClientMessage(clientMessage);
    this.addMessageToState(message);
  };

  messageHandler = () => {
    const message = this.createChatBotMessage("Hello,what do you want ?");
    this.setChatbotMessage(message);
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage("Please try again");
    this.setChatbotMessage(message);
  };

  addMessageToState = (message) => {
    this.setState((prevstate) => ({
      ...prevstate,
      messages: [...prevstate.messages, message],
    }));
  };

  handleAyah = (props) => {
    var els = document.querySelector(
      'input[class="react-chatbot-kit-chat-input"]',
    );
    els.focus();
    els.value = "ayah: ";
  };

  handleBunda = () => {
    var els = document.querySelector(
      'input[class="react-chatbot-kit-chat-input"]',
    );
    els.focus();
    els.value = "bunda: ";
  };

  handleVaksinStatus = (props) => {
    this.setState((state) => ({ ...state, NamaOrtu: props }));

    const message = this.createChatBotMessage(
      `Apakah ${props} sudah pernah cek status vaksin anak Anda di Cepat Sehat?`,
      {
        widget: "StatusVaksin",
      },
    );
    this.addMessageToState(message);
    let wordInput = props.split(": ");
    let namaOrtu = [...wordInput];
    console.log(namaOrtu[1]);
    this.context.setNamaOrtu(namaOrtu[1]);
  };

  handleSudahVaksin = (props) => {
    const message = this.createClientMessage("Sudah");
    this.addMessageToState(message);
    const message2 = this.createChatBotMessage(
      `Silahkan masukkan nomor handphone ${this.state.NamaOrtu} yang telah terdaftar.`,
      {
        widget: "No_hp",
      },
      {
        delay: 300,
      },
    );
    this.addMessageToState(message2);
  };

  handleBelumVaksin = (props) => {
    const message = this.createClientMessage("Belum");
    this.addMessageToState(message);
    const message2 = this.createChatBotMessage(
      `Baik, Vaksini membutuhkan data diri anak ${this.state.NamaOrtu}. Silahkan masukkan data anak ${this.state.NamaOrtu}:`,
      {
        widget: "Data_anak",
      },
      {
        delay: 300,
      },
    );
    this.addMessageToState(message2);
  };

  // getAge(dateString) {
  //   var ageInMilliseconds = new Date() - new Date(dateString);
  //   return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  // }

  getUmur(dateString) {
    let ageMs = Date.parse(Date()) - Date.parse(dateString);
    let age = new Date();
    age.setTime(ageMs);
    let ageYear = age.getFullYear() - 1970;
    let ageMonth = age.getMonth();
    let ageDay = age.getDay();
    return ageYear + " tahun, " + ageMonth + " bulan, " + ageDay + " hari";
  }

  handleAnakAfterSubmit = (name, gender, dateofbirth) => {
    const message = this.createClientMessage(name);
    this.addMessageToState(message);
    const message2 = this.createClientMessage(gender);
    this.addMessageToState(message2);
    const message3 = this.createClientMessage(dateofbirth);
    this.addMessageToState(message3);

    const message4 = this.createChatBotMessage(
      `an. ${name} berusia ${this.getUmur(dateofbirth)};`,
    );
    const message5 = this.createChatBotMessage(
      `Berikut adalah daftar vaksin anak sampai usia ${this.getUmur(
        dateofbirth,
      )}. Silahkan pilih vaksinasi yang An. ${name} telah ikuti.`,
      {
        widget: "GetVaksinAnak",
      },
      {
        delay: 300,
      },
    );
    this.addMessageToState(message4);
    this.addMessageToState(message5);
    this.setState((state) => ({ ...state, name: name }));
    this.setState((state) => ({ ...state, gender: gender }));
    this.setState((state) => ({ ...state, dateofbirth: dateofbirth }));
  };

  // handleInputNamaAnak = () => {
  //   var els = document.querySelector(
  //     'input[class="react-chatbot-kit-chat-input"]'
  //   );
  //   els.focus();
  //   els.value = "Nama Anak: ";
  // };

  // handleInputTglLahir = () => {
  //   var els = document.querySelector(
  //     'input[class="react-chatbot-kit-chat-input"]'
  //   );
  //   els.focus();
  //   els.setAttribute("type", "date");
  // };

  // handleInputJkL = () => {
  //   const message = this.createClientMessage(`Laki-Laki`);
  //   this.addMessageToState(message);
  // };

  // handleInputJkP = () => {
  //   const message = this.createClientMessage(`Perempuan`);
  //   this.addMessageToState(message);
  // };

  handlePilihSisaVaksin = (vaksin) => {
    console.log(vaksin);
    const message = this.createClientMessage(
      `Vaksin yang sudah yaitu ${vaksin.map((data) => {
        return data;
      })}`,
    );
    this.addMessageToState(message);
  };

  handleAnakAfterPilihVaksin = (jumlahBelumvaksin, props) => {
    this.setState((state) => ({ ...state, NamaOrtu: props }));
    // console.log(this.state);
    const message = this.createChatBotMessage(
      `An. ${this.state.name} belum melakukan ${jumlahBelumvaksin} vaksin.`,
    );
    this.addMessageToState(message);
    const message2 = this.createChatBotMessage(
      `Untuk melihat buku vaksin anak silakan masukkan nomor handphone ${this.state.NamaOrtu}`,
      {
        widget: "HpBelumVaksin",
      },
      {
        delay: 300,
      },
    );
    this.addMessageToState(message2);
  };

  handleInputNoHPBelumVaksin = (phone) => {
    const message = this.createClientMessage(`${phone}`);
    this.addMessageToState(message);
    this.handleViewProfileBelumVaksin();
  };

  handleInputNoHP = () => {
    var els = document.querySelector(
      'input[class="react-chatbot-kit-chat-input"]',
    );
    els.focus();
    // els.setAttribute("type", "number");
    els.value = "+62";
  };

  handleViewProfileBelumVaksin = (props) => {
    this.setState((state) => ({ ...state, NamaOrtu: props }));
    const message2 = this.createChatBotMessage(
      `Silakan klik link berikut untuk melihat buku vaksin anak An. ${this.state.name}.`,
      {
        widget: "Link_profile",
      },
      {
        delay: 300,
      },
    );
    this.addMessageToState(message2);
    const message3 = this.createChatBotMessage(
      `Terima kasih ${this.state.NamaOrtu} telah cek status vaksin anak di Cepat Sehat!`,
    );
    this.addMessageToState(message3);
  };

  handleViewProfile = (props) => {
    this.setState((state) => ({ ...state, NamaOrtu: props }));
    const message2 = this.createChatBotMessage(
      `Silakan klik link berikut untuk melihat buku vaksin anak An. ${this.state.name}.`,
      {
        widget: "Link_profile",
      },
      {
        delay: 300,
      },
    );
    this.addMessageToState(message2);
  };
}

export default ActionProvider;
