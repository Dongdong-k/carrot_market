import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio, { Twilio } from "twilio";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("req.body : ", req.body);
  const { email, phone } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null; // phone, email 조건에 따라 코드 분리
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  if (!user) return res.status(400).json({ ok: false }); // user 없는 경우 status 400 출력

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

  // 핸드폰 번호 로그인시 코드 문자 메세지로 전송
  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.SERVICE_SID,
      body: `here is the CODE : ${payload}`,
      to: process.env.PHONE_NUMBER!, // 필수값으로 ! 써주기, Trial 버전으로 내 번호로만 가능
    });
    console.log("message : ", message);
  }
  return res.json({ ok: true, token });
}

export default withHandler("POST", handler);
