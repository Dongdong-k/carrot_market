import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body;
  console.log("api token : ", token);

  // token 매칭여부 확인
  const exists = await client.token.findUnique({
    where: { payload: token },
    include: { user: true },
  });

  // token 에 맞는 user가 없는 경우 - 종료
  if (!exists) return res.status(404).end();
  // token 에 맞는 user가 있는 경우 - req.session 에 저장
  else if (exists) {
    // req.session 정의 필요
    req.session.user = {
      id: exists?.userId,
    };
    await req.session.save();
  }

  // token 확인 후 기존 내역 삭제하기
  await client.token.deleteMany({ where: { userId: req.session.user?.id } });

  // session 내용 확인하기
  console.log("req.session : ", req.session);
  res.json({
    ok: true,
  });
}

//
export default withIronSession(
  withHandler({ method: "POST", handler, isPrivate: false })
);
