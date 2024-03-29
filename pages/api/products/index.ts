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
    body: { name, price, description },
    session: { user },
  } = req;
  if (req.method == "GET") {
    const products = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });

    res.json({
      ok: true,
      products,
    });
  }
  if (req.method == "POST") {
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: "temporary",
        user: {
          connect: { id: user?.id },
        },
      },
    });

    res.json({
      ok: true,
      product,
    });
  }
}

//
export default withIronSession(
  withHandler({ methods: ["POST", "GET"], handler })
);
