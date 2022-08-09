import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withIronSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  // 입력 값, user 가져오기
  const {
    body: { question },
    session: { user },
  } = req;

  // 게시물 등록하기
  const post = await client.post.create({
    data: {
      question,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    ok: true,
    post,
  });
}

//
export default withIronSession(withHandler({ methods: ["POST"], handler }));
