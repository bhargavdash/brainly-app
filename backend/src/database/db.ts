import mongoose, { Types } from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true}
})

const contentType = ["image", "video", "article", "audio", "tweet"];

const contentSchema = new mongoose.Schema({
    link: {type: String, required:true},
    type: {type: String, enum:contentType, required:true},
    title: {type: String, required:true},
    tags: [{type: Types.ObjectId, ref: 'Tag'}],
    createdAt: {type: Date, required:true},
    userId: {type: Types.ObjectId, ref: 'User'}
})

const linkSchema = new mongoose.Schema({
    hash: {type: String, required:true},
    userId: {type: Types.ObjectId, ref: 'User', required:true, unique:true},
    sharable: {type: Boolean, default: false}
})

const tagSchema = new mongoose.Schema({
    title: {type: String, required:true, unique:true}
})

export const UserModel = mongoose.model('User', userSchema);
export const ContentModel = mongoose.model('Content', contentSchema);
export const LinkModel = mongoose.model('Link', linkSchema);
export const TagModel = mongoose.model('Tag', tagSchema);


