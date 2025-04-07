import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET: string = process.env.JWT_SECRET ?? ""

interface CustomRequest extends Request {
    userId?: string
}

function authMiddleware (req: CustomRequest, res: Response, next: NextFunction): void{
    const token = req.headers['token'] as string | undefined;
    if(!token){
        res.status(400).json({error: "Token not found"});
        return;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as {userId: string};
    if(!decodedToken){
        res.status(400).json({error: "JWT auth failed"});
        return;
    }
   
    req.userId = decodedToken.userId
    next();
}

export default authMiddleware;