export default async function handler(req, res) {
  if (req.method === "POST") {
    const resData = await fetch(`${process.env.URL_API}/anakvaksin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        camp: req.body.camp,
        page: req.body.page,
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
