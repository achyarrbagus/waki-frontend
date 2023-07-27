import Image from "next/image";
const Botavatar = () => {
  return (
    <>
      <div className="react-chatbot-kit-chat-bot-avatar">
        <div
          className="react-chatbot-kit-chat-bot-avatar-container"
          style={{ background: "none" }}
        >
          <Image
            src={"/images/icons/Photo_bot.png"}
            alt={"profilebot"}
            height="45"
            width="45"
          />
        </div>
      </div>
    </>
  );
};

export default Botavatar;
