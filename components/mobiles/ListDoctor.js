import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ListDoctor({ data }) {
  return (
    <>
      {data != null &&
        data.length > 0 &&
        data.map((item, index) => {
          if (item.id == 6) {
            return (
              <div key={`doctor-${index.toString()}`}>
                {/* <Link href={`/doctor?id=${item.id}`}> */}
                <Link href={`/`}>
                  <a>
                    <div className="flex justify-between items-center my-3 px-4">
                      <div className="flex">
                        <div className="relative inline-block">
                          <div className="inline-block object-cover w-14 h-14 rounded-full">
                            <Image
                              src={`https://api.sehatcepat.com/images/doctor/${item.photo}`}
                              alt="suratsakit"
                              width={52}
                              height={56}
                              className="rounded-full"
                            />
                          </div>
                          <span className="absolute bottom-1 right-0 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full"></span>
                        </div>
                        <div className="mx-2">
                          <h3 className="text-gray-600 font-bold text-lg">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 font-light text-md">
                            {item.number}
                          </p>
                          <p className="text-success-800">Online</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            );
          }
        })}
    </>
  );
}
