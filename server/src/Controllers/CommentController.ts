import { type Request, type Response } from 'express'
import Comment from '../Schema/Comment'
import Posts from '../Schema/Post'

class CommentController {
  public async list (req: Request, res: Response): Promise<Response> {
    const { postId } = req.params

    try {
      const response = await Comment.findAll({ where: { postId } })

      console.log(response)
      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ erro: 'Error', error })
    }
  }

  public async insert (req: Request, res: Response): Promise<Response> {
    const { userId, comment } = req.body
    const { postId } = req.params

    const findIdPost = await Posts.findByPk(postId)

    if (findIdPost === null) {
      return res.status(401).json({ msg: 'Erro' })
    }

    try {
      const response = await Comment.create({
        postId,
        userId,
        comment
      })

      console.log(response)

      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { userId, comment } = req.body
    const { postId, commentId } = req.params

    const findIdPost = await Posts.findByPk(postId)

    if (findIdPost === null) {
      return res.status(401).json({ msg: 'Erro' })
    }

    try {
      await Comment.update({
        postId,
        userId,
        comment
      }, { where: { commentId } })

      const response = await Comment.findByPk(commentId)

      console.log(response)
      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params

    try {
      const response = await Comment.findByPk(commentId)
      await Comment.destroy({ where: { commentId } })

      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }
}

export default new CommentController()
