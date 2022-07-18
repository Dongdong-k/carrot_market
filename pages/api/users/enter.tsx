import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  const { email, phone } = req.body;
  const user = phone ? { phone: +phone } : { email }; // phone, email 조건에 따라 코드 분리
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  // upsert 활용하기 - create, update, where(find)
  // phone 으로 사용자 검색 -> 없는 경우 생성 or 있는 경우 업데이트
  // es6 활용 조건에 따른 코드작성 => ...(조건 ? {Return : {}})

  // token 생성하기
  // Token 생성시 User 체크 => 존재시 connect | 없는경우 create
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  console.log(token);

  res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
