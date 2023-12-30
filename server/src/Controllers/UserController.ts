import { type Request, type Response } from 'express'
import User from '../Schema/User'
import { Op } from 'sequelize'

import UserService from '../Services/UserService'
import Posts from '../Schema/Post'
import Comment from '../Schema/Comment'

// interface userProps {
//   userId: string
//   name: string
//   email: string
//   password: string
//   img: string
// }

const userService = new UserService()

class UserController {
  public async listUsers (req: Request, res: Response): Promise<Response> {
    const response = await User.findAll()

    console.log(response)

    return res.status(200).json({ msg: 'sucesso', response })
  }

  // public async listImage (req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { userId } = req.body

  //     const user = await User.findByPk(userId)

  //     if (user == null) {
  //       return res.status(404).json({ message: 'Usuário não encontrado' })
  //     }

  //     return res.status(200).json({ msg: 'Sucessfully', response: userImage })
  //   } catch (error) {
  //     console.error(error)
  //     return res.status(500).json({ msg: 'Error', error })
  //   }
  // }

  public async create (req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    try {
      console.log('AQUI ESTA O FIND: ')

      const find = await User.findOne({
        where: { [Op.or]: [{ name }, { email }] }
      })

      console.log('AQUI ESTA O FIND: ', find)

      if (find === null) {
        const response = await User.create({
          name,
          email,
          password
        })

        return res.status(200).json({ msg: 'sucessfully', response })
      } else {
        return res.status(401).json({ msg: 'error' })
      }
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }

  public async uploadImg (req: Request, res: Response): Promise<Response> {
    const file = req.file

    console.log('FILEEE', file)

    if (file == null) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado' })
    }

    try {
      const { userId } = req.params

      console.log(userId)

      const user = await User.findByPk(userId)
      const postsImage = await Posts.findAll({ where: { userId } })
      const commentsImage = await Comment.findAll({ where: { userId } })

      if (user == null) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      const PostsSaved = postsImage.map(async (post) => {
        post.img = file
        await post.save()
      })

      const CommentsSaved = commentsImage.map(async (comment) => {
        comment.img = file
        await comment.save()
      })

      await Promise.all([...PostsSaved, ...CommentsSaved])

      user.img = file

      // for (const post of postsImage) {
      //   post.img = file
      //   await post.save()
      // }

      // for (const comment of commentsImage) {
      //   comment.img = file
      //   await comment.save()
      // }

      await user.save()

      console.log(user)

      return res.status(200).json({ msg: 'Imagem atualizada com sucesso', filename: file.filename })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Erro ao fazer upload da imagem' })
    }
  }

  public async login (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    try {
      const response = await userService.login(email, password)

      if (response === null) {
        return res.status(401).json({ msg: 'error' })
      }

      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }
}

export default new UserController()
