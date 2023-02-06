// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getScreenShot } from "@/lib/screenshot";

type Data = {
  base64: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = req.query.url;
  if (!url || typeof url !== "string") {
    res.status(400);
    res.json({ base64: "" });
    return;
  }
  const base64 = await getScreenShot(url);
  res.status(200).json( { base64 } );
}
