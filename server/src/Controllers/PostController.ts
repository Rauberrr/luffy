import { type Request, type Response } from 'express'
import Posts from '../Schema/Post'
// import Comments from '../Schema/Comments'

interface PostProps {
  id: string
  name: string
  content: string

}

class PostController {
  public async list (req: Request, res: Response): Promise<Response> {
    try {
      const Post = await Posts.findAll()

      console.log(Post)
      return res.status(200).json({ msg: 'Sucessfully', Post })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    const { name, content } = req.body
    // const { user, comment } = req.body.comments

    try {
      const Post = await Posts.create({
        name,
        content
      })

      console.log(JSON.stringify(Post.toJSON(), null, 2))
      return res.status(200).json({ msg: 'Sucessfully', Post })
    } catch (error) {
      console.log(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    const { name, content } = req.body
    const { id } = req.params

    try {
      const Post = await Posts.update({
        name,
        content
      }, { where: { id } })

      console.log(Post)
      return res.status(200).json({ msg: 'Sucessfully', Post })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const Post = await Posts.destroy({ where: { id } })
      return res.status(200).json({ msg: 'Sucessfully', Post })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ msg: 'Error' })
    }
  }
}

export default new PostController()
