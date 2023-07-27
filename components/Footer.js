import Link from "next/link";
import Image from "next/image";
import { switchFooter, switchURLFB, switchURLIG } from "/helpers/footer";
import { switchDomain } from "/helpers/domain";
import { useTranslation } from "next-i18next";
import { switchName } from "/helpers/index";

function Footer() {
  const { i18n } = useTranslation();

  return (
    <footer className="w-full">
      <div className="container mx-auto max-w-screen-md bg-white pt-5">
        <div className="flex items-center py-2 px-4">
          <div className="relative inline-block">
            <Link href="/">
              <a>
                <Image
                  src={switchFooter(i18n.language)}
                  alt="lang"
                  width={56}
                  height={56}
                />
              </a>
            </Link>
          </div>
          <div className="mx-2">
            <div className="flex">
              <h2 className="text-gray-600 text-xl font-bold">
                {switchDomain(i18n.language)}
              </h2>
            </div>
            <div className="flex">
              <div className="h-8 w-8 mr-2">
                <Link href={switchURLFB(i18n.language)}>
                  <a>
                    <Image
                      src="/images/icons/facebook.png"
                      alt="lang"
                      width={32}
                      height={32}
                    />
                  </a>
                </Link>
              </div>
              <div className="h-8 w-8 mx-2">
                <Link href={switchURLIG(i18n.language)}>
                  <a>
                    <Image
                      src="/images/icons/instagram.png"
                      alt="lang"
                      width={32}
                      height={32}
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center text-center py-2">
          <p className="text-gray-600 text-md">
            Copyright © 2022 {switchName(i18n.language)}. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
