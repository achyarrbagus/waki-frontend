import React, { useEffect } from "react";

const BotikaChatWidget = () => {
  useEffect(() => {
    if (typeof window !== "undefined" && window.BotikaChat) {
      window.BotikaChat.init({
        client: "5PkC5Ln",
        widget: {
          theme: "custom",
          "theme-color": "#04B3B3",
          title: "   Vaksini",
          description: "Description",
          caption: "Halo, dengan vaksini ada yang bisa Vaksini bantu?",
          greeting: false,
          // "greeting-message": "Hi, I'm a Botika chatbot",
          "greeting-button": "Hello",
          logo: "https://botmaster-files.s3.ap-southeast-1.amazonaws.com/Message/2023/07/LOGO_24072023165344.png",
          history: false,
        },
      });
    }
  }, []);

  return <></>; // Return an empty fragment as the component doesn't render any visible content.
};

export default BotikaChatWidget;
