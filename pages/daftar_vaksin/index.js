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
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import axios from "axios";
import OtpVaksinasi from "@/components/OtpVerification/OtpVaksinasi";

import { Table, Tabs, Modal, Button, DatePicker, Spin, TimePicker, Select } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export async function getStaticProps({ locale }) {

   let dataUser = await fetchUser(userId)
   let dataVaksin = await fetchVaksin()
   console.log(dataUser)
   console.log(dataVaksin)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      dataUser,dataVaksin
    },
  };
}
export default function Pofile({dataVaksin,dataUser}) {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [vaksin, setVaksin] = useState();
  const [anak, setAnak] = useState(1);
  const { Option } = Select;
  const router = useRouter();
  const [selectedData, setSelectedData] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState();
  const [formData, setFormData] = useState();

  const userId = router.query.user;
  useEffect(() => {
    // onInit();
   fetchUser(userId)
   fetchVaksin()
    console.log(process.env.URL_API)
  }, []);
  console.log(dataVaksin)
  const fetchUser = async (userId) => {
    console.log(userId);
    try {
      if (userId) {
        const resp = await axios.get(`${process.env.URL_API}/unique-user/${userId}`);
        const respJson = resp.data;
        setData(respJson.data);
        return respJson.data
      }
    } catch (error) {
      console.log(error);
    }
  };



  const fetchVaksin = async () => {
    try {
      const resp = await axios.get(`${process.env.URL_API}/vaksins`);
      console.log(process.env.URL_API);
      const respJson = resp.data;
      setVaksin(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(6, "Too Short!").max(30, "Too Long!").required("Required"),
    phone: Yup.string().min(9, "Too Short!").max(15, "Too Long!").required("Required"),
    dateofbirth: Yup.string().required("Required"),
  });

  const convertTime = (time) => {
    const dateObject = new Date(time);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    const amPmFormattedTime =
      hours >= 12 ? (hours === 12 ? "12" : (hours - 12).toString()) : hours === 0 ? "12" : hours.toString();
    const finalFormattedTime = `${amPmFormattedTime}:${minutes.toString().padStart(2, "0")} ${hours >= 12 ? "pm" : "am"}`;

    return finalFormattedTime;
  };
  const onSubmitForm = (values) => {
    const request = {
      username: values?.name, 
      phone: String(values?.phone),
      address: values?.address,
      schedule: values?.dateofbirth,
      time: convertTime(selectedTime?._d),
      vaksinasi_anak: selectedData,
    };
    console.log(request);

    const requiredProps = ["username", "phone", "address", "time", "schedule"];
    const hasUndefinedProp = requiredProps.some((prop) => typeof request[prop] === "undefined");

    const sendCode = async () => {
      try {
        const response = await fetch(`${process.env.URL_API}/login-phone/?phone=${data.phone}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: null,
        });

        if (!response.ok) {
          throw new Error("Failed to send POST request");
        }
        const res = await response.json();
        console.log(res);
      } catch (error) {
        const responseData = await response.json();
        console.log(responseData);
        console.error(error);
      }
    };
    if (!hasUndefinedProp && request.vaksinasi_anak.length !== 0) {
      setFormData(request);
      setVisible(true);
      sendCode();
      return;
    }
  };

  const [selectedVaksin, setSelectedVaksin] = useState();
  const SelectComponentVaksin = ({ vaksin, index, onVaksinChange, vg }) => {
    const handleVaksinChange = (value) => {
      onVaksinChange(index, value);
    };
    return (
      vg && (
        <Select value={vg[index]?.vaksin} placeholder="select one vaksin" className="select-after" onChange={handleVaksinChange}>
          {vaksin &&
            vaksin.map((item, idx) => {
              return (
                <Option key={idx} value={item.namevaksin}>
                  {item.namevaksin}
                </Option>
              );
            })}
        </Select>
      )
    );
  };

  const SelectComponentName = ({ data, index, onNameChange, vg }) => {
    const handleNameChange = (value) => {
      onNameChange(index, value);
    };
    return (
      <div>
        <Select value={vg[index]?.name} placeholder="select kids name" onChange={handleNameChange} className="select-after">
          {data &&
            data?.anak.map((item, idx) => {
              return (
                <>
                  <Option key={idx} value={item.name}>
                    {item.name}
                  </Option>
                  ;
                </>
              );
            })}
        </Select>
      </div>
    );
  };

  const handleNameChange = (index, name) => {
    const newData = [...selectedData];
    newData[index] = { ...(newData[index] || {}), name };
    setSelectedData(newData);
  };

  const handleVaksinChange = (index, vaksin) => {
    const newData = [...selectedData];
    newData[index] = { ...(newData[index] || {}), vaksin };
    setSelectedData(newData);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  return (
    <>
      {dataUser ? (
        <>
          <OtpVaksinasi visible={visible} data={data} form={formData} setVisible={() => setVisible(false)} />
          <Layout title="Profile" back="/">
            <div className="flex flex-wrap justify-between items-center px-5 pt-5 bg-white overflow-hidden w-full">
              <Formik
                initialValues={{ name: "", phone: "", dateofbirth: "", time: "" }}
                validationSchema={RegisterSchema}
                onSubmit={onSubmitForm}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form className="flex flex-col justify-between w-full pb-6">
                    <div className="flex flex-col">
                      <div className="py-4 my-5">
                        <h1 className="text-left text-3xl text-gray-700 font-black">Data Orang Tua</h1>
                      </div>
                      <div className="mb-4 w-full">
                        <label className="block mb-1 font-bold text-gray-700 text-sm">Nama Orang Tua </label>
                        <div className="">
                          <Field
                            name="name"
                            className="w-full py-2 px-3 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1"
                            type="text"
                            placeholder={""}
                          />
                        </div>
                        {errors.name && touched.name && <div className="text-red-500 font-light text-sm ml-2">{errors.name}</div>}
                      </div>
                      <div className="mb-4 w-full">
                        <label className="block mb-1 font-bold text-gray-700 text-sm">Nomor Handphone </label>
                        <div className="mt-1 relative">
                          <div className="bg-gray-100 rounded-l-lg absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
                            <span className="text-gray-700 text-md">{t("phone_code")}</span>
                          </div>
                          <Field
                            name="phone"
                            className="block w-full py-2 pl-14  rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1"
                            type="number"
                            placeholder={t("phone")}
                          />
                        </div>
                        {errors.phone && touched.phone && (
                          <div className="text-red-500 font-light text-sm ml-2">{errors.phone}</div>
                        )}
                      </div>
                      <div className="mb-4 w-full">
                        <label className="block mb-1 font-bold text-gray-700 text-sm">Alamat Rumah</label>
                        <div className="mt-1 relative">
                          <Field
                            name="address"
                            className="block w-full py-2  px-3 rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1"
                            type="text"
                            placeholder={""}
                          />
                        </div>
                        {errors.phone && touched.phone && (
                          <div className="text-red-500 font-light text-sm ml-2">{errors.phone}</div>
                        )}
                      </div>
                      <div className="flex flex-row mb-4 w-full">
                        <div className="w-full mr-1">
                          <label className="block mb-1 font-bold text-gray-700 text-sm">Pilih Tanggal</label>
                          <div className="">
                            <DatePicker
                              format="YYYY-MM-DD"
                              name="dateofbirth"
                              placeholder={t("select_date")}
                              onChange={(date, dateString) => setFieldValue("dateofbirth", dateString)}
                              className={`py-2 px-3 rounded-lg text-lg text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1 w-full`}
                            />
                          </div>
                          {errors.dateofbirth && touched.dateofbirth && (
                            <div className="text-red-500 font-light text-sm ml-2">{errors.dateofbirth}</div>
                          )}
                        </div>
                        <div className="w-full ml-1">
                          <label className="block mb-1 font-bold text-gray-700 text-sm">Pilih Waktu</label>
                          <div className="">
                            <TimePicker
                              size="large"
                              className="rounded-lg w-full"
                              use12Hours
                              format="h:mm a"
                              onChange={handleTimeChange}
                            />
                          </div>
                          {errors.dateofbirth && touched.dateofbirth && (
                            <div className="text-red-500 font-light text-sm ml-2">{errors.dateofbirth}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="max-w-layout fixed flex flex-col bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 py-5 px-3">
                      {loading ? (
                        <div className="py-2.5 text-center">
                          <Spin />
                        </div>
                      ) : (
                        <button
                          onClick={onSubmitForm}
                          type="submit"
                          className="bg-secondary-500 text-white font-bold block w-full text-center text-sm p-3 rounded-full"
                        >
                          {t("next")}
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="flex flex-col jusifty-between bg-white mt-2 px-5 pt-5">
              <div className="flex flex-row justify-between py-4">
                <div>
                  <p className="text-xl font-bold">Data Anak</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => setAnak(anak + 1)}
                    type="button"
                    className="bg-secondary-100 text-secondary-500 font-bold  text-center text-sm px-2 py-1 rounded-full"
                  >
                    Tambah +
                  </button>
                  <button
                    onClick={() => setAnak(anak - 1)}
                    type="button"
                    className="bg-secondary-100 text-secondary-500 font-bold  text-center text-sm px-2 py-1 rounded-full"
                  >
                    Kurang -
                  </button>
                </div>
              </div>
              {data && (
                <>
                  {[...Array(parseInt(anak))].map((_, index) => (
                    <div key={index} className="flex flex-col bg-theme p-5 rounded-xl mb-5">
                      <div>
                        <label className="block mb-1 font-bold text-gray-700 text-sm">Nama Anak {index + 1}</label>
                        <SelectComponentName vg={selectedData} data={data} index={index} onNameChange={handleNameChange} />
                      </div>
                      <div>
                        <label className="block mb-1 font-bold text-gray-700 text-sm">Jenis Vaksin</label>
                        <SelectComponentVaksin
                          vg={selectedData}
                          vaksin={vaksin}
                          index={index}
                          onVaksinChange={handleVaksinChange}
                        />
                      </div>
                    </div>
                  ))}
                </>
              )}
              <div className="flex mt-10 bg-white">
                <div className="w-full bg-gradient-to-r from-primary-700 to-primary-600 rounded-xl p-5">
                  <div className="flex justify-center">
                    <svg width="50" height="54" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.077 0C5.3666 0 0.732056 4.48 0.732056 10C0.732056 15.52 5.3666 20 11.077 20C16.7874 20 21.422 15.52 21.422 10C21.422 4.48 16.7874 0 11.077 0ZM12.1115 17H10.0425V15H12.1115V17ZM14.2529 9.25L13.3219 10.17C12.577 10.9 12.1115 11.5 12.1115 13H10.0425V12.5C10.0425 11.4 10.508 10.4 11.2529 9.67L12.5357 8.41C12.9184 8.05 13.146 7.55 13.146 7C13.146 5.9 12.215 5 11.077 5C9.93908 5 9.00803 5.9 9.00803 7H6.93904C6.93904 4.79 8.79078 3 11.077 3C13.3633 3 15.215 4.79 15.215 7C15.215 7.88 14.8426 8.68 14.2529 9.25Z"
                        fill="white"
                      />
                    </svg>
                    <p className="text-white px-2 text-lg">
                      <b>Ada Pertanyaan? </b>Tim kami siap membantu kamu secara langsung
                    </p>
                  </div>
                  <div className="flex justify-center py-4">
                    <Link href="https://api.whatsapp.com/send/?phone=6281281881802&text&app_absent=0">
                      <a className="font-bold text-white hover:text-white text-lg text-center w-full px-3 py-2 border-2 border-white rounded-full">
                        Hubungi Melalui WhatsApp
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </Layout>
        </>
      ) : (
          <>
          <div className="flex justify-center min-h-screen items-center">
            <div>
          <Spin tip="Loading" size="large">
          </Spin>
            </div>
          </div>
          </>
      )}
    </>
  );
}
