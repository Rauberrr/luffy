import { DivPost, DivImgTitle, DivIcons, H2, P, ImgIcons, DivLuffy, DivPopup, Input, Button, DivButtons } from "./style"
import { Img } from "../../components/Header/style"
import comments from '../../assets/img/comments.png'
import like from '../../assets/img/like.png'
import dots from '../../assets/img/dots.png'
import share from '../../assets/img/share.png'
import leaf2 from '../../assets/img/leaf-2.png'

import { useEffect, useState } from "react"
import axiosClient from "../../api/api"

interface PostProps {
  id: number,
  name: string,
  content: string
}

const Home = () => {

  const [datalist, setdatalist] = useState([])
  const [popup, setPopup] = useState(false)

  useEffect(() => {
    (async() => {

      try {
        const response = await axiosClient.get('/list-posts')
        console.log(response.data.response)
        setdatalist(response.data.response)
      } catch (error) {
        console.error(error)
      }

    })()
  },[])

  

  return (
    <>
    {datalist.map((post: PostProps) => (
      <DivPost>
        <DivImgTitle>
          <Img width={'30px'} height={'30px'} src="https://www.hubspot.com/hs-fs/hubfs/media/fotodeperfil.jpeg?width=610&height=406&name=fotodeperfil.jpeg" alt="Profile" />
          <H2> {post.name} </H2>
        </DivImgTitle>
        <P> {post.content} </P>
        <DivIcons>
          <div>
            <ImgIcons src={like} alt="like" />
            <ImgIcons src={comments} alt="comments" />
            <ImgIcons src={dots} alt="dots" />
            <ImgIcons src={share} alt="share" />
          </div>
        </DivIcons>
    </DivPost>
    ))}
      <DivLuffy onClick={() => setPopup(!popup)}>
        <img src={leaf2} />
      </DivLuffy>

      { popup && <>
        <DivPopup>
          <div>
            <Img width={'30px'} height={'30px'} src="https://www.hubspot.com/hs-fs/hubfs/media/fotodeperfil.jpeg?width=610&height=406&name=fotodeperfil.jpeg" /> 
            <Input placeholder="Write whatever you want!" />
          </div>

          <DivButtons>
            <Button > Save Draft </Button>
            <Button background="#129FCC"> Post Now </Button>
          </DivButtons>
        </DivPopup>

      
      </> }

    </>
  )
}

export default Home
