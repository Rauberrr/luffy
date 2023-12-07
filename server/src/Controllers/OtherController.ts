import { type Request, type Response } from 'express'
import OtherUser from '../Schema/OtherUser'

class OtherUserController {
  public async list (req: Request, res: Response): Promise<Response> {
    try {
      const response = await OtherUser.findAll()

      console.log(response)
      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ erro: 'Error', error })
    }
  }

  public async insert (req: Request, res: Response): Promise<Response> {
    const { user, likes, comment } = req.body
    const { postId } = req.params

    try {
      const response = await OtherUser.create({
        postId,
        user,
        likes,
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
    const { user, likes, comment } = req.body
    const { postId, id } = req.params
    try {
      await OtherUser.update({
        postId,
        user,
        likes,
        comment
      }, { where: { id } })

      const response = await OtherUser.findByPk(id)

      console.log(response)
      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const response = await OtherUser.findByPk(id)
      await OtherUser.destroy({ where: { id } })

      return res.status(200).json({ msg: 'sucessfully', response })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error })
    }
  }
}

export default new OtherUserController()
