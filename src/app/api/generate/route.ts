import { NextApiRequest, NextApiResponse } from "next";

export default function generateHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Lógica para manejar la solicitud POST aquí
    res.status(200).json({ message: "POST request received" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
