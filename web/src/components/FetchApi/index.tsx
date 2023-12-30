import React, { SetStateAction } from "react"
import axiosClient from "../../api/api"

interface likesProps {
    postId: string,
    userId: string,
    commentId: string
}

interface commentProps {
    postId: string
    userId: string
    commentId: string
    comment: string
    name: string
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

interface postProps {
    name: string,
    postId: string,
    userId: string,
    content: string
}

interface QuantProps {
    [key: string]: number
}

// HOME


export async function handleLike(postId: string, userId: string | null, setQuantLikes: React.Dispatch<React.SetStateAction<QuantProps>>, setLikesData?: React.Dispatch<React.SetStateAction<postProps[]>> | undefined) {

    try {

        const MethodPost = await axiosClient.post(`likes/${postId}`, {
            userId,
        })

        const response = await axiosClient.get(`likes/postId/${postId}`)
        const responseData = response.data.response.filter((like: likesProps) => like.commentId === null)

        const responseListPosts = (await axiosClient.get(`posts/${postId}`)).data.response

        const updatedLikesCount = responseData.length


        setQuantLikes((accumulator) => ({
            ...accumulator,
            [postId]: updatedLikesCount,
        }))

        console.log('RESPONSE LIST POSTS', responseListPosts)

        if (!setLikesData) return

        if (MethodPost.data.response.length === 0) {
            setLikesData((accumulator) => accumulator.filter((data) => data.postId !== postId))
            return
        } else {
            setLikesData((accumulator) => [
                ...accumulator, responseListPosts
            ])
            return
        }


    } catch (error) {
        console.error(error)
    }
}

export const handlePost = async (e: React.MouseEvent, userId: string | null, name: string | null , content: string, setPostsData: React.Dispatch<SetStateAction<postProps[]>>, setPopup: React.Dispatch<SetStateAction<boolean>>, setContent: React.Dispatch<SetStateAction<string>>) => {
    e.preventDefault()

    try {

        console.log(userId, name, content)

        const response = await axiosClient.post('post', {
            userId,
            name,
            content,
        })

        console.log(response.data)

        setPostsData((accumulator) => [
            ...accumulator, 
            response.data.response
        ])

        setPopup(false)
        setContent('')

    } catch (error) {
        console.error(error)
    }
}

export const handleEdit = async (postId: string, contentUpdate: string) => {
    try {
        const response = await axiosClient.put(`post/${postId}`, {
            content: contentUpdate
        })

        console.log(response)

    } catch (error) {
        console.error(error)
    }
}

export const handleDelete = async (postId: string, setPostsData?: React.Dispatch<SetStateAction<postProps[]>> | undefined) => {
    try {
        const response = await axiosClient.delete(`post/${postId}`)

        console.log(response)

        if(!setPostsData) return

        setPostsData((accumulator) => accumulator.filter((data) => data.postId !== postId))

    } catch (error) {
        console.error(error)
    }
}


// Comments

export const handleComment = async (postId: string, e: React.MouseEvent, name: string | null , commentContent: string, userId: string | null, setQuantComments: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>, setCommentsData: React.Dispatch<React.SetStateAction<commentProps[]>>, setCommentContent: React.Dispatch<React.SetStateAction<string>>) => {
    e.preventDefault()

    console.log(commentContent)
    console.log(name)

    try {


        const response = await axiosClient.post(`comments/${postId}`, {
            userId,
            name,
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

export const handleViewComments = async (postId: string, setCommentsData: React.Dispatch<React.SetStateAction<commentProps[]>>, setQuantCommentsComments: React.Dispatch<React.SetStateAction<QuantProps>>) => {
    try {

        const response = await axiosClient.get(`comments/${postId}`)

        console.log(response.data.response)
        
        setCommentsData(response.data.response)

        const LikesCommentData = await Promise.all(
            response.data.response.map(async (data: commentProps) => {
                const response = await axiosClient.get(`likes/comments/${data.commentId}`)
                console.log('RESPONSE LIKESCOMMENT', response.data.response)
                return { commentId: data.commentId, count: response.data.response.length }
            })
        )

        const LikesCommentDataMap = LikesCommentData.reduce((accumulator, current) => {
            return { ...accumulator, [current.commentId]: current.count }
        }, {})

        console.log('likesDATAMAP', LikesCommentDataMap)

        setQuantCommentsComments(LikesCommentDataMap)

    } catch (error) {
        console.error(error)
    }   
}
export const handleLikeComment = async (postId: string, commentId: string, userId: string | null, setQuantCommentsComments: React.Dispatch<React.SetStateAction<QuantProps>>) => {
    try {

        console.log('POSTID', postId)

        const response = await axiosClient.post(`likes/${postId}/${commentId}`, {
            userId
        })

        const responseData = await axiosClient.get(`likes/comments/${commentId}`)

        const updatedLikesCount = responseData.data.response.length
        console.log('responseLikesComment', response.data.response)

        setQuantCommentsComments((accumulator) => ({
            ...accumulator,
            [commentId]: updatedLikesCount
        }))

    } catch (error) {
        console.error(error)
    }
}

export const handleEditComment = async (commentId: string) => {
    try {
        console.log(commentId)
        // const response = await axiosClient.

    } catch (error) {
        console.error(error)
    }
}

export const handleDeleteComment = async (postId: string, commentId: string, setCommentsData: React.Dispatch<React.SetStateAction<commentProps[]>>, setQuantComments: React.Dispatch<React.SetStateAction<QuantProps>>) => {
    try {

        await axiosClient.delete(`comments/${postId}/${commentId}`)

        // console.log(response.data.response)
        const response = await axiosClient.get(`comments/${postId}`)

        const updatedCommentsCount = response.data.response.length
        setCommentsData(response.data.response)

        setQuantComments((accumulator) => ({
            ...accumulator,
            [postId]: updatedCommentsCount
        }))


    } catch (error) {
        console.error(error)
    }
}

// PROFILE

export const handleLikesUserId = async(userId: string | null) => {
    try {
        
        const response = await axiosClient.get(`posts/userId/likes/${userId}`)

        console.log('handleLikesuserId', response.data.response)
        return response.data.response
    } catch (error) {
        console.error(error)
    }
}

export const handlePostsUserId = async (userId: string | null) => {
    try {

        const response = await axiosClient.get(`posts/userId/${userId}`)

        console.log(response.data.response)
        return response.data.response
    } catch (error) {
        console.error(error)
    }
}