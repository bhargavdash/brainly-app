"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const route_1 = __importDefault(require("./routes/route"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : "";
const MONGO_URI = (_b = process.env.MONGO_URI) !== null && _b !== void 0 ? _b : "";
mongoose_1.default.connect(MONGO_URI).then(() => {
    console.log("DB connected!!");
});
app.use('/api', route_1.default);
app.get('/healthy', (req, res) => {
    res.send("Main route is healthy");
});
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
