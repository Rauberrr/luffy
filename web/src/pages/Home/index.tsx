import { DivPost, DivImgTitle, DivIcons, H2, P, ImgIcons, DivLuffy, DivPopup, Input, Button, DivButtons, Ul, DivComment } from "./style"
import { Img } from "../../components/Header/style"
import comments from '../../assets/img/comments.png'
import like from '../../assets/img/like.png'
import dots from '../../assets/img/dots.png'
import share from '../../assets/img/share.png'
import leaf2 from '../../assets/img/leaf-2.png'

import React, { useCallback, useEffect, useState } from "react"
import axiosClient from "../../api/api"

const Home = () => {
  const [popup, setPopup] = useState(false)

  const [menu, setMenu] = useState<{ [postId: string]: boolean }>({});
  const [comment, setComment] = useState< { [postId: string]: boolean } >({})

  const [QuantLikes, setQuantLikes] = useState<QuantProps>({})
  const [QuantComments, setQuantComments] = useState<QuantProps>({})
  const [QuantCommentsComments, setQuantCommentsComments] = useState<QuantProps>({})
  
  const [postsData, setPostsData] = useState([])
  const [commentsData, setCommentsData] = useState<commentProps[]>([])

  const [content, setContent] = useState('')
  const [commentContent, setCommentContent] = useState('')

 
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

  interface commentProps {
    postId: string
    userId: string
    commentId: string
    comment: string
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

  
  // Comments

  const handleComment = async (postId: string, e: React.MouseEvent) => {
    e.preventDefault()

    console.log(commentContent)

    try {


      const response = await axiosClient.post(`comments/${postId}`, {
        userId,
        comment: commentContent
      })

      const responseGet = await axiosClient.get(`comments/${postId}`)

      const responseData = responseGet.data.response
      const updatedCommentsCount = responseGet.data.response.length


      setQuantComments((accumulator) => ({
        ...accumulator,
        [postId]: updatedCommentsCount
      }))

      setCommentsData([
        ...responseData
      ])
      setCommentContent('')

      console.log(response.data.response)

    } catch (error) {
      console.error(error)
    }

  }
  
  const handleViewComments = async(postId: string) => {
    try {

      const response = await axiosClient.get(`comments/${postId}`)

      console.log(response.data.response)
      setCommentsData(response.data.response)
      
    } catch (error) {
      console.error(error)
    }
  }
  const handleLikeComment = async(postId: string, commentId: string) => {
    try {

      console.log('POSTID', postId)
      
      const response = await axiosClient.post(`likes/${postId}/${commentId}`, {
        userId
      })

      console.log('responseLikesComment', response.data.response)

    } catch (error) {
      console.error(error)
    }
  }

  const handleEditComment = async(commentId: string) => {
    try {
      
      // const response = await axiosClient.

    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteComment = async (postId: string, commentId: string) => {
    try {

      await axiosClient.delete(`comments/${postId}/${commentId}`)

      // console.log(response.data.response)
      const response = await axiosClient.get(`comments/${postId}`)

      setCommentsData(response.data.response)

    } catch (error) {
      console.error(error)
    }
  }

  const handleCommentsCount = async() => {

    const LikesCommentData = await Promise.all(
      commentsData.map(async(data: commentProps) => {
        const response = await axiosClient.get(`likes/${data.commentId}`)
        return { postId: data.postId, commentId: data.commentId, count: response.data.length }
      })
    )

    const LikesCommentDataMap = LikesCommentData.reduce((accumulator, current) => {
      return { ...accumulator, [current.commentId]: current.count }
    }, {})

    setQuantCommentsComments(LikesCommentDataMap)

  }
  
  return (
    <>
      {postsData.map((post: postProps) => (
      <DivPost key={post.postId}>
        <div>
          <DivImgTitle>
            <Img src="https://www.hubspot.com/hs-fs/hubfs/media/fotodeperfil.jpeg?width=610&height=406&name=fotodeperfil.jpeg" alt="Profile" />
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
                          onClick={async() => {
                            await handleViewComments(post.postId)
                            await handleCommentsCount()
                            setComment((accumulator) => ({
                              [post.postId]: !accumulator[post.postId]
                            }))}
                          }
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
                    onClick={() => 
                      setMenu((accumulator) => ({
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
            {comment[post.postId] && (
              <div>
                <div className="comments">

                <DivImgTitle>
                    <Img width={'2vw'} height={'2vw'} borderRadius="1vw" src="https://upload.wikimedia.org/wikipedia/commons/4/43/Foto_Perfil.jpg" alt="Profile" />
                  <H2> User </H2>
                </DivImgTitle>
                <Input color="white" width="50vw" height="10vw" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="Write you comment here." /> 
                <div className="buttons-comment">
                  <Button color="white" background="#129FCC" onClick={(e) => handleComment(post.postId, e)}> Comment </Button>
                </div>
                </div>
                {commentsData.map((comment: commentProps) => (
                  <DivComment key={comment.postId}>
                    <DivImgTitle>
                      <Img width={'30px'} height={'30px'} src="https://www.hubspot.com/hs-fs/hubfs/media/fotodeperfil.jpeg?width=610&height=406&name=fotodeperfil.jpeg" alt="Profile" />
                      <H2> Opa </H2>
                    </DivImgTitle>
                    <P> {comment.comment} </P>
                    <DivIcons>
                      <div>
                        <ImgIcons
                          src={like}
                          alt="icon"
                          onClick={() => handleLikeComment(post.postId, comment.commentId)}
                        />
                        <P> {QuantCommentsComments[comment.commentId] || 0} </P>
                        <ImgIcons
                          src={comments}
                          alt="icon"
                          onClick={async () => {
                            await handleViewComments(post.postId)
                            setComment((accumulator) => ({
                              [post.postId]: !accumulator[post.postId]
                            }))
                          }
                          }
                        />
                        <P> {QuantCommentsComments[comment.commentId] || 0} </P>
                      </div>
                      <div>

                        {menu[post.postId] && (
                          <div>
                            <Ul>
                              <li onClick={() => handleEditComment(comment.commentId)}>Edit</li>
                              <li onClick={() => handleDeleteComment(post.postId, comment.commentId)}>Delete</li>
                            </Ul>
                          </div>
                        )}
                        <ImgIcons
                          src={dots}
                          alt="icon"
                          onClick={() =>
                            setMenu((accumulator) => ({
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
                  </DivComment>
                ))}
              </div>
            )}
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
