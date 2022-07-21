import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withIronSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // session 내용 확인하기
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  console.log(profile);
  res.json({
    ok: true,
    profile,
  });
}

//
export default withIronSession(withHandler("GET", handler));
