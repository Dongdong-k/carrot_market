import { withIronSessionApiRoute } from "iron-session/next";

// req.session 데이터 타입 설정
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotSession",
  password: process.env.IRON_PW!,
};

// API로부터 Session 받아오기
export function withIronSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

// Server Side Rendering
