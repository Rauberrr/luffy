import { FormEvent, useState } from 'react'
import { DivLogin } from './style'
import { Button } from '../Home/style'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../api/api'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
        try {

          const response = await axiosClient.post('/login-user', {
            email: username,
            password,
          })
          
          console.log(response.data)
          
          localStorage.setItem('userId', response.data.response.userId)

          console.log(response.data.response.userId)
          navigate('/')
        } catch (error) {
          console.error(error)
        }
    }

  return (
    <DivLogin>
    <div>
      <h1> Login </h1>
        <div className='bottom'></div>
      <form onSubmit={handleSubmit}>
        <p> Email </p>
          <input type="email" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder='write here' required />
        <p> Password </p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*******' required />
        <div className='bottom'></div>
        <div>
          <Button type='button' color='white' onClick={() => navigate('/signIn')} > SignIn </Button>
          <Button type='submit' color='white' background='#129FCC'> Login </Button>
        </div>
      </form>
    </div>
    </DivLogin>
  )
}

export default Login
