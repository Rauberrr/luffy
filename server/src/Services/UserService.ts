import User from '../Schema/User'

interface UserProps {
  email: string
  password: string
}

class UserService {
  public async login (email: string, password: string): Promise<UserProps | null> {
    try {
      const responseUser = await User.findOne({ where: { email, password } })

      return responseUser
    } catch (error) {
      console.error(error)
      return null
    }
  }
}

export default UserService
