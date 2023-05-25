import { NextApiRequest, NextApiResponse } from "next";

export default function helloHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Lógica para manejar la solicitud GET aquí
    res.status(200).json({ message: "GET request received" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
