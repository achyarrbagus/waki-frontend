export default async function handler(req, res) {
  if (req.method === "POST") {
    const resData = await fetch(`https://dev.suratsakit.com/api/get_patient`, {
      // const resData = await fetch(`http://127.0.0.1:8000/api/get_patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uid: req.body.uid,
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
