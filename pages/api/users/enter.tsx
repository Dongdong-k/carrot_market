import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  const { email, phone } = req.body;
  const payload = phone ? { phone: +phone } : { email }; // phone, email 조건에 따라 코드 분리

  // upsert 활용하기 - create, update, where(find)
  // phone 으로 사용자 검색 -> 없는 경우 생성 or 있는 경우 업데이트
  // es6 활용 조건에 따른 코드작성 => ...(조건 ? {Return : {}})

  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "Anonymous",
      ...payload,
    },
    update: {},
  });

  console.log(user);

  res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
