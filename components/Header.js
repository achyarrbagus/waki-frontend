import Router, { useRouter } from "next/router";
import { AiOutlineLeft } from "react-icons/ai";
import Link from "next/link";
import React, { useState } from "react";
import FlagComp from "@/components/shared/Flag";
import { switchName } from "/helpers/index";
import { useTranslation } from "next-i18next";

function Header({ headerTitle, headerBack, headerAction }) {
  const { i18n } = useTranslation();

  const onClickBackNav = (headerBack) => {
    const windowHistory =
      typeof window.history === "object" &&
      typeof window.history.keys !== "undefined"
        ? window.history
        : null;
    if (windowHistory !== null) {
      Router.back();
    } else {
      const pathname = `${headerBack}`;
      Router.replace(pathname, pathname, { shallow: true });
    }
  };
  return (
    <header className="fixed top-0 left-0 w-full h-14 z-30">
      <div className="container mx-auto max-w-layout flex flex-row justify-center items-center h-full bg-primary-700">
        <div className="w-3/12 pl-2">
          {headerTitle != "Home" ? (
            <a className="mx-4" onClick={() => onClickBackNav(headerBack)}>
              <AiOutlineLeft color="white" fontSize="2em" />
            </a>
          ) : (
            <Link href={`https://www.sehatcepat.com`}>
              <a>
                <AiOutlineLeft color="white" fontSize="2em" />
              </a>
            </Link>
          )}
        </div>
        <div className="w-6/12">
          <Link href={`https://www.sehatcepat.com`}>
            <a>
              <h1 className="font-bold text-xl text-white text-center">
                {switchName(i18n.language)}
              </h1>
            </a>
          </Link>{" "}
        </div>
        <div className="w-3/12">
          {/* <div className='flex justify-center items-center w-full h-full'>
                        {(headerTitle == "Home") &&
                            <FlagComp />
                        }
                        {(headerAction == "endchat") &&
                            <ChatLeave />
                        }
                    </div> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
