import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const resData = await fetch(`http://127.0.0.1:8000/api/do_payment`, {
    const resData = await fetch(`https://dev.suratsakit.com/api/do_payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        method: req.body.method,
        uid: req.body.uid,
        phone: req.body.phone,
        local: req.body.local,
      }),
    });

    const response = await resData.json();

    if (resData.ok) {
      res.status(resData.status).json(response);
    } else {
      res.status(resData.status).json({ message: "Error Invalid Input" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
