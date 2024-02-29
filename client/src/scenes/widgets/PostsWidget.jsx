import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializePosts,
  initializeVolunteerPost,
} from '../../reducers/postReducer'
import PostWidget from './PostWidget'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

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
          agencyId,
          firstName,
          lastName,
          content,
          type,
          picturePath,
          posterPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={id}
            postId={id}
            postUserId={volunteerId}
            name={`${firstName} ${lastName}`}
            content={content}
            type={type}
            location={location}
            picturePath={picturePath}
            posterPicturePath={posterPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  )
}

export default PostsWidget
