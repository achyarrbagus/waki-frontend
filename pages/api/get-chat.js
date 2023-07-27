export default async function handler(req, res) {
  if (req.method === "POST") {
    const resData = await fetch(`https://dev.suratsakit.com/api/get_chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        idp: req.body.idp,
      }),
    });

    const data = await resData.json();
    res.status(resData.status).json(data);
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
