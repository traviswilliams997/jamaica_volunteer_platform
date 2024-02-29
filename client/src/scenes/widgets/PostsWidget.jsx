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
    dispatch(initializePosts(axiosPrivate))
  }

  const getVolunteerPosts = async () => {
    dispatch(initializeVolunteerPost(axiosPrivate, volunteerId))
  }

  useEffect(() => {
    if (isProfile) {
      getVolunteerPosts()
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
            posterId={volunteerId}
            name={`${posterFirstName} ${posterLastName}`}
            content={content}
            type={type}
            picturePath={picturePath}
            posterPicturePath={posterPicturePath}
            reactions={reactions}
            comments={comments}
          />
        )
      )}
    </>
  )
}

export default PostsWidget
