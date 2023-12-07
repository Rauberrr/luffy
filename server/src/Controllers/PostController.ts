import { type Request, type Response } from 'express'
import Posts from '../Schema/Post'
import OtherUser from '../Schema/OtherUser'

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

  public async create (req: Request, res: Response): Promise<Response> {
    const { name, content } = req.body
    // const { user, comment } = req.body.comments

    try {
      const response = await Posts.create({
        name,
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
    const { name, content } = req.body
    const { id } = req.params

    try {
      await Posts.update({
        name,
        content
      }, { where: { id } })

      const response = await Posts.findByPk(id)

      console.log(response)
      return res.status(200).json({ msg: 'Sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const responsePost = await Posts.findByPk(id)
      const responseOther = await OtherUser.findAll({ where: { postId: id } })
      await Posts.destroy({ where: { id } })
      await OtherUser.destroy({ where: { postId: id } })
      return res.status(200).json({ msg: 'Sucessfully', responsePost, responseOther })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }
}

export default new PostController()
