import { useState } from 'react'
import { DivLogin } from './style'
import { Button } from '../Home/style'

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async() => {
        window.alert('submit')
    }

  return (
    <DivLogin>
    <div>
      <h1> Login </h1>
      <form onSubmit={handleSubmit}>
        <p> Email </p>
        <input type="email" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder='write here' />
        <p> Password </p>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder='*******' />
        <div>

          <Button type='button' color='white'> SignIn </Button>
            <Button type='submit' color='white' background='#129FCC'> Login </Button>
        </div>
      </form>
    </div>
    </DivLogin>
  )
}

export default Login
