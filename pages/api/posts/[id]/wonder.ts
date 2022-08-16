import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withIronSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await client.wondering.findFirst({
    where: {
      postId: +id.toString(),
      userId: user?.id,
    },
    select: {
      id: true,
    },
  });

  // 궁금해요 존재 여부에 따른 삭제/생성
  if (alreadyExists) {
    // 존재시 => 삭제하기
    await client.wondering.delete({
      where: {
        id: alreadyExists?.id,
      },
    });
  } else {
    // 미존재시 => 생성하기
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id.toString(),
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}

//
export default withIronSession(withHandler({ methods: ["POST"], handler }));
