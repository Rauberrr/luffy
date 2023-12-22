import { DivProfile, ImgProfile, H1Profile, PProfile, DivLikeLuffy } from './style' 
import { Img } from '../../components/Header/style'
import luffy from '../../assets/img/leaf.svg'
import like from '../../assets/img/like.png'
import comments from '../../assets/img/comments.png'
import dots from '../../assets/img/dots.png'
import share from '../../assets/img/share.png'
import axiosClient from '../../api/api'
import { useCallback, useEffect, useState } from 'react'
import { handleComment, handleDelete, handleDeleteComment, handleEdit, handleEditComment, handleLike, handleLikeComment, handleLikesUserId, handlePostsUserId, handleViewComments } from '../../components/FetchApi'
import { Button, DivComment, DivIcons, DivImgTitle, DivPost, H2, ImgIcons, Input, P, Ul } from '../Home/style'

const Profile = () => {
  const [menu, setMenu] = useState<{ [keyId: string]: boolean }>({});
  const [comment, setComment] = useState<{ [postId: string]: boolean }>({})

  const [likesOrLuffies, setLikesOrLuffies] = useState(true)

  const [QuantLikes, setQuantLikes] = useState<QuantProps>({})
  const [QuantComments, setQuantComments] = useState<QuantProps>({})
  const [QuantCommentsComments, setQuantCommentsComments] = useState<QuantProps>({})

  const [postsData, setPostsData] = useState([])
  const [likesData, setLikesData] = useState<postProps[]>([])
  const [commentsData, setCommentsData] = useState<commentProps[]>([])

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

  const data = useCallback(async () => {
    try {

      const responsePosts = await handlePostsUserId(userId)
      const responseLikes = await handleLikesUserId(userId)

      console.log('response',responsePosts)
      
      setPostsData(responsePosts)
      setLikesData(responseLikes)

      const LikesCountData = await Promise.all(
        responsePosts.map(async (data: postProps) => {
          try {

            const response = await axiosClient.get(`likes/${data.postId}`)
            const responseData = response.data.response.filter((likes: likesProps) => likes.commentId === null)
            return { postId: data.postId, likesCount: responseData.length }
          } catch (error) {
            console.error(error)
            return { postId: data.postId, likesCount: 0 }
          }
        })
      )

      const LikesCountMapData = LikesCountData.reduce((accumulator, current) => {
        return { ...accumulator, [current.postId]: current.likesCount }
      }, {})

      const CommentsCOuntData = await Promise.all(
        responsePosts.map(async (data: postProps) => {
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
  }, [data])


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

  const Datas = ({ data } : { data: postProps[] }) => {
    return (
      <div>
      { data.map((post: postProps) => (
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
                    onClick={() => handleLike(post.postId, userId, setQuantLikes, setLikesData)}
                  />
                  <p> {QuantLikes[post.postId] || 0} </p>
                  <ImgIcons
                    src={comments}
                    alt="icon"
                    onClick={async () => {
                      await handleViewComments(post.postId, setCommentsData, setQuantCommentsComments),
                        // await handleCommentsCount(),
                        setComment((accumulator) => ({
                          [post.postId]: !accumulator[post.postId]
                        }))
                    }
                    }
                  />
                  <p> {QuantComments[post.postId] || 0} </p>
                </div>
                <div>

                  {menu[post.postId] && (
                    <div>
                      <Ul>
                        <li onClick={() => handleEdit(post.postId, contentUpdate)}>Edit</li>
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
                      <Img width={'2vw'} height={'2vw'} style={{ borderRadius: '1vw' }} src="https://upload.wikimedia.org/wikipedia/commons/4/43/Foto_Perfil.jpg" alt="Profile" />
                      <H2> User </H2>
                    </DivImgTitle>
                    <Input color="white" width="50vw" height="10vw" value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="Write you comment here." />
                    <div className="buttons-comment">
                      <Button color="white" background="#129FCC" onClick={(e) => handleComment(post.postId, e, commentContent, userId, setQuantComments, setCommentsData, setCommentContent)}> Comment </Button>
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
                            onClick={() => handleLikeComment(post.postId, comment.commentId, userId, setQuantCommentsComments)}
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
        ))
      }
      </div>

    )
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
      <div>
        <Img src={like} borderRadius='0' alt="" onClick={() => setLikesOrLuffies(true)} />
        Likes
      </div>
      <div>
        <Img src={luffy} borderRadius='0' alt="" onClick={() => setLikesOrLuffies(false)} />
        Luffies
      </div>
    </DivLikeLuffy>
      { likesOrLuffies ? (
        <Datas data={likesData} />
      )
      : (
        <Datas data={postsData} />
      )
      }

    
    
    </>
  )
}

export default Profile
