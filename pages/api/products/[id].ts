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
  res.json({
    ok: true,
    product,
  });
}

//
export default withIronSession(withHandler({ methods: ["GET"], handler }));
