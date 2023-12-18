import { FormEvent, useState } from 'react'
import { DivLogin } from '../Login/style'
import { Button } from '../Home/style'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../api/api'

const SignIn = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [local, setLocal] = useState('')

    const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()  
    
    try {
        
        if(password !== confirmPass) return
        
        const response = await axiosClient.post('/create-user', {
          name,
          email,
          password
        })

        console.log(response.data)

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
        <p> Name </p>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='write here' required />
        <p> Email </p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='john@example.com.br' required />
        <p> Location </p>
          <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} placeholder='local' />
        <p> Password </p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*******' required />
        <p> Confirm Password </p>
          <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder='*******' required />
        <div className='bottom'></div>
        <div>
          <Button type='button' color='white' onClick={() => navigate('/login')} > Login </Button>
          <Button type='submit' color='white' background='#129FCC'> SignIn </Button>
        </div>
      </form>
    </div>
    </DivLogin>
  )
}

export default SignIn
