import User from '../Schema/User'

interface UserProps {
  name: string | undefined
  userId: string | undefined
  img: string | undefined
  email: string
  password: string
}

class UserService {
  public async login (email: string, password: string): Promise<UserProps | null> {
    try {
      const response = await User.findOne({ where: { email, password } })

      return { userId: response?.userId, name: response?.name, img: response?.img?.filename, email, password }
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

export default UserService
