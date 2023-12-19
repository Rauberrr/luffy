import { type Request, type Response } from 'express'
import Like from '../Schema/Like'
import Posts from '../Schema/Post'

interface likesProps {
  userId: number
  postId: number
}

class LikeController {
  public async list (req: Request, res: Response): Promise<Response> {
    const { postId } = req.params

    try {
      const response = await Like.findAll({ where: { postId } })

      console.log(response)
      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ erro: 'Error', error })
    }
  }

  public async listComments (req: Request, res: Response): Promise<Response> {
    const { commentId } = req.params

    try {
      const response = await Like.findAll({ where: { commentId } })

      console.log(response)
      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ erro: 'Error', error })
    }
  }

  public async insert (req: Request, res: Response): Promise<Response> {
    const { userId } = req.body
    const { postId } = req.params

    try {
      const findIdPost = await Posts.findByPk(postId)

      // console.log('findIdPost', findIdPost)

      if (!findIdPost) {
        return res.status(401).json({ msg: 'Erro' })
      }

      const findUserId = await Like.findAll({ where: { userId, postId, commentId: null } })

      console.log('FINDUSERRRID', findUserId)

      if (findUserId.length === 0) {
        const response = await Like.create({
          postId,
          userId
        })

        console.log(response)
        return res.status(200).json({ msg: 'like', response })
      } else {
        const response = await Like.destroy({ where: { userId, postId, commentId: null } })
        return res.status(200).json({ msg: 'deslike', response })
      }
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }

  public async insertComments (req: Request, res: Response): Promise<Response> {
    const { userId } = req.body
    const { postId, commentId } = req.params

    try {
      const findIdPost = await Posts.findByPk(postId)

      // console.log('findIdPost', findIdPost)

      if (!findIdPost) {
        return res.status(401).json({ msg: 'Erro' })
      }

      const findUserId = await Like.findAll({ where: { userId, postId, commentId } })

      console.log('FINDUSERRRID', findUserId)

      if (findUserId.length === 0) {
        const response = await Like.create({
          postId,
          userId,
          commentId
        })

        console.log(response)
        return res.status(200).json({ msg: 'like', response })
      } else {
        const response = await Like.destroy({ where: { userId, postId, commentId } })
        return res.status(200).json({ msg: 'deslike', response })
      }
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
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

  public async delete (req: Request, res: Response): Promise<Response> {
    const { userId } = req.params

    try {
      const response = await Like.findByPk(userId)
      await Like.destroy({ where: { userId } })

      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }
}

export default new LikeController()
