export default async function handler(req, res) {
  if (req.method === "GET") {
    const { locale } = req.query;
    const resData = await fetch(
      `https://api.sehatcepat.com/api/articles?locale=${locale}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
