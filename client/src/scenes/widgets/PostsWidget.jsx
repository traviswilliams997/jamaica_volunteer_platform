import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostWidget from './PostWidget'

// eslint-disable-next-line react/prop-types
const PostsWidget = ({ volunteerId, isProfile = false }) => {
  const allPosts = useSelector((state) => state.posts)
  const volunteerPosts = allPosts.find((post) => {
    return Number(post.volunteerId) === Number(volunteerId)
  })
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (isProfile) {
      if (Array.isArray(volunteerPosts)) {
        setPosts(volunteerPosts)
      } else {
        setPosts([volunteerPosts])
      }
    } else {
      setPosts(allPosts)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (typeof posts === 'undefined' || posts.empty) {
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
