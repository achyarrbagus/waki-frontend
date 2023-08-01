/* eslint-disable react-hooks/exhaustive-deps */
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
import { Table, Tabs, Modal, Button, Form } from "antd";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";
import OtpModal from "@/components/OtpVerification/OtpModal";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
export default function Pofile() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [param, setParam] = useState();
  const [data, setData] = useState();
  const [kids, setKids] = useState();
  const { id, en, ph, pk } = router.query;
  const query = id || en || ph || pk;
  const [isVaksin, setIsVaksin] = useState();
  const [vaksin, setVaksin] = useState([]);
  const [statusVaksin, setStatusVaksin] = useState("");
  const [form, setForm] = useState();
  const [otpModal, setOtpModal] = useState(false);
  const [resp, setResp] = useState(false);

  useEffect(() => {
    // onInit();
    fetchUser(query);
    fetchVaksin();
    handleSwipVaksin(kids?.vaksin, "Sudah", vaksin);
  }, [query]);

  const onInit = async () => {
    Promise.all([fetchArticles()])
      .then(([articles, doctors]) => {
        setArticles(articles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // let { data: dataUser, refetch } = useQuery("profilCache", async () => {
  //   const response = await.get(`http://localhost:5000/api/v1/unique-user/${query}`);
  //   return response.data.data;
  // });

  const fetchVaksin = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/v1/vaksins");
      const respJson = resp.data;
      setVaksin(resp.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async (qy) => {
    try {
      if (qy) {
        const resp = await axios.get(`http://localhost:5000/api/v1/unique-user/${query}`);
        const respJson = resp.data;
        setData(respJson.data);
        setKids(respJson.data.anak.slice(-1)[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const fetchArticles = async () => {
  //   const resData = await fetch(`/api/articles?locale=${i18n.language}`, {
  //     method: "GET",
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   });
  //   return await resData.json();
  // };

  const columns = [
    {
      title: "Bulan",
      dataIndex: "bulan",
      key: "bulan",
    },
    {
      title: "Tinggi Badan(cm)",
      dataIndex: "tinggi_bdn",
      key: "tinggi_bdn",
    },
    {
      title: "Berat Badan(kg)",
      dataIndex: "berat_bdn",
      key: "berat_bdn",
    },
    {
      title: "Lingkar Kepala (cm)",
      dataIndex: "ling_kepala",
      key: "ling_kepala",
    },
    {
      title: "Tanggal Submit",
      dataIndex: "tgl_submit",
      key: "tgl_submit",
    },
  ];

  // const dataSource = [
  //   {
  //     key: "1,
  //     bulan: "0",
  //     tinggi_bdn: "46.3 - 53.4",
  //     berat_bdn: "2.5 - 4.3",
  //     ling_kepala: "32.1 - 36.9",
  //     tgl_submit: "Update",
  //   },
  // ];

  let prevIndex = -1;
  const dataSource =
    kids && kids.anak_tumbuh_kembangs && Array.isArray(kids.anak_tumbuh_kembangs)
      ? kids.anak_tumbuh_kembangs.map((item, index) => {
          const prevItem = prevIndex >= 0 ? kids.anak_tumbuh_kembangs[prevIndex] : null; // Access the previous item using the previous index
          prevIndex = index; // Update the previous index for the next iteration
          console.log(kids.dateofbirth, "ini kids");

          const endDate = item.created_at.toString().split("T")[0];
          const startDate = kids.dateofbirth;

          const startMoment = moment(startDate, "DD-MM-YYYY");
          const endMoment = moment(endDate, "YYYY-MM-DD");
          const diffInMonths = endMoment.diff(startMoment, "months");
          return {
            key: index + 1,
            bulan: diffInMonths,
            tinggi_bdn: `${prevItem ? prevItem.tinggi_badan : ""} ${prevItem ? "-" : ""} ${item.tinggi_badan} cm`,
            berat_bdn: `${prevItem ? prevItem.berat_badan : ""} ${prevItem ? "-" : ""} ${item.berat_badan} kg`,
            ling_kepala: `${prevItem ? prevItem.lingkar_kepala : ""} ${prevItem ? "-" : ""} ${item.lingkar_kepala} cm`,
            tgl_submit: `${item.created_at.toString().split("T")[0]}`,
          };
        })
      : [];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOtp = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/login-phone/?phone=${data.phone}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });

      if (!response.ok) {
        throw new Error("Failed to send POST request");
      }

      const responseData = await response.json();
      setResp(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOk = () => {
    console.log(kids);
    let tinggiBadan = document.getElementById("tinggiBadan").value;
    let beratBadan = document.getElementById("beratBadan").value;
    let lingkarKepala = document.getElementById("lingkarKepala").value;
    setForm({
      phone: data?.phone,
      anak_id: kids?.id,
      tinggi_badan: tinggiBadan,
      berat_badan: beratBadan,
      lingkar_kepala: lingkarKepala,
    });
    handleOtp();
    setIsModalOpen(false);
    setOtpModal(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSwip = (item) => {
    setKids(item);
  };

  const sex = (gender) => {
    if (gender === "Laki laki" || gender === "Male" || gender === "male" || gender === "laki laki" || gender === "pria") {
      return "Laki laki";
    } else if (gender === "perempuan" || gender === "Female" || gender === "perempuan" || gender === "female") {
      return "Perempuan";
    }
  };

  const detailAge = (dob) => {
    let month = String(dob).split("-")[1];
    let day = String(dob).split("-")[0];
    let year = String(dob).split("-")[2];
    let format = `${month}/${day}/${year}`;
    const birthDate = new Date(format);
    const currentDate = new Date();
    // Calculate the difference in milliseconds
    const diffInMilliseconds = currentDate - birthDate;

    // Convert milliseconds to years, months, and days
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const millisecondsPerMonth = millisecondsPerDay * 30.436875; // Approximate average days per month

    const ageYears = Math.floor(Math.abs(diffInMilliseconds) / (millisecondsPerDay * 365));
    const ageMonths = Math.floor(diffInMilliseconds / millisecondsPerMonth) % 12;
    const ageDays = Math.floor(diffInMilliseconds / millisecondsPerDay) % 30;

    return `${ageDays} hari ${ageMonths} bulan ${ageYears} tahun`;
  };

  const handleSwipVaksin = (vaksinAnak, isVaccin, vaksins) => {
    if (isVaccin === "Sudah") {
      setIsVaksin(vaksinAnak);
      setStatusVaksin("sudah");
      return "sudah";
    } else if (isVaccin === "Belum") {
      let resp = vaksins.filter((element) => !vaksinAnak?.some((obj) => obj.id === element.id));
      setIsVaksin(resp);
      setStatusVaksin("belum");
      return "belum";
    } else {
      setIsVaksin(vaksins);
      setStatusVaksin("semua");
      return "semua";
    }
  };

  function groupDataByAge(data) {
    let groupedByAge = {};
    for (const key in data) {
      const item = data[key];
      const { age } = item;

      if (!groupedByAge[age]) {
        groupedByAge[age] = [];
      }

      groupedByAge[age].push(item);
    }

    // Mengembalikan array yang berisi semua nilai (array) dari objek groupedByAge
    return Object.values(groupedByAge);
  }

  const HistoryVaksin = ({ data, vaksinAnak }) => {
    if (statusVaksin === "semua") {
      let result = [];
      let resp = data.filter((element) => !vaksinAnak?.some((obj) => obj.id === element.id));

      resp.map((item) => {
        let obj = {
          namevaksin: item?.namevaksin,
          status: "belum",
          age: item?.age,
        };
        result.push(obj);
      });

      vaksinAnak.map((item) => {
        let obj = {
          namevaksin: item?.namevaksin,
          status: "sudah",
          age: item?.age,
        };
        result.push(obj);
      });
      const groupedData = groupDataByAge(result);

      const queryData = {
        key1: "value1", // Ganti dengan data yang ingin Anda kirimkan
        key2: "value2",
      };

      return (
        <>
          {groupedData.map((item, index) => (
            <div
              key={index} // Memberikan key untuk setiap elemen yang dihasilkan oleh map
              className="flex justify-between flex-row w-full p-2 border-solid border-2 border-theme rounded-lg mt-2 bg-theme"
            >
              <div className="mx-4 my-2 font-bold">{item[0]?.age} bulan</div>
              <div className="flex flex-col mx-4">
                {item.map((item2, index2) => (
                  <div key={item2.namevaksin} className="px-6 my-2 text-secondary-500 font-bold">
                    {item2?.namevaksin}
                  </div>
                ))}
              </div>
              <div className="flex flex-col mx-4">
                {item.map((item, index) => (
                  <div
                    key={index}
                    className={
                      item.status === "belum"
                        ? "text-warning-500 bg-warning-100 px-6 my-2 rounded-full font-bold"
                        : "text-green-500 bg-green-100 px-6 my-2 rounded-full font-bold"
                    }
                  >
                    {item.status}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      );
    }

    const groupedData = groupDataByAge(data);
    return (
      <>
        {groupedData.map((item, index) => (
          <div
            key={index} // Memberikan key untuk setiap elemen yang dihasilkan oleh map
            className="flex justify-between flex-row w-full p-2 border-solid border-2 border-theme rounded-lg mt-2 bg-theme"
          >
            <div className="mx-4 my-2 font-bold">{item[0]?.age} bulan</div>
            <div className="flex flex-col mx-4">
              {item.map((item2, index2) => (
                <div key={item2.namevaksin} className="px-6 my-2 text-secondary-500 font-bold">
                  {item2?.namevaksin}
                </div>
              ))}
            </div>
            <div className="flex flex-col mx-4">
              {item.map((item, index) => (
                <div
                  key={index}
                  className={
                    statusVaksin === "belum"
                      ? "text-warning-500 bg-warning-100 px-6 my-2 rounded-full font-bold"
                      : "text-green-500 bg-green-100 px-6 my-2 rounded-full font-bold"
                  }
                >
                  {statusVaksin}
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Layout title="Profile" back="/">
        <div className="bg-white">
          {/* profile */}
          <div className="bg-white flex flex-col px-6 pt-6">
            {/* btn nama anak */}
            <div className="flex flex-row">
              <Swiper slidesPerView={"auto"} spaceBetween={30} freeMode={true}>
                {data?.anak.map((item, index) => {
                  return (
                    <>
                      <SwiperSlide key={item.id} style={{ width: "50%" }}>
                        <div key={index} onClick={() => handleSwip(item)}>
                          <a className="h-full text-center -top-6">
                            <div key={item.name} className="bg-secondary-500 rounded-full px-4 py-2 mb-5">
                              <p className="text-white font-bold text-lg">{item.name}</p>
                            </div>
                          </a>
                        </div>
                      </SwiperSlide>
                    </>
                  );
                })}
                {/* <SwiperSlide key={2} style={{ width: "50%" }}>
                  <Link href="#">
                    <a className="h-full text-center -top-6">
                      <div className="bg-secondary-500 rounded-full px-4 py-2 mb-5">
                        <p className="text-white font-bold text-lg">Nama Anak</p>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide> */}
                {/* <SwiperSlide key={3} style={{ width: "50%" }}>
                  <Link href="#">
                    <a className="h-full text-center -top-6">
                      <div className="bg-theme rounded-full px-4 py-2 mb-5">
                        <p className="text-white font-bold text-lg text-secondary-500">Tambah +</p>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide> */}
              </Swiper>
            </div>
            {/* profile anak */}
            <div className="flex flex-col justify-between mb-1">
              <div className="flex pt-4 bg-white">
                <div className="relative inline-block">
                  <div className="inline-block object-cover rounded-full border-solid border-4 border-primary-700">
                    <Image
                      src={`https://api.sehatcepat.com/images/doctor/dr-peter.png`}
                      alt="suratsakit"
                      width={65}
                      height={60}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="ml-4 content-center">
                  <h3 className="text-gray-700 font-bold text-2xl">{kids?.name}</h3>
                  <p className="text-gray-400 font-light text-lg mt-1">
                    {sex(kids?.gender)} | {detailAge(kids?.dateofbirth)}
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex flex-row mt-4 cursor-pointer justify-content-center border-solid border-2 border-theme rounded-md"
              onClick={showModal}
            >
              <div className="basis-2/6">
                <div className="text-center my-2 ml-2 border-r-2 border-theme">
                  <p>Tinggi Badan</p>
                  <p className="mt-2">
                    {kids && kids.anak_tumbuh_kembangs && kids.anak_tumbuh_kembangs.length > 0
                      ? `${kids.anak_tumbuh_kembangs.slice(-1)[0].tinggi_badan} ${"\u00A0"}cm`
                      : 0}
                  </p>
                </div>
              </div>
              <div className="basis-2/6">
                <div className="text-center my-2 border-r-2 border-theme">
                  <p>Berat Badan</p>
                  <p className="mt-2">
                    {kids && kids.anak_tumbuh_kembangs && kids.anak_tumbuh_kembangs.length > 0
                      ? `${kids.anak_tumbuh_kembangs.slice(-1)[0].berat_badan} ${"\u00A0"}kg`
                      : 0}
                  </p>
                </div>
              </div>
              <div className="basis-2/6">
                <div className="text-center my-2">
                  <p>Lingkar Kepala</p>
                  <p className="mt-2">
                    {kids && kids.anak_tumbuh_kembangs && kids.anak_tumbuh_kembangs.length > 0
                      ? `${kids.anak_tumbuh_kembangs.slice(-1)[0].lingkar_kepala} ${"\u00A0"}cm`
                      : 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 mx-6">
            <Tabs defaultActiveKey="1" size={"large"} tabBarStyle={{ width: "100%", color: "#A7A7A7" }}>
              <Tabs.TabPane tab="Vaksin" key="1">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <div>
                      <a className="h-full text-center -top-6">
                        <div className="text-grey-800 rounded-full border-2 border-theme cursor-pointer px-4 py-3 m-2 hover:bg-secondary-500 hover:text-gray-100">
                          <p onClick={() => handleSwipVaksin(kids?.vaksin, "Belum", vaksin)} className="text-lg font-bold">
                            Belum
                          </p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a className="h-full text-center -top-6">
                        <div className="text-grey-800 rounded-full border-2 border-theme cursor-pointer px-4 py-3 m-2 hover:bg-secondary-500 hover:text-gray-100">
                          <p onClick={() => handleSwipVaksin(kids?.vaksin, "Sudah", vaksin)} className="text-lg font-bold">
                            Sudah
                          </p>
                        </div>
                      </a>
                    </div>
                    <div>
                      <a className="h-full text-center -top-6">
                        <div className="text-grey-800 rounded-full border-2 border-theme cursor-pointer px-4 py-3 m-2 hover:bg-secondary-500 hover:text-gray-100">
                          <p onClick={() => handleSwipVaksin(kids?.vaksin, "Semua", vaksin)} className="text-lg font-bold">
                            Semua
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl font-bold mb-2">Riwayat Vaksin Anak</p>
                    <HistoryVaksin data={isVaksin} vaksinAnak={kids?.vaksin} />
                  </div>
                </div>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Pertumbuhan" key="2">
                <div className="flex flex-col">
                  <p className="text-2xl font-bold">Tabel Tumbuh Kembang Anak</p>
                  <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                    rowClassName={(record, index) => "font-bold"}
                  />
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>

          <div className="max-w-layout fixed flex flex-col bottom-0 left-0 right-0 bg-white items-center justify-center mx-auto border-t border-gray-150 z-30 py-5 px-3">
            {/* {loading ? (
          <div className="py-2.5 text-center">
            <Spin />
          </div>
        ) : ( */}
            <Link href={`/daftar_vaksin/?user=${query}`}>
              <button
                type="submit"
                className="bg-secondary-500 text-white font-bold block w-full text-center text-sm p-3 rounded-full"
              >
                Daftar Vaksin
              </button>
            </Link>
            {/* )} */}
          </div>
        </div>
        <Modal
          title=""
          centered
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          width={370}
          footer={[
            <Button
              key="back"
              className="w-2/4 rounded-full bg-white text-secondary-500 hover:bg-secondary-500 hover:border-secondary-500 hover:text-white border-solid border border-secondary-500"
              onClick={handleCancel}
            >
              Batal
            </Button>,
            <Button
              key="submit"
              type="primary"
              className="w-2/4 bg-secondary-500 rounded-full hover:bg-white hover:text-secondary-500 hover:border-secondary-500 border-solid border border-secondary-500"
              onClick={handleOk}
            >
              Sudah{" "}
            </Button>,
          ]}
        >
          <div className="flex flex-col my-2">
            <p className="text-xl font-bold">
              Data Tumbuh Kembang Anak <p className="text-secondary-500">{detailAge(kids?.dateofbirth)}</p>
            </p>
          </div>
          <div className="flex flex-row cursor-pointer justify-content-center border-solid border-2 border-theme rounded-md my-4">
            <div className="basis-2/6">
              <div className="text-center my-2 ml-2 border-r-2 border-theme">
                <p>Tinggi Badan</p>
                <div className="mt-2">
                  <form>
                    <input
                      type="number"
                      id="tinggiBadan"
                      name="tinggiBadan"
                      className="focus:ring-blue-500 w-20"
                      placeholder="160 cm"
                      required
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="basis-2/6">
              <div className="text-center my-2 border-r-2 border-theme">
                <p>Berat Badan</p>
                <div className="mt-2">
                  <form>
                    <input
                      type="number"
                      id="beratBadan"
                      name="beratBadan"
                      className="focus:ring-blue-500 w-20"
                      placeholder="10 kg"
                      required
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="basis-2/6">
              <div className="text-center my-2">
                <p>Lingkar Kepala</p>
                <div className="mt-2">
                  <form>
                    <input
                      type="number"
                      id="lingkarKepala"
                      name="lingkarKepala"
                      className="focus:ring-blue-500 w-20"
                      placeholder="56 cm"
                      required
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold">Apakah data yang Anda masukkan sudah benar?</p>
          </div>
        </Modal>
        <Footer />
      </Layout>
      <OtpModal
        data={data}
        visible={otpModal}
        form={form}
        setVisible={() => setOtpModal(false)}
        fecthUser={() => fetchUser(query)}
      />
    </>
  );
}
