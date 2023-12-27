"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../Schema/Post"));
const Comment_1 = __importDefault(require("../Schema/Comment"));
const Like_1 = __importDefault(require("../Schema/Like"));
class PostController {
    async list(req, res) {
        try {
            const response = await Post_1.default.findAll();
            console.log(response);
            return res.status(200).json({ msg: 'Sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ msg: 'Error' });
        }
    }
    async listId(req, res) {
        const { postId } = req.params;
        try {
            const response = await Post_1.default.findByPk(postId);
            console.log(response);
            return res.status(200).json({ msg: 'Sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ msg: 'Error' });
        }
    }
    async listUserId(req, res) {
        const { userId } = req.params;
        try {
            const response = await Post_1.default.findAll({ where: { userId } });
            console.log(response);
            return res.status(200).json({ msg: 'Sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ msg: 'Error' });
        }
    }
    async listUserIdLikes(req, res) {
        const { userId } = req.params;
        try {
            const responseLike = await Like_1.default.findAll({ where: { userId } });
            const likedPostIds = responseLike.map((like) => like.getDataValue('postId'));
            const likedPosts = await Post_1.default.findAll({ where: { postId: likedPostIds } });
            console.log(likedPosts);
            return res.status(200).json({ msg: 'Sucessfully', response: likedPosts });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ msg: 'Error' });
        }
    }
    async create(req, res) {
        const { userId, content } = req.body;
        // const { user, comment } = req.body.comments
        try {
            console.log(userId, content);
            const response = await Post_1.default.create({
                userId,
                content
            });
            console.log(JSON.stringify(response.toJSON(), null, 2));
            return res.status(200).json({ msg: 'Sucessfully', response });
        }
        catch (error) {
            console.log(error);
            return res.status(401).json({ msg: 'Error' });
        }
    }
    async update(req, res) {
        const { userId, content } = req.body;
        const { postId } = req.params;
        try {
            await Post_1.default.update({
                userId,
                content
            }, { where: { postId } });
            const response = await Post_1.default.findByPk(postId);
            console.log(response);
            return res.status(200).json({ msg: 'Sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ msg: 'Error' });
        }
    }
    async delete(req, res) {
        const { postId } = req.params;
        try {
            const responsePost = await Post_1.default.findByPk(postId);
            const responseComment = await Comment_1.default.findAll({ where: { postId } });
            const responseLikes = await Like_1.default.findAll({ where: { postId } });
            await Post_1.default.destroy({ where: { postId } });
            await Comment_1.default.destroy({ where: { postId } });
            return res.status(200).json({ msg: 'Sucessfully', responsePost, responseComment, responseLikes });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ msg: 'Error' });
        }
    }
}
exports.default = new PostController();
