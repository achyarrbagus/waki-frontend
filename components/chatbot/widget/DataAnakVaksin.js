import { Spin, message, DatePicker } from "antd";
import moment from "moment";
import { Input, Select, Option } from "@material-tailwind/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import AppContext from "@/components/AppContext";
import ActionProvider from "../ActionProvider";

const DataAnakVaksin = (props) => {
  const context = useContext(AppContext);
  const date = new Date(new Date().setFullYear(new Date().getFullYear() - 17));
  const RegisterSchema = Yup.object().shape({
    name: Yup.string()
      .min(6, "Too Short!")
      .max(30, "Too Long!")
      .required("Required"),
    gender: Yup.string().required("Required"),
    dateofbirth: Yup.string().required("Required"),
  });

  const onSubmitForm = async (values) => {
    // console.log(values);
    var dt = {
      name: values.name,
      gender: values.gender,
      dateofbirth: values.dateofbirth,
    };

    // console.log(dt);
    console.log(context.setAnak(dt));
    //  Ortu
    if (context.state.NamaOrtu == "") {
      message.error(`Data error, please re-enter data`);
    } else {
      // var dt = {
      //   fullname: context.state.NamaOrtu,
      // };
      // context.state.NamaOrtu(dt);

      // setLoading(true);

      const resData = await fetch(`${process.env.URL_API}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          fullname: context.state.NamaOrtu,
          // phone: phone,
          // local: locals,
          // dateofbirth: values.dateofbirth,
          // camp: datacamp,
        }),
      });

      const res = await resData.json();
      if (resData.status != 200) {
        message.error(res.message);
        // router.push(`${context.state.urls}/one?camp=${datacamp}`);
      } else {
        // console.log(res.data.id);

        const resData = await fetch(`${process.env.URL_API}/anak`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            name: values.name,
            gender: values.gender,
            dateofbirth: values.dateofbirth,
            user_id: res.data.id,
            vaksin_id: 1,
          }),
        });
        const resApiAnak = await resData.json();
        if (resData.status != 200) {
          message.error(resApiAnak.message);
        } else {
          message.success(`Success`);

          props.actionProvider.handleAnakAfterSubmit(
            values.name,
            values.gender,
            values.dateofbirth,
          );
        }
        // message.success(`Success`);
        // var phone = t("phone_code") + values.phone;
      }
    }
  };

  return (
    <>
      <div className="options">
        <h1 className="options-header">Data Anak</h1>
        <div className="options-container">
          <div className="flex flex-col w-3/5">
            <Formik
              initialValues={{ name: "", dateofbirth: "", gender: "" }}
              validationSchema={RegisterSchema}
              onSubmit={onSubmitForm}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div>
                    <div className="my-2">
                      <Field
                        name="name"
                        className="w-full py-2 px-3 text-sm bg-white border border-secondary-500 overflow-hidden focus:outline-none focus:border-secondary-500 focus:ring-secondary-700 focus:ring-1"
                        type="text"
                        placeholder="Nama Anak"
                      />
                    </div>

                    {errors.name && touched.name && (
                      <div className="text-red-500 font-light text-sm ml-2">
                        {errors.name}
                      </div>
                    )}

                    <div className="my-2">
                      <DatePicker
                        format="YYYY-MM-DD"
                        name="dateofbirth"
                        placeholder="Tanggal Lahir Anak"
                        onChange={(date, dateString) =>
                          setFieldValue("dateofbirth", dateString)
                        }
                        className={`py-2 px-3 text-lg bg-white border border-secondary-500 overflow-hidden focus:outline-none focus:border-secondary-500 focus:ring-secondary-700 focus:ring-1 w-full`}
                      />
                    </div>

                    {errors.dateofbirth && touched.dateofbirth && (
                      <div className="text-red-500 font-light text-sm ml-2">
                        {errors.dateofbirth}
                      </div>
                    )}
                    <div className="my-2">
                      <Field
                        as="select"
                        name="gender"
                        placeholder="Jenis Kelamin Anak"
                        className={`py-2 px-3 text-lg bg-white border border-secondary-500 overflow-hidden focus:outline-none focus:border-secondary-500 focus:ring-secondary-700 focus:ring-1 w-full`}
                      >
                        <option className="" value="male">
                          Laki - Laki
                        </option>
                        <option className="" value="female">
                          Perempuan
                        </option>
                      </Field>
                      {errors.gender && touched.gender && (
                        <div className="text-red-500 font-light text-sm ml-2">
                          {errors.gender}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div className="option-item font-bold" key="1"> */}
                  <button
                    type="submit"
                    className="option-item font-bold w-full"
                    key="1"
                  >
                    Submit
                  </button>
                  {/* </div> */}
                </Form>
              )}
            </Formik>
            {/* <div
              className="option-item font-bold"
              onClick={props.actionProvider.handleInputNamaAnak}
              key="1"
            >
              <p className="">Nama Anak :</p>
            </div>
            <div
              className="option-item font-bold"
              onClick={props.actionProvider.handleInputTglLahir}
              key="1"
            >
              <p className="">Tanggal Lahir Anak :</p>
            </div>
            <div className="flex flex-row w-full">
              <div
                className="option-item font-bold w-1/2"
                onClick={props.actionProvider.handleInputJkL}
                key="1"
              >
                <p className="">Laki - Laki </p>
              </div>
              <div
                className="option-item font-bold w-1/2"
                onClick={props.actionProvider.handleInputJkP}
                key="1"
              >
                <p className="">Perempuan </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DataAnakVaksin;
