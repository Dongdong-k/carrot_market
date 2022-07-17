import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // API 요청 타입 검증하기
  // 정상 : POST, 비정상 : GET
  if (req.method !== "POST") {
    res.status(401).end();
  }
  console.log(req.body);
  res.json({
    ok: true,
  });
}
