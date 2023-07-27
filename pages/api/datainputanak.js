export default async function handler(req, res) {
  if (req.method === "POST") {
    const resData = await fetch(`${process.env.URL_API}/api/v1/anak`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name: values.name,
        gender: values.gender,
        dateofbirth: values.dateofbirth,
        user_id: 1,
        vaksin_id: 1,
      }),
    });

    const data = await resData.json();
    res.status(resData.status).json(data);
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
