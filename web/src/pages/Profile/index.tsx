import { DivProfile, ImgProfile, H1Profile, PProfile, DivLikeLuffy } from './style' 
import luffy from '../../assets/img/leaf.svg'
import like from '../../assets/img/like.png'
import axiosClient from '../../api/api'

const Profile = () => {

  const handleLikes = async() => {
    try {
      const response = await axiosClient.get('list-posts')

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLuffies = async () => {
    try {
      const response = await axiosClient.post('list-posts', {
        
      })

      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
    <DivProfile>
      <div className='img'>
        <ImgProfile src='https://www.hubspot.com/hs-fs/hubfs/media/fotodeperfil.jpeg?width=610&height=406&name=fotodeperfil.jpeg' />
        <p> Edit Profile </p>
      </div>
      <div className='texts'>
        <H1Profile> James </H1Profile>
        <PProfile> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, odio quis explicabo fuga debitis mollitia totam beatae tempore dolores officia ducimus, aliquid natus, vel alias? Totam eos quis vero quo! </PProfile>
      </div>
    </DivProfile>

    <DivLikeLuffy>
      <div onClick={() => handleLikes()}>

        <img src={like} alt="" />
        Likes
      </div>
        <div onClick={() => handleLuffies()}>
        <img src={luffy} alt="" />
        Luffies
      </div>
    </DivLikeLuffy>
    </>
  )
}

export default Profile
