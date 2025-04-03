import mongoose, { Types } from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required:true}
})

const contentType = ["image", "video", "article", "audio"];

const contentSchema = new mongoose.Schema({
    line: {type: String, required:true},
    type: {type: String, enum:contentType, required:true},
    title: {type: String, required:true},
    tags: [{type: Types.ObjectId, ref: 'Tag'}],
    userId: {type: Types.ObjectId, ref: 'User'}
})

const linkSchema = new mongoose.Schema({
    hash: {type: String, required:true},
    userId: {type: Types.ObjectId, ref: 'User', required:true}
})

const tagSchema = new mongoose.Schema({
    title: {type: String, required:true, unique:true}
})

const User = mongoose.model('user', userSchema);
const Content = mongoose.model('content', contentSchema);
const Link = mongoose.model('link', linkSchema);
const Tag = mongoose.model('tag', tagSchema);

module.exports = {
    User,
    Content, 
    Link, 
    Tag
}