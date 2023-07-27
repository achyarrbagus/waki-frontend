import Link from "next/link";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import SliderUpdatedArticle from "@/components/mobiles/SliderUpdatedArticle";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Skeleton from "react-loading-skeleton";
import Script from "next/script";
import BotikaChatWidget from "../components/botika/botika";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState(null);
  const [doctors, setDoctors] = useState(null);
  const [botika,setBotika]= useState(false);

  useEffect(() => {
    // onInit();
  }, [i18n.language]);

  const onInit = async () => {
    Promise.all([fetchArticles(), fetchDoctors()])
      .then(([articles, doctors]) => {
        setArticles(articles);
        setDoctors(doctors);
      })
      .catch((err) => {
        setArticles(null);
        setDoctors(null);
      });
  };

  const fetchArticles = async () => {
    const resData = await fetch(`/api/articles?locale=${i18n.language}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    return await resData.json();
  };
  const fetchDoctors = async () => {
    const resData = await fetch(`/api/doctors?locale=${i18n.language}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    return await resData.json();
  };

  const BotikaChatInitializer = () => {
      // Initialize BotikaChat when the component mounts on the client-side
      if(!botika){
        window.BotikaChat.init({
          client: "5PkC5Ln",
          widget: {
            theme: "custom",
            "theme-color": "#04B3B3",
            title: "   Vaksini",
            description: "Description",
            caption: "Halo, dengan vaksini ada yang bisa Vaksini bantu?",
            greeting: true,
            // "greeting-message": "Hi, I'm a Botika chatbot",
            "greeting-button": "Hello",
            logo: "https://botmaster-files.s3.ap-southeast-1.amazonaws.com/Message/2023/07/LOGO_24072023165344.png",
            history: false,
          },
        })
        setBotika(true)
        console.log(window.BotikaChat);
      }else{
        console.log("hello world");
      }
       
      // window.location.reload();
  }


  return (
    <Layout title="Home">
      <div className="bg-primary-700 pb-4 flex-col">
        {/* header text */}
        <div className="text-left text-white px-6 py-3">
          <div>
            <Image src="/images/LOGO.png" alt="suratsakit" width={40} height={40} />
          </div>
          <p className="text-lg sm:text-md font-normal mt-2 ">{t("header-1")}</p>
          <h1 className="text-3xl sm:text-2xl font-bold text-white w-64 mt-3">{t("header-2")}</h1>
          <p className="text-lg sm:text-md font-normal mt-3">{t("header-3")}</p>
        </div>
        {/* header menu */}
        <div onClick={BotikaChatInitializer} href="">
          <a className="h-full flex-1 text-center">
            <div className="bg-secondary-500 rounded-full shadow-lg px-4 py-3 mx-6 mb-5 mt-5">
              <p className="text-white font-bold text-lg">{t("btn-header-1")}</p>
            </div>
          </a>
        </div>
        <Link href="/">
          <a className="h-full flex-1 text-center">
            <div className="bg-white rounded-full shadow-lg px-4 py-3 mx-6 mb-5 mt-2">
              <p className="text-secondary-500 font-bold text-lg">{t("btn-header-2")}</p>
            </div>
          </a>
        </Link>
        <div className="p-5">{articles ? <SliderUpdatedArticle data={articles} /> : <Skeleton count={8} />}</div>
      </div>
      {/* ddialog flow messenger embededd */}
      <div className="bg-black">
        {/* <Script src="https://chat.botika.online/client/assets/js/botika.widget.js"></Script>
        <BotikaChatInitializer /> */}

        {/* <!--- botika webchat begin --> */}
        <Script id="vaksini" src="https://chat.botika.online/client/assets/js/botika.widget.js"></Script>
        {/* <BotikaChatWidget /> */}
      </div>
      <div className="bg-white flex flex-col px-6 pt-6">
        <p className="text-secondary-500 font-bold text-lg mb-3">{t("text-h-1")}</p>
        <p className="font-bold text-3xl">{t("text-h-2")}</p>
        <p className="text-lg">{t("text-h-3")}</p>
        <div className="flex my-2">
          <div className="flex flex-row w-full">
            <div className="text-5xl font-bold basis-1/5">1</div>
            <div className="text-2xl font-bold basis-4/5">{t("manfaat-1")}</div>
          </div>
        </div>
        <div className="flex my-2">
          <div className="flex flex-row w-full">
            <div className="text-5xl font-bold basis-1/5">2</div>
            <div className="text-2xl font-bold basis-4/5">{t("manfaat-2")}</div>
          </div>
        </div>
        <div className="flex my-2">
          <div className="flex flex-row w-full">
            <div className="text-5xl font-bold basis-1/5">3</div>
            <div className="text-2xl font-bold basis-4/5">{t("manfaat-3")}</div>
          </div>
        </div>
        <Link href="/">
          <a className="h-full flex-1 text-center">
            <div className="bg-white rounded-full border border-secondary-500  shadow-lg px-4 py-3 mb-5 mt-2">
              <p className="text-secondary-500 font-bold text-lg">{t("btn-header-1")}</p>
            </div>
          </a>
        </Link>
        <p className="text-secondary-500 font-bold text-lg mt-6 mb-3">{t("text-h-4")}</p>
        <p className="font-bold text-3xl">{t("text-h-5")}</p>
        <div className="mt-8">
          <div className="flex flex-wrap border-x border-y border-secondary-500 py-6 px-2">
            <div className="flex flex-row justify-items-center w-full m-auto">
              <div className="justify-items-center px-2">
                <Image src={"/images/icons/jenis-1.png"} alt={"jenis"} height="70" width="70" />
              </div>
              <div className="item-center">
                <p className="text-3xl font-bold py-4 px-6">Hepatitis B</p>
              </div>
            </div>
            <div>
              <p className="text-lg">{t("jenis-1")}</p>
            </div>
          </div>
          <div className="flex flex-wrap border-x border-b border-secondary-500 py-6 px-2">
            <div className="flex flex-row justify-items-center w-full m-auto">
              <div className="justify-items-center px-2">
                <Image src={"/images/icons/jenis-2.png"} alt={"jenis"} height="70" width="70" />
              </div>
              <div className="item-center">
                <p className="text-3xl font-bold py-4 px-6">Vaksin Polio</p>
              </div>
            </div>
            <div>
              <p className="text-lg">{t("jenis-2")}</p>
            </div>
          </div>
          <div className="flex flex-wrap border-x border-b border-secondary-500 py-6 px-2">
            <div className="flex flex-row justify-items-center w-full m-auto">
              <div className="justify-items-center px-2">
                <Image src={"/images/icons/jenis-3.png"} alt={"jenis"} height="70" width="70" />
              </div>
              <div className="item-center">
                <p className="text-3xl font-bold py-4 px-6">Vaskin BCG</p>
              </div>
            </div>
            <div>
              <p className="text-lg">{t("jenis-3")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="ml-12 relative top-[75px]">
          <Image src={"/images/icons/virus.png"} alt={"jenis"} height="170" width="170" />
        </div>
        <div className="flex flex-col bg-secondary-100 mx-6 rounded-lg">
          <div className="flex flex-col">
            <div className="mx-6 mt-16">
              <p className="text-2xl text-secondary-500">{t("jadwal-vaksin")}</p>
            </div>
            <div className="mx-6 mt-5">
              <p className="text-3xl text-gray">{t("cek-jadwal")}</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap">
              <Image src={"/images/icons/blok.png"} alt={"jenis"} height="300" width="420" />
            </div>
            <Link href="/">
              <a className="h-full flex-1 text-center -top-6">
                <div className="bg-secondary-500 rounded-full shadow-lg px-4 py-3 mx-6 mb-5">
                  <p className="text-white font-bold text-lg">{t("cek-sekarang")}</p>
                </div>
              </a>
            </Link>
            <div className="mx-auto pl-6">
              <Image src={"/images/icons/bidan.png"} alt={"jenis"} height="475" width="290" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
