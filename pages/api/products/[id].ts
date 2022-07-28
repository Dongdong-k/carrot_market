import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { withIronSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: { id: +id.toString() },
    include: {
      user: true,
    },
  });

  // Similar Item Search
  // 키워드 배열로 변경 & 검색을 위해 객체 형식으로 만들기
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id, // 현재 상품은 제외하기
        },
      },
    },
  });

  res.json({
    ok: true,
    product,
    relatedProducts,
  });
}

//
export default withIronSession(withHandler({ methods: ["GET"], handler }));
