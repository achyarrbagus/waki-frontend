import Image from "next/image";

const Header = () => {
  return (
    <div className="flex flex-col text-center bg-primary-700">
      <div>
        <Image
          src={"/images/icons/Photo_profile.png"}
          alt={"profilebot"}
          height="60"
          width="60"
        />
      </div>
      <h2 className="text-xl text-white">Cek Status Vaksin Anak Anda</h2>
    </div>
  );
};

export default Header;
