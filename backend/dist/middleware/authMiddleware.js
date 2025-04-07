"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
function authMiddleware(req, res, next) {
    const token = req.headers['token'];
    if (!token) {
        res.status(400).json({ error: "Token not found" });
        return;
    }
    const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (!decodedToken) {
        res.status(400).json({ error: "JWT auth failed" });
        return;
    }
    req.userId = decodedToken.userId;
    next();
}
exports.default = authMiddleware;
