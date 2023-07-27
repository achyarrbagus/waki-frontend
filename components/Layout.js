import Head from "next/head";
import Header from "./Header";
// import Navbar from "/components/Navbar"
import { useTranslation } from "react-i18next";

function Layout({
  title,
  back,
  keywords,
  description,
  children,
  headerAction,
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta> */}
      </Head>
      <div className="flex flex-col min-h-screen overflow-hidden">
        <Header
          headerTitle={title}
          headerBack={back}
          headerAction={headerAction}
        />
        <main className="w-full min-h-full absolute top-0 left-0 z-0 pt-14">
          <div className="container mx-auto max-w-layout h-screen">
            {children}
          </div>
        </main>
        {/* <Navbar /> */}
      </div>
    </>
  );
}

export default Layout;
