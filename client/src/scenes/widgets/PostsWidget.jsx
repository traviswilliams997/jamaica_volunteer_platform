import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializePosts,
  initializeVolunteerPost,
} from '../../reducers/postReducer'
import PostWidget from './PostWidget'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

// eslint-disable-next-line react/prop-types
const PostsWidget = ({ volunteerId, isProfile = false }) => {
  const dispatch = useDispatch()
  const posts = useSelector((state) => state.posts.allPosts)

  const axiosPrivate = useAxiosPrivate()

  const getPosts = async () => {
    const response = await axiosPrivate.post(`/api/post/`)
    const data = await response.json()
    dispatch(initializePosts({ posts: data }))
  }

  const getVolunteersPosts = async () => {
    const response = await axiosPrivate.post(`/api/post/${volunteerId}/posts`)
    const data = await response.json()

    dispatch(initializeVolunteerPost({ posts: data }))
  }

  useEffect(() => {
    if (isProfile) {
      getVolunteersPosts()
    } else {
      getPosts()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  if (!posts) {
    return <div></div>
  }

  return (
    <>
      {posts.map(
        ({
          id,
          volunteerId,
          posterFirstName,
          posterLastName,
          content,
          type,
          picturePath,
          posterPicturePath,
          reactions,
          comments,
        }) => (
          <PostWidget
            key={id}
            postId={id}
            postUserId={volunteerId}
            name={`${posterFirstName} ${posterLastName}`}
            content={content}
            type={type}
            location={location}
            picturePath={picturePath}
            posterPicturePath={posterPicturePath}
            likes={reactions}
            comments={comments}
          />
        )
      )}
    </>
  )
}

export default PostsWidget
