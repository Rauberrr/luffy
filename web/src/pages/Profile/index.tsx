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
import { handleUrl } from '../../components/urlImages'

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

  const [contentUpdate] = useState('')


  interface QuantProps {
    [key: string]: number
  }

  interface likesProps {
    postId: string,
    userId: string,
    commentId: string
  }

  const userId: string | null = localStorage.getItem('userId') as string
  const userImage: string | null = localStorage.getItem('userImage') as string
  const userName = localStorage.getItem('userName')


  const data = useCallback(async () => {
    try {

      const responsePosts = await handlePostsUserId(userId)
      const responseLikes = await handleLikesUserId(userId)

      console.log('response',responsePosts)
      
      setPostsData(responsePosts)
      setLikesData(responseLikes)

      

    } catch (error) {
      console.error(error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    data()
  }, [data])


  interface postProps {
    name: string,
    postId: string,
    userId: string,
    content: string,
    img?: {
      fieldname: string
      originalname: string
      encoding: string
      mimetype: string
      destination: string
      filename: string
      path: string
      size: number
    }
  }

  interface commentProps {
    name: string
    postId: string
    userId: string
    commentId: string
    comment: string
    img?: {
      fieldname: string
      originalname: string
      encoding: string
      mimetype: string
      destination: string
      filename: string
      path: string
      size: number
    }
  }

  
  //   const [image, setImage] = useState(null);

  // const handleImageUpload = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();

  //   console.log('FILE', file)
  //   console.log('READER', reader)


  //   reader.onloadend = async() => {
  //     // Armazenar temporariamente a imagem no estado
  //     setImage(reader.result);
      
  //     const response = await axiosClient.put(`userId/img`, {
  //       img: reader.result,
  //       userId
  //     })

  //     console.log('RESPONSE IMG', response)
  //     console.log('READER RESULT', reader.result)

  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);

  //   }
  // };



  interface ImageUploadProps {
    userId: string
  }

  const ImageUpload: React.FC<ImageUploadProps>  = ({ userId }) => {
    const [image, setImage] = useState<File | null>(null)

    const handleImage = async(e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('file', image)

      const headers = {
        'headers': {
          'Content-Type': 'multipart/form-data'
        }
      }

      await axiosClient.post(`img/${userId}`, formData, headers)
      .then((response) => {
        console.log(response.data.filename)

        const url = `http://localhost:3000/images/${response.data.filename}`

        localStorage.setItem('userImage', url)
        window.location.reload()
      })
      .catch((err) => {
        console.error(err)
      })

    }
    

    return (
      <div>
        <input type="file" name='file' onChange={(e) => setImage(e.target.files[0])} />
        <button onClick={handleImage}>Enviar Imagem</button>
      </div>
    )
  }



  const Datas = ({ data, likesOrLuffies }: { data: postProps[], likesOrLuffies: boolean}) => {

    const [commentContent, setCommentContent] = useState('')

    return (
      <div>
      { data.map((post: postProps) => (
          <DivPost key={post.postId}>
            <div>
              <DivImgTitle>
                <Img src={handleUrl(post.img?.filename)} alt="Profile" />
                <H2> {post.name} </H2>
              </DivImgTitle>
              <P> {post.content} </P>
              <DivIcons>
                <div>
                  <ImgIcons
                    src={like}
                    alt="icon"
                    onClick={() => handleLike(post.postId, userId, setQuantLikes, setLikesData)}
                  />
                  {likesOrLuffies === false && (
                    <p> {QuantLikes[post.postId] || 0} </p>
                  )}
                  <ImgIcons
                    src={comments}
                    alt="icon"
                    onClick={async () => {
                      await handleViewComments(post.postId, setCommentsData, setQuantCommentsComments),
                        setComment((accumulator) => ({
                          [post.postId]: !accumulator[post.postId]
                        }))
                    }
                    }
                  />
                {likesOrLuffies === false && (
                  <p> {QuantComments[post.postId] || 0} </p>
                )}
                </div>
                <div>

                  {menu[post.postId] && (
                    <div>
                    {post.userId === userId && (
                      <Ul>
                        <li onClick={() => handleEdit(post.postId, contentUpdate)}>Edit</li>
                        <li onClick={() => handleDelete(post.postId)}>Delete</li>
                      </Ul>
                    )}
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
                      <Img width={'2vw'} height={'2vw'} style={{ borderRadius: '1vw' }} src={userImage} alt="Profile" />
                      <H2> {userName} </H2>
                    </DivImgTitle>
                  <Input color="white" width="50vw" height="10vw" onChange={(e) => setCommentContent(e.target.value)} placeholder="Write you comment here." />
                    <div className="buttons-comment">
                      <Button color="white" background="#129FCC" onClick={(e) => handleComment(post.postId, e, userName ,commentContent, userId, setQuantComments, setCommentsData, setCommentContent)}> Comment </Button>
                    </div>
                  </div>
                  {commentsData.map((comment: commentProps) => (
                    <DivComment key={comment.commentId}>
                      <DivImgTitle>
                        <Img width={'30px'} height={'30px'} src={userImage} alt="Profile" />
                        <H2> {comment.name} </H2>
                      </DivImgTitle>
                      <P> {comment.comment} </P>
                      <DivIcons>
                        <div>
                          <ImgIcons
                            src={like}
                            alt="icon"
                            onClick={() => {
                              handleLikeComment(post.postId, comment.commentId, userId, setQuantCommentsComments),
                              setCommentContent('')
                            }
                            }
                          />
                          <P> {QuantCommentsComments[comment.commentId] || 0} </P>
                        </div>
                        <div>

                          {menu[comment.commentId] && (
                            <div>

                              {comment.userId === userId && (
                                <Ul>
                                <li onClick={() => handleEditComment(comment.commentId)}>Edit</li>
                                <li onClick={() => handleDeleteComment(post.postId, comment.commentId, setCommentsData, setQuantComments)}>Delete</li>
                              </Ul>
                              )}
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

  const handlePullLuffies = async() => {
    const LikesCountData = await Promise.all(
      postsData.map(async (data: postProps) => {
        try {
          const response = await axiosClient.get(`likes/postId/${data.postId}`)
          const responseData = response.data.response.filter((likes: likesProps) => likes.commentId === null && likes.userId === data.userId)
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
      postsData.map(async (data: postProps) => {
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
  }

  
  return (
    <>
    <DivProfile>
      <div className='img'>
        <ImageUpload userId={userId} />
        <ImgProfile src={userImage} />
        <p> Edit Profile </p>
      </div>
      <div className='texts'>
        <H1Profile> {userName} </H1Profile>
        <PProfile> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, odio quis explicabo fuga debitis mollitia totam beatae tempore dolores officia ducimus, aliquid natus, vel alias? Totam eos quis vero quo! </PProfile>
      </div>
    </DivProfile>

    <DivLikeLuffy>
      <div>
        <Img src={like} borderRadius='0' alt="" onClick={() => setLikesOrLuffies(true)} />
        Likes
      </div>
      <div>
        <Img src={luffy} borderRadius='0' alt="" onClick={() => {
          handlePullLuffies(),
          setLikesOrLuffies(false)
        }
          } />
        Luffies
      </div>
    </DivLikeLuffy>
      { likesOrLuffies ? (
        <Datas data={likesData} likesOrLuffies={likesOrLuffies} />
      )
      : (
        <Datas data={postsData} likesOrLuffies={likesOrLuffies} />
      )
      }

    
    
    </>
  )
}

export default Profile
