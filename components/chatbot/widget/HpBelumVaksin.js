import { Spin, message, DatePicker } from "antd";
import moment from "moment";
import { Input, Select, Option } from "@material-tailwind/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import AppContext from "@/components/AppContext";
import ActionProvider from "../ActionProvider";

const HpBelumVaksin = (props) => {
  const context = useContext(AppContext);
  // const date = new Date(new Date().setFullYear(new Date().getFullYear() - 17));
  const phoneRegExp =
    /^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/;

  const RegisterSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Required"),
    // name: Yup.string()
    //   .min(6, "Too Short!")
    //   .max(30, "Too Long!")
    //   .required("Required"),
    // gender: Yup.string().required("Required"),
    // dateofbirth: Yup.string().required("Required"),
  });

  // const getBulanUsiaVaksin = (dateString) => {
  //   var months = moment().diff(dateString, "months", false);
  //   context.setUsia(months);
  //   return months;
  // };

  const onSubmitForm = async (values) => {
    console.log(values);
    var phone = "+62" + values?.phone;
    // console.log(+62 + phone);
    context.setPhone(phone);
    props.actionProvider.handleInputNoHPBelumVaksin(phone);
  };

  return (
    <>
      <div className="options">
        <h1 className="options-header">Input No Hp</h1>
        <div className="options-container">
          <div className="flex flex-col w-3/5">
            <Formik
              initialValues={{ phone: "" }}
              validationSchema={RegisterSchema}
              onSubmit={onSubmitForm}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className="mb-4 w-full">
                    <label className="block mb-1 font-bold text-gray-700 text-sm">
                      Phone number
                    </label>
                    <div className="mt-1 relative">
                      <div className="bg-gray-100 rounded-l-lg absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none">
                        <span className="text-gray-700 text-md">+62</span>
                      </div>
                      <Field
                        name="phone"
                        className="block w-full py-2 pl-14  rounded-lg text-sm text-gray-700 bg-white border border-gray-200 overflow-hidden focus:outline-none focus:border-primary-700 focus:ring-primary-700 focus:ring-1"
                        type="number"
                        pattern=""
                        placeholder="857xxxxxxx"
                      />
                    </div>
                    {errors.phone && touched.phone && (
                      <div className="text-red-500 font-light text-sm ml-2">
                        {errors.phone}
                      </div>
                    )}
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

export default HpBelumVaksin;
