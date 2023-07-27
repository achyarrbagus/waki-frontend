import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;

    // const resData = await fetch(`http://127.0.0.1:8000/api/patient`, {
    const resData = await fetch(`https://dev.suratsakit.com/api/patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        qf: data.cont.state.qf,
        qr: data.cont.state.qr,
        name: data.name,
        phone: data.phone,
        dateofbirth: data.dateofbirth,
        urls: data.cont.state.urls,
        local: data.local,
      }),
    });

    const response = await resData.json();

    if (resData.ok) {
      res
        .status(resData.status)
        .json({ message: response.msg, uid: response.uid });
    } else {
      res.status(resData.status).json({ message: "Error Invalid Input" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
