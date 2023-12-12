import { type Request, type Response } from 'express'
import User from '../Schema/User'
import { Op } from 'sequelize'
import UserService from '../Services/UserService'

const userService = new UserService()

class UserController {
  public async create (req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    try {
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
