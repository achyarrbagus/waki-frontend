export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const resData = await fetch(
      `https://api.sehatcepat.com/api/doctors/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );

    const data = await resData.json();
    res.setPreviewData(id);
    res.status(resData.status).json(data);
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
