import { DivPost, DivImgTitle, DivIcons, H2, P, ImgIcons, DivLuffy, DivPopup, Input, Button, DivButtons, Ul, DivComment } from "./style"
import { Img } from "../../components/Header/style"
import comments from '../../assets/img/comments.png'
import like from '../../assets/img/like.png'
import dots from '../../assets/img/dots.png'
import share from '../../assets/img/share.png'
import leaf2 from '../../assets/img/leaf-2.png'

import { useCallback, useEffect, useState } from "react"
import axiosClient from "../../api/api"
import { handleComment, handleDelete, handleDeleteComment, handleEdit, handleEditComment, handleLike, handleLikeComment, handlePost, handleViewComments } from "../../components/FetchApi"


const Home = () => {
  const [popup, setPopup] = useState(false)

  const [menu, setMenu] = useState<{ [keyId: string]: boolean }>({});
  const [comment, setComment] = useState< { [postId: string]: boolean } >({})

  const [QuantLikes, setQuantLikes] = useState<QuantProps>({})
  const [QuantComments, setQuantComments] = useState<QuantProps>({})
  const [QuantCommentsComments, setQuantCommentsComments] = useState<QuantProps>({})
  
  const [postsData, setPostsData] = useState<postProps[]>([])
  const [commentsData, setCommentsData] = useState<commentProps[]>([])

  const [content, setContent] = useState('')
  const [contentUpdate, setContentUpdate] = useState('')
  const [commentContent, setCommentContent] = useState('')

  
  interface QuantProps {
    [key: string]: number
  }

  interface likesProps {
    postId: string,
    userId: string,
    commentId: string
  }

  const userId = localStorage.getItem('userId')

  const data = useCallback(async() => {
    try {
      const responsePosts = await axiosClient.get('posts')

      setPostsData(responsePosts.data.response)

      const LikesCountData = await Promise.all(
        responsePosts.data.response.map(async(data: postProps) => {
          try {

            const response = await axiosClient.get(`likes/postId/${data.postId}`)
            const responseData = response.data.response.filter((likes: likesProps) => likes.commentId === null)
            return { postId: data.postId, likesCount: responseData.length }
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
                          onClick={() => handleLike(post.postId, userId, setQuantLikes)}
                          />
                        <p> {QuantLikes[post.postId] || 0} </p>
                        <ImgIcons
                          src={comments}
                          alt="icon"
                          onClick={async() => {
                            await handleViewComments(post.postId, setCommentsData, setQuantCommentsComments),
                            // await handleCommentsCount(),
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
                        <li onClick={() => handleEdit(post.postId, contentUpdate)}>Edit</li>
                        <li onClick={() => handleDelete(post.postId, setPostsData)}>Delete</li>
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
                    <Img width={'2vw'} height={'2vw'} style={{ borderRadius: '1vw' }} src="https://upload.wikimedia.org/wikipedia/commons/4/43/Foto_Perfil.jpg" alt="Profile" />
                  <H2> User </H2>
                </DivImgTitle>
                <Input color="white" width="50vw" height="10vw" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="Write you comment here." /> 
                <div className="buttons-comment">
                  <Button color="white" background="#129FCC" onClick={(e) =>  {
                    handleComment(post.postId, e, commentContent, userId, setQuantComments, setCommentsData, setCommentContent)
                    setCommentContent('')
                  }
                  }
                  > Comment </Button>
                </div>
                </div>
                {commentsData.map((comment: commentProps) => (
                  <DivComment key={comment.commentId}>
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
                          onClick={() => 
                            handleLikeComment(post.postId, comment.commentId, userId, setQuantCommentsComments)
                          }
                        />
                        <P> {QuantCommentsComments[comment.commentId] || 0} </P>
                      </div>
                      <div>

                        {menu[comment.commentId] && (
                          <div>
                            <Ul>
                              <li onClick={() => handleEditComment(comment.commentId)}>Edit</li>
                              <li onClick={() => handleDeleteComment(post.postId, comment.commentId, setCommentsData, setQuantComments)}>Delete</li>
                            </Ul>
                          </div>
                        )}
                        <ImgIcons
                          src={dots}
                          alt="icon"
                          onClick={() =>
                            setMenu((accumulator) => ({
                              // ...accumulator,
                              [comment.commentId]: !accumulator[comment.commentId],
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
            <Button background="#129FCC" onClick={(e) => handlePost(e, userId, content, setPostsData, setPopup, setContent)} > Post Now </Button>
          </DivButtons>
        </DivPopup>

      
      </> }

    </>
  )
}

export default Home
