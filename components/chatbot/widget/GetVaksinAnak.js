import React, { useState, useEffect } from "react";
import { useContext } from "react";
import AppContext from "@/components/AppContext";
import OptionsVaksin from "@/components/chatbot/widget/OptionsVaksin";
import { Formik, Field, Form } from "formik";

const sleep = (ms) => new Promise((r) => setTimeout);

const GetVaksinAnak = (props) => {
  const context = useContext(AppContext);

  const [vaksinUsia, setVaksinUsia] = useState([]);
  const [vaksinId, setVaksinId] = useState([]); //Save the selected category id
  // console.log(vaksinUsia);
  console.log(vaksinId);
  context.setVaksin();

  useEffect(() => {
    fetchDataVaksinUsia();
  }, []);
  const fetchDataVaksinUsia = async () => {
    await fetch(`${process.env.URL_API}/listanakvaksin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usia: context.state.usia,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        var newArray = json.data.filter(function (el) {
          return el.id >= 0;
        });
        setVaksinUsia(newArray);
      });
  };

  const dataVaksinAnak = vaksinUsia;
  // console.log(dataVaksinAnak);

  const options = dataVaksinAnak;
  // console.log(options);

  return (
    <div>
      <Formik
        initialValues={{
          checked: [],
        }}
        onSubmit={async (values) => {
          // console.log(values);
          context.setVaksin(values.checked);
          const jumlahBelumVaksin =
            `${vaksinUsia.length}` - `${values.checked.length}`;
          // console.log(values.checked);Zz
          // const data = values.checked.map((vaksinAnak) => {
          //   return vaksinAnak;
          // });
          // console.log(data);
          await props?.actionProvider.handlePilihSisaVaksin(values.checked);
          await props?.actionProvider.handleAnakAfterPilihVaksin(
            jumlahBelumVaksin,
          );
        }}
      >
        {({ values }) => (
          <Form>
            {/* 
            This first checkbox will result in a boolean value being stored. Note that the `value` prop
            on the <Field/> is omitted
          */}
            {/* <label>
              <Field type="checkbox" name="toggle" />
              {`${values.toggle}`}
            </label> */}

            {/* 
            Multiple checkboxes with the same name attribute, but different
            value attributes will be considered a "checkbox group". Formik will automagically
            bind the checked values to a single array for your benefit. All the add and remove
            logic will be taken care of for you.
          */}
            <div
              role="group"
              aria-labelledby="checkbox-group"
              className="w-full py-2 px-3 text-sm bg-white border border-secondary-500 overflow-hidden focus:outline-none focus:border-secondary-500 focus:ring-secondary-700 focus:ring-1 mb-4"
            >
              <ul>
                {console.log(values)}
                {options?.map((option, index) => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <li key={index}>
                      <label>
                        <Field
                          type="checkbox"
                          name="checked"
                          value={option?.namevaksin}
                          className="bg-brown-800 m-4"
                        />
                        {option?.namevaksin}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                // onClick={handleChangeVaksinId}
                className="option-item font-bold w-2/3 pt-4 mt-4"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GetVaksinAnak;
