import { type Request, type Response } from 'express'
import Posts from '../Schema/Post'
import Comment from '../Schema/Comment'
import Like from '../Schema/Like'

interface likeProps {
  userId: string
  postId: string
  commentId: string
}

class PostController {
  public async list (req: Request, res: Response): Promise<Response> {
    try {
      const response = await Posts.findAll()

      console.log(response)
      return res.status(200).json({ msg: 'Sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async listId (req: Request, res: Response): Promise<Response> {
    const { postId } = req.params

    try {
      const response = await Posts.findByPk(postId)

      console.log(response)
      return res.status(200).json({ msg: 'Sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async listUserId (req: Request, res: Response): Promise<Response> {
    const { userId } = req.params

    try {
      const response = await Posts.findAll({ where: { userId } })

      console.log(response)
      return res.status(200).json({ msg: 'Sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async listUserIdLikes (req: Request, res: Response): Promise<Response> {
    const { userId } = req.params

    try {
      const responseLike = await Like.findAll({ where: { userId } })

      const likedPostIds = responseLike.map((like) => like.postId)
      const likedPosts = await Posts.findAll({ where: { postId: likedPostIds } })

      console.log(likedPosts)
      return res.status(200).json({ msg: 'Sucessfully', response: likedPosts })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { userId, content } = req.body
    // const { user, comment } = req.body.comments

    try {
      console.log(userId, content)

      const response = await Posts.create({
        userId,
        content
      })

      console.log(JSON.stringify(response.toJSON(), null, 2))
      return res.status(200).json({ msg: 'Sucessfully', response })
    } catch (error) {
      console.log(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { userId, content } = req.body
    const { postId } = req.params

    try {
      await Posts.update({
        userId,
        content
      }, { where: { postId } })

      const response = await Posts.findByPk(postId)

      console.log(response)
      return res.status(200).json({ msg: 'Sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { postId } = req.params

    try {
      const responsePost = await Posts.findByPk(postId)
      const responseComment = await Comment.findAll({ where: { postId } })
      const responseLikes = await Like.findAll({ where: { postId } })
      await Posts.destroy({ where: { postId } })
      await Comment.destroy({ where: { postId } })
      return res.status(200).json({ msg: 'Sucessfully', responsePost, responseComment, responseLikes })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async luffies (req: Request, res: Response): Promise<Response> {
    const { nameProfile } = req.body

    try {
      const response = await Posts.findAll({ where: { name: nameProfile } })

      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }
}

export default new PostController()
