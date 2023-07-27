export default async function handler(req, res) {
  if (req.method === "POST") {
    // const resData = await fetch(`http://127.0.0.1:8000/api/post_refund`, {
    const resData = await fetch(`https://dev.suratsakit.com/api/post_refund`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        uid: req.body.uid,
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
