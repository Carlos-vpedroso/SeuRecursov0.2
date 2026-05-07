import { Request } from "express";
import { JwtPayload } from "./jwtPayload";

export interface AuthRequest<
    Params = any,
    ResBody = any,
    ReqBody = any,
    ReqQuery = any
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
    user?: JwtPayload
}