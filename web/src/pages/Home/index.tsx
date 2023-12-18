import { DivPost, DivImgTitle, DivIcons, H2, P, ImgIcons, DivLuffy, DivPopup, Input, Button, DivButtons, Ul } from "./style"
import { Img } from "../../components/Header/style"
import comments from '../../assets/img/comments.png'
import like from '../../assets/img/like.png'
import dots from '../../assets/img/dots.png'
import share from '../../assets/img/share.png'
import leaf2 from '../../assets/img/leaf-2.png'

import { useCallback, useEffect, useState } from "react"
import axiosClient from "../../api/api"

const Home = () => {
  const [popup, setPopup] = useState(false)
  const [menu, setMenu] = useState<{ [postId: string]: boolean }>({});
  const [postsData, setPostsData] = useState([])
  const [QuantLikes, setQuantLikes] = useState<QuantProps>({})
  const [QuantComments, setQuantComments] = useState<QuantProps>({})
  const [content, setContent] = useState('')

 
  interface QuantProps {
    [key: string]: number
  }

  const userId = localStorage.getItem('userId')

  const data = useCallback(async() => {
    try {
      const responsePosts = await axiosClient.get('posts')

        setPostsData(responsePosts.data.response)

      const LikesCountData = await Promise.all(
        responsePosts.data.response.map(async(data: postProps) => {
          try {

            const response = await axiosClient.get(`likes/${data.postId}`)
            return { postId: data.postId, likesCount: response.data.response.length }
          } catch(error) {
            console.error(error)
            return { postId: data.postId, likesCount: 0 }
          }
        })
      )

      const LikesCountMapData = LikesCountData.reduce((accumulator, current) => {
        return { ...accumulator, [current.postId]: current.likesCount } 
      },{})

      const CommentsCOuntData = await Promise.all(
        responsePosts.data.response.map(async(data: postProps) => {
          try {
            const response = await axiosClient.get(`comments/${data.postId}`)
            return { postId: data.postId, comments: response.data.response.length } 
          } catch (error) {
            console.error(error)
            return { postId: data.postId, comments: 0 }
          }
        })
      )

      const CommentsCountDataMap = CommentsCOuntData.reduce((accumulator, current) => {
        return { ...accumulator, [current.postId]: current.comments }
      }, {})

      
      setQuantLikes(LikesCountMapData)
      setQuantComments(CommentsCountDataMap)
      
      } catch (error) {
        console.error(error)
      }
    }, [])
      
    useEffect(() => {
      data()
    },[data])


  interface postProps {
    postId: string,
    userId: string,
    content: string
  }

  const handleLike = async(postId: string) => {

    try {
      
      await axiosClient.post(`likes/${postId}`, {
        userId,
      })

      const responseGet = await axiosClient.get(`likes/${postId}`)

      const updatedLikesCount = responseGet.data.response.length

      setQuantLikes((accumulator) => ({
        ...accumulator,
        [postId]: updatedLikesCount,
      }));


    } catch (error) {
      console.error(error);
    }
  }

  const handleComment = async(postId: string) => {

    try {


      const response = await axiosClient.post(`comments/${postId}`, {
        userId,
        comment: 'TESTE API'
      })

      const responseGet = await axiosClient.get(`comments/${postId}`)

      const updatedCommentsCount = responseGet.data.response.length


      setQuantComments((accumulator) => ({
        ...accumulator, 
        [postId]: updatedCommentsCount
      }))

      console.log(response.data.response)


    } catch (error) {
      console.error(error)
    }

  }

  const handlePost = async(e: React.MouseEvent) => {
    e.preventDefault()

    try {

      console.log(userId, content)

      const response = await axiosClient.post('post', {
        userId,
        content,
      })

      console.log(response.data)

      window.location.reload()

    } catch (error) {
      console.error(error)
    }
  }

  const handleEdit = async (postId: string) => {
    try {
      const response = await axiosClient.put(`post/${postId}`, {
        content: contentUpdate
      })

      console.log(response)

    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (postId: string) => {
    try {
      const response = await axiosClient.delete(`post/${postId}`)



      console.log(response)

      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <>
      {postsData.map((post: postProps) => (
      <DivPost key={post.postId}>
        <div>
          <DivImgTitle>
            <Img width={'30px'} height={'30px'} src="https://www.hubspot.com/hs-fs/hubfs/media/fotodeperfil.jpeg?width=610&height=406&name=fotodeperfil.jpeg" alt="Profile" />
            <H2> Opa </H2>
          </DivImgTitle>
            <P> {post.content} </P>
            <DivIcons>
                  <div>
                        <ImgIcons
                          src={like}
                          alt="icon"
                          onClick={() => handleLike(post.postId)}
                          />
                        <p> {QuantLikes[post.postId] || 0} </p>
                        <ImgIcons
                          src={comments}
                          alt="icon"
                          onClick={() => handleComment(post.postId)}
                          />
                       
                        <p> {QuantComments[post.postId] || 0} </p>
                    </div>
                  <div>
                
                  {menu[post.postId] && (
                    <div>
                      <Ul>
                        <li onClick={() => handleEdit(post.postId)}>Edit</li>
                        <li onClick={() => handleDelete(post.postId)}>Delete</li>
                      </Ul>
                    </div>
                  )}
                  <ImgIcons
                    src={dots}
                    alt="icon"
                    onClick={() => setMenu((accumulator) => ({
                      // ...accumulator,
                      [post.postId]: !accumulator[post.postId], 
                      }))
                    }
                  />
                  
                  <ImgIcons
                    src={share}
                    alt="icon"
                    />
                    </div>
            </DivIcons>
        </div>
    </DivPost>
      ))}
      <DivLuffy onClick={() => setPopup(!popup)}>
        <img src={leaf2} />
      </DivLuffy>

      { popup && <>
        <DivPopup>
          <div>
            <Img width={'30px'} height={'30px'} src="https://www.hubspot.com/hs-fs/hubfs/media/fotodeperfil.jpeg?width=610&height=406&name=fotodeperfil.jpeg" /> 
            <Input placeholder="Write whatever you want!" value={content} onChange={(e) => setContent(e.target.value)} />
          </div>

          <DivButtons>
            <Button > Save Draft </Button>
            <Button background="#129FCC" onClick={handlePost} > Post Now </Button>
          </DivButtons>
        </DivPopup>

      
      </> }

    </>
  )
}

export default Home
