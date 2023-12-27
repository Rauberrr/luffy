"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(require("../Schema/Comment"));
const Post_1 = __importDefault(require("../Schema/Post"));
class CommentController {
    async list(req, res) {
        const { postId } = req.params;
        try {
            const response = await Comment_1.default.findAll({ where: { postId } });
            console.log(response);
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ erro: 'Error', error });
        }
    }
    async insert(req, res) {
        const { userId, comment } = req.body;
        const { postId } = req.params;
        const findIdPost = await Post_1.default.findByPk(postId);
        if (findIdPost === null) {
            return res.status(401).json({ msg: 'Erro' });
        }
        try {
            const response = await Comment_1.default.create({
                postId,
                userId,
                comment
            });
            console.log(response);
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ error });
        }
    }
    async update(req, res) {
        const { userId, comment } = req.body;
        const { postId, commentId } = req.params;
        const findIdPost = await Post_1.default.findByPk(postId);
        if (findIdPost === null) {
            return res.status(401).json({ msg: 'Erro' });
        }
        try {
            await Comment_1.default.update({
                postId,
                userId,
                comment
            }, { where: { commentId } });
            const response = await Comment_1.default.findByPk(commentId);
            console.log(response);
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ error });
        }
    }
    async delete(req, res) {
        const { commentId } = req.params;
        try {
            const response = await Comment_1.default.findByPk(commentId);
            await Comment_1.default.destroy({ where: { commentId } });
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ error });
        }
    }
}
exports.default = new CommentController();
