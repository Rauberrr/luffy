"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Like_1 = __importDefault(require("../Schema/Like"));
const Post_1 = __importDefault(require("../Schema/Post"));
class LikeController {
    async listPostId(req, res) {
        const { postId } = req.params;
        try {
            const response = await Like_1.default.findAll({ where: { postId } });
            console.log(response);
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ erro: 'Error', error });
        }
    }
    async listUserId(req, res) {
        const { userId } = req.params;
        try {
            const response = await Like_1.default.findAll({ where: { userId } });
            console.log(response);
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ erro: 'Error', error });
        }
    }
    async listComments(req, res) {
        const { commentId } = req.params;
        try {
            const response = await Like_1.default.findAll({ where: { commentId } });
            console.log(response);
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ erro: 'Error', error });
        }
    }
    async insert(req, res) {
        const { userId } = req.body;
        const { postId } = req.params;
        try {
            const findIdPost = await Post_1.default.findByPk(postId);
            // console.log('findIdPost', findIdPost)
            if (findIdPost === null) {
                return res.status(401).json({ msg: 'Erro' });
            }
            const findUserId = await Like_1.default.findAll({ where: { userId, postId, commentId: null } });
            console.log('FINDUSERRRID', findUserId);
            if (findUserId.length === 0) {
                const response = await Like_1.default.create({
                    postId,
                    userId
                });
                console.log(response);
                return res.status(200).json({ msg: 'like', response });
            }
            else {
                await Like_1.default.destroy({ where: { userId, postId, commentId: null } });
                return res.status(200).json({ msg: 'deslike', response: [] });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ error });
        }
    }
    async insertComments(req, res) {
        const { userId } = req.body;
        const { postId, commentId } = req.params;
        try {
            const findIdPost = await Post_1.default.findByPk(postId);
            // console.log('findIdPost', findIdPost)
            if (findIdPost === null) {
                return res.status(401).json({ msg: 'Erro' });
            }
            const findUserId = await Like_1.default.findAll({ where: { userId, postId, commentId } });
            console.log('FINDUSERRRID', findUserId);
            if (findUserId.length === 0) {
                const response = await Like_1.default.create({
                    postId,
                    userId,
                    commentId
                });
                console.log(response);
                return res.status(200).json({ msg: 'like', response });
            }
            else {
                const response = await Like_1.default.destroy({ where: { userId, postId, commentId } });
                return res.status(200).json({ msg: 'deslike', response });
            }
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ error });
        }
    }
    // public async update (req: Request, res: Response): Promise<Response> {
    //   const { userId } = req.body
    //   const { postId } = req.params
    //   const findIdPost = await Posts.findByPk(postId)
    //   if (!findIdPost) {
    //     return res.status(401).json({ msg: 'Erro' })
    //   }
    //   const findUser = await Posts.findAll({ where: { userId } })
    //   if(!findUser) {
    //   }
    //   try {
    //     await Like.update({
    //       userId
    //     }, { where: { userId } })
    //     const response = await Like.findAll({ where: { userId } })
    //     console.log(response)
    //     return res.status(200).json({ msg: 'sucessfully', response })
    //   } catch (error) {
    //     console.error(error)
    //     return res.status(401).json({ error })
    //   }
    // }
    async delete(req, res) {
        const { userId } = req.params;
        try {
            const response = await Like_1.default.findByPk(userId);
            await Like_1.default.destroy({ where: { userId } });
            return res.status(200).json({ msg: 'sucessfully', response });
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ error });
        }
    }
}
exports.default = new LikeController();
