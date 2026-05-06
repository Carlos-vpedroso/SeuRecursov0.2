import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwtPayload";


export interface AuthRequest extends Request {
    user?: JwtPayload;
}

const userMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_TOKEN as string
        ) as JwtPayload;

        // salva dados do usuário na request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido ou expirado" });
    }
};

export default userMiddleware;