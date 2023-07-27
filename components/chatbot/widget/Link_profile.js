import Link from "next/link";

const Link_profile = (props) => {
  return (
    <>
      <div className="flex flex-row justify-center">
        <Link href={"/profile?id=asd123"}>
          <a className="option-item font-bold">Open Link</a>
        </Link>
      </div>
    </>
  );
};

export default Link_profile;
