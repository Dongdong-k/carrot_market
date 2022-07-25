import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: "GET" | "POST" | "DELETE";
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  handler,
  isPrivate = true, //default = true
  method,
}: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method !== method) {
      // 요청한 method와 실행할 api method 다른 경우
      // api url로 접속시도하는 경우 접근차단 가능
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(400).json({ ok: false, error: "Please Log In" });
    }
    try {
      // 정상요청 경우, function 실행
      await handler(req, res);
    } catch (error) {
      // 에러 발생시 처리
      console.log(error);
      return res.status(500).json({ error }); // server error 발생시 Json으로 반환
    }
  };
}
