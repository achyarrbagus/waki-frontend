export default async function handler(req, res) {
  if (req.method === "GET") {
    const { locale } = req.query;

    // const resData = await fetch(`http://127.0.0.1:8000/api/methods/${locale}`, {
    const resData = await fetch(
      `https://dev.suratsakit.com/api/methods/${locale}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );

    const data = await resData.json();
    res.status(resData.status).json(data);
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
