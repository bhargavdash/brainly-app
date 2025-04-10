import { Router, Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import { ContentModel, LinkModel, TagModel, UserModel } from "../database/db";
import authMiddleware from "../middleware/authMiddleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

const router = Router();

router.get("/healthy", (req, res) => {
  res.send("Router is healthy");
});

const requiredUser = z.object({
  username: z
    .string()
    .min(3, { message: "Username must have atleast 3 letters" })
    .max(10, { message: "username must have atmost 10 letters" }),
  password: z
    .string()
    .min(8, { message: "password must have atleast 8 characters" })
    .max(20, { message: "password must have atmost 20 characters" })
    .refine((value) => {
      return (
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[!@#$%^&*()]/.test(value)
      );
    }),
});

// signup route

router.post("/v1/signup", async (req, res): Promise<any> => {
  try {
    const { success, error } = requiredUser.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ error: error });
    }

    const username = req.body.username;
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await UserModel.create({
      username: username,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({ error: "Cannot create user" });
    }
    return res.status(200).json({ message: "User created!!" });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: err });
  }
});

// signin route

router.post("/v1/signin", async (req, res): Promise<any> => {
  try {
    const { success, error } = requiredUser.safeParse(req.body);
    if (!success) {
      return res.status(411).json({ error: error });
    }

    const username = req.body.username;
    const password = req.body.password;

    const user = await UserModel.findOne({
      username: username,
    });

    if (!user) {
      return res.status(400).json({ error: "user does not exist" });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(403).json({ error: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    return res.status(200).json({ message: "signIn successful", token: token });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});

// custom request interface to add userId to req
interface CustomerRequest extends Request {
  userId?: string;
}

// add a content

router.post(
  "/v1/content",
  authMiddleware,
  async (req: CustomerRequest, res: Response): Promise<any> => {
    try {
      const userId = req.userId;
      const type = req.body.type;
      const link = req.body.link;
      const title = req.body.title;
      const tags = req.body.tags;

      const tagIds = []

      for(let i=0; i<tags.length; i++){
        let currTag = await TagModel.findOne({title: tags[i]});

        if(!currTag){
          // create new tag
          const newTag = await TagModel.create({
            title: tags[i]
          })
          currTag = newTag
        }

        tagIds.push(currTag._id)
      }

      const newContent = await ContentModel.create({
        type: type,
        link: link,
        title: title,
        tags: tagIds,
        createdAt: new Date(),
        userId: userId,
      });

      if (!newContent) {
        return res.status(400).json({ error: "can't create new content" });
      }
      return res
        .status(200)
        .json({ message: "Content created!!", content: newContent });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
  }
);

// get all contents
router.get(
  "/v1/content/:type",
  authMiddleware,
  async (req: CustomerRequest, res): Promise<any> => {
    try {
      const userId = req.userId;
      const type = req.params.type;
      if (type === "all") {
        const contents = await ContentModel.find({
          userId: userId,
        }).populate("tags");

        if (!contents) {
          return res.status(400).json({ error: "Cannot fetch contents" });
        }
        return res.status(200).json({ content: contents });
      } else {
        const contents = await ContentModel.find({
          userId: userId,
          type: type,
        }).populate("tags");

        if (!contents) {
          return res.status(400).json({ error: "Cannot fetch contents" });
        }
        return res.status(200).json({ content: contents });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: err });
    }
  }
);

// delete a content
router.delete(
  "/v1/content",
  authMiddleware,
  async (req: CustomerRequest, res): Promise<any> => {
    const userId = req.userId;
    const contentId = req.body.contentId;

    const targetContent = await ContentModel.findOne({
      _id: contentId,
    });
    if (!targetContent) {
      return res.status(400).json({ error: "Required content not found" });
    }
    if (targetContent.userId != userId) {
      return res
        .status(400)
        .json({ error: "Cannot delete this content. UserId didn't match" });
    }
    const deletedContent = await ContentModel.findByIdAndDelete(contentId);
    if (!deletedContent) {
      return res.status(400).json({ error: "cannot delete content" });
    }
    return res.status(200).json({ message: "content deleted!!" });
  }
);

// create a sharable link

router.post(
  "/v1/brain/share",
  authMiddleware,
  async (req: CustomerRequest, res): Promise<any> => {
    const userId = req.userId;
    const sharable: boolean = req.body.share;

    const existingLink = await LinkModel.findOne({ userId: userId });

    if (existingLink) {
      existingLink.sharable = sharable;
      const hashString = existingLink.hash;
      await existingLink.save();
      if (sharable) {
        return res.status(200).json({ shareLink: hashString });
      } else {
        return res.status(200).json({ message: "Sharable set to false" });
      }
    } else {
      const hashString = crypto.randomUUID();
      const newLink = await LinkModel.create({
        hash: hashString,
        userId: userId,
        sharable: sharable,
      });
      if (!newLink) {
        return res
          .status(400)
          .json({ error: "Cannot create new sharable link" });
      }
      if (sharable) {
        return res.status(200).json({ shareLink: hashString });
      } else {
        return res.status(200).json({ message: "Sharable set to false" });
      }
    }
  }
);

// get the contents from the sharable link
router.get("/v1/brain/:shareLink", async (req, res): Promise<any> => {
  try {
    const shareLink = req.params.shareLink;
    const getLink = await LinkModel.findOne({
      hash: shareLink,
      sharable: true,
    });

    if (!getLink) {
      return res
        .status(404)
        .json({ error: "Link not found or not accessible" });
    }
    const userId = getLink.userId;
    const contents = await ContentModel.find({ userId: userId }).populate(
      "tags"
    );
    return res.status(200).json({ contents: contents });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});


// get tag suggestions 
router.get('/v1/tags', authMiddleware, async(req, res): Promise<any>=> {
  try{
    const tags = await TagModel.find({
      title: {$regex: `^${req.query.search}`, $options:'i'}
    });

    return res.status(200).json({tags: tags});
  } catch(err){
    console.log(err);
    return res.status(400).json({error: err});
  }
})
export default router;
