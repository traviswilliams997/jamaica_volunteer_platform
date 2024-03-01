import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { initializePosts } from '../../reducers/postReducer'
import PostWidget from './PostWidget'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import postsService from '../../services/posts'

// eslint-disable-next-line react/prop-types
const PostsWidget = ({ volunteerId, isProfile = false }) => {
  const dispatch = useDispatch()
  const [posts, setPost] = useState([])
  const axiosPrivate = useAxiosPrivate()

  const getPosts = async () => {
    const res = await postsService.getAll(axiosPrivate)
    setPost(res)
    dispatch(initializePosts(axiosPrivate))
  }

  const getVolunteerPosts = async () => {
    const res = await postsService.getForPerson(volunteerId, axiosPrivate)
    setPost([res])
  }

  useEffect(() => {
    if (isProfile) {
      getVolunteerPosts()
    } else {
      getPosts()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (posts.empty) {
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
          createdAt,
        }) => (
          <PostWidget
            key={id}
            postId={id}
            posterId={volunteerId}
            name={`${posterFirstName} ${posterLastName}`}
            content={content}
            type={type}
            createdAt={createdAt}
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
