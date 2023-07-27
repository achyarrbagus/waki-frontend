import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { flags } from "../../constant/flag";
import { switchFlag } from "../../helpers/flag";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Flag() {
  const router = useRouter();
  const { pathname, query, asPath } = router;

  const [selected, setSelected] = useState(router.locale);

  const handleChange = (e) => {
    setSelected(e.name);
    router.push({ pathname, query }, asPath, { locale: e.name });
  };

  return (
    <Listbox
      value={selected}
      onChange={(e) => {
        handleChange(e);
      }}
    >
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-full p-1 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-700 focus:border-primary-700 sm:text-sm">
              <span className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 rounded-xl">
                  <Image
                    src={switchFlag(selected)}
                    alt="lang"
                    width={24}
                    height={24}
                  />
                </div>
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {flags.map((flag) => (
                  <Listbox.Option
                    key={flag.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? "text-white bg-secondary-500"
                          : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-1 pr-1",
                      )
                    }
                    value={flag}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full">
                            <Image
                              src={flag.icon}
                              alt="lang"
                              width={24}
                              height={24}
                            />
                          </div>
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate",
                            )}
                          ></span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-secondary-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4",
                            )}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
