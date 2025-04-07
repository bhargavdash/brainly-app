"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../database/db");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
const router = (0, express_1.Router)();
router.get("/healthy", (req, res) => {
    res.send("Router is healthy");
});
const requiredUser = zod_1.z.object({
    username: zod_1.z.string()
        .min(3, { message: "Username must have atleast 3 letters" })
        .max(10, { message: 'username must have atmost 10 letters' }),
    password: zod_1.z.string()
        .min(8, { message: "password must have atleast 8 characters" })
        .max(20, { message: "password must have atmost 20 characters" })
        .refine(value => {
        return /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[!@#$%^&*()]/.test(value);
    })
});
// signup route
router.post('/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success, error } = requiredUser.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ error: error });
        }
        const username = req.body.username;
        const password = req.body.password;
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        const newUser = yield db_1.UserModel.create({
            username: username,
            password: hashedPassword
        });
        if (!newUser) {
            return res.status(400).json({ error: "Cannot create user" });
        }
        return res.status(200).json({ message: "User created!!" });
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({ error: err });
    }
}));
// signin route
router.post('/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { success, error } = requiredUser.safeParse(req.body);
        if (!success) {
            return res.status(411).json({ error: error });
        }
        const username = req.body.username;
        const password = req.body.password;
        const user = yield db_1.UserModel.findOne({
            username: username
        });
        if (!user) {
            return res.status(400).json({ error: "user does not exist" });
        }
        const matchedPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!matchedPassword) {
            return res.status(403).json({ error: "Incorrect password" });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user._id
        }, JWT_SECRET);
        return res.status(200).json({ message: "signIn successful", token: token });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
// add a content
router.post('/v1/content', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const type = req.body.type;
        const link = req.body.link;
        const title = req.body.title;
        const tags = req.body.tags;
        const newContent = yield db_1.ContentModel.create({
            type: type,
            link: link,
            title: title,
            tags: tags,
            createdAt: new Date(),
            userId: userId
        });
        if (!newContent) {
            return res.status(400).json({ error: "can't create new content" });
        }
        return res.status(200).json({ message: "Content created!!", content: newContent });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
// get all contents
router.get('/v1/content', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const contents = yield db_1.ContentModel.find({
            userId: userId
        }).populate('tags');
        if (!contents) {
            return res.status(400).json({ error: "Cannot fetch contents" });
        }
        return res.status(200).json({ content: contents });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
// delete a content
router.delete('/v1/content', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const contentId = req.body.contentId;
    const targetContent = yield db_1.ContentModel.findOne({
        _id: contentId
    });
    if (!targetContent) {
        return res.status(400).json({ error: "Required content not found" });
    }
    if (targetContent.userId != userId) {
        return res.status(400).json({ error: "Cannot delete this content. UserId didn't match" });
    }
    const deletedContent = yield db_1.ContentModel.findByIdAndDelete(contentId);
    if (!deletedContent) {
        return res.status(400).json({ error: "cannot delete content" });
    }
    return res.status(200).json({ message: "content deleted!!" });
}));
// create a sharable link 
router.post('/v1/brain/share', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const sharable = req.body.share;
    const existingLink = yield db_1.LinkModel.findOne({ userId: userId });
    if (existingLink) {
        existingLink.sharable = sharable;
        const hashString = existingLink.hash;
        yield existingLink.save();
        if (sharable) {
            return res.status(200).json({ shareLink: hashString });
        }
        else {
            return res.status(200).json({ message: "Sharable set to false" });
        }
    }
    else {
        const hashString = crypto.randomUUID();
        const newLink = yield db_1.LinkModel.create({
            hash: hashString,
            userId: userId,
            sharable: sharable
        });
        if (!newLink) {
            return res.status(400).json({ error: "Cannot create new sharable link" });
        }
        if (sharable) {
            return res.status(200).json({ shareLink: hashString });
        }
        else {
            return res.status(200).json({ message: "Sharable set to false" });
        }
    }
}));
// get the contents from the sharable link
router.get('/v1/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shareLink = req.params.shareLink;
        const getLink = yield db_1.LinkModel.findOne({ hash: shareLink, sharable: true });
        if (!getLink) {
            return res.status(404).json({ error: "Link not found or not accessible" });
        }
        const userId = getLink.userId;
        const contents = yield db_1.ContentModel.find({ userId: userId }).populate('tags');
        return res.status(200).json({ contents: contents });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
}));
exports.default = router;
