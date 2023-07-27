import "@/styles/font.css";
import "antd/dist/antd.css";
import "@/styles/scss/tailwind.scss";
import "@/styles/scss/globals.scss";
import "@/styles/scss/custom/index.scss";
import "sendbird-uikit/dist/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { appWithTranslation } from "next-i18next";
import { useState, createContext, useEffect } from "react";
import AppContext from "@/components/AppContext";
import TagManager from "react-gtm-module";
import { switchGTM } from "/helpers/gtm";
import { switchGTM2 } from "/helpers/gtm2";
import { useTranslation } from "next-i18next";
import { ThemeProvider } from "@material-tailwind/react";
import { vaksin } from "@/constant/vaksin";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

// const AppContext = createContext();
function MyApp({ Component, pageProps }) {
  const { i18n } = useTranslation();

  const tagManagerArgs = {
    gtmId: switchGTM(i18n.language),
  };

  const tagManagerArgs2 = {
    gtmId: switchGTM2(i18n.language),
  };

  useEffect(() => {
    if (tagManagerArgs.gtmId != "") {
      TagManager.initialize(tagManagerArgs);
    }

    if (tagManagerArgs2.gtmId != "") {
      TagManager.initialize(tagManagerArgs2);
    }
  });
  const customTheme = {
    tabsHeader: {
      styles: {
        base: {
          width: "w-full",
          border: "border-none",
          radius: "rounded-none",
          background: "bg-white",
        },
      },
    },
    tab: {
      styles: {
        base: {
          tab: {
            initial: {
              display: "grid",
              placeItems: "place-items-center",
              color: "text-secondary-500",
              font: "font-bold",
              border: "border-b-2 border-secondary-500",
            },
            disabled: {
              color: "text-secondary-500",
              font: "font-bold",
              border: "border-b-2 border-secondary-500",
              background: "bg-secondary-500",
            },
          },
        },
      },
    },
  };

  const [NamaOrtu, setNamaOrtu] = useState("/surat");
  const [addr, setAddr] = useState("");
  const [slugs, setSlugs] = useState("");
  const [email, setEmail] = useState("");
  const [anak, setAnak] = useState([]);
  const [usia, setUsia] = useState();
  const [vaksin, setVaksin] = useState();
  const [phone, setPhone] = useState();
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider value={customTheme}>
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            state: {
              NamaOrtu: NamaOrtu,
              addr: addr,
              slugs: slugs,
              email: email,
              anak: anak,
              usia: usia,
              vaksin: vaksin,
              phone,
            },
            setNamaOrtu: setNamaOrtu,
            setAddr: setAddr,
            setSlugs: setSlugs,
            setEmail: setEmail,
            setAnak: setAnak,
            setUsia: setUsia,
            setVaksin: setVaksin,
            setPhone,
          }}
        >
          <Component {...pageProps} />
        </AppContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
