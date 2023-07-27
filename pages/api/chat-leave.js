import cookie from "cookie";
import { parseCookies } from "@/helpers/index";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    const resData = await fetch(`https://dev.suratsakit.com/api/chat_leave`, {
      // const resData = await fetch(`http://127.0.0.1:8000/api/chat_leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        ipd: req.body.idp,
      }),
    });

    const data = await resData.json();

    if (resData.ok) {
      res.status(resData.status).json(data);
    } else {
      res.status(resData.status).json({ message: "Error Invalid Input" });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
