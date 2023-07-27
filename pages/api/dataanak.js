import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    const resData = await fetch(`${process.env.URL_API}/api/con_data`, {
      method: "POST",
      data,
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
