import Link from "next/link";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function SliderUpdatedArticle({ data }) {
  const { locale } = useRouter();

  return (
    <>
      <Swiper slidesPerView={"auto"} spaceBetween={30} freeMode={true}>
        {data != null &&
          data.length > 0 &&
          data
            .filter((p) => p.locale === locale)
            .map((item, index) => {
              return (
                <SwiperSlide
                  key={`article-${index.toString()}`}
                  style={{ width: "65%" }}
                >
                  <a className="block">
                    <div className="w-full h-full rounded-lg  overflow-hidden">
                      <div className="mb-3 w-full object-center object-cover">
                        <Image
                          src={`https://api.sehatcepat.com/images/article/${item.image}`}
                          alt={item.title}
                          height="170"
                          width="200"
                          layout="responsive"
                        />
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </>
  );
}
