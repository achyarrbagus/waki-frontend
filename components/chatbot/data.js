export const getLastAnak = async () => {
  let data = await fetch(`${process.env.URL_API}/lastanak`);
  data = await data.json();
  return data.data;
};
