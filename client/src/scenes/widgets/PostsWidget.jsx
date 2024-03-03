import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PostWidget from './PostWidget'

// eslint-disable-next-line react/prop-types
const PostsWidget = ({
  volunteerId,
  agencyId,
  isProfile = false,
  isAgency = false,
}) => {
  const allPosts = useSelector((state) => state.posts)
  const volunteerPosts = allPosts.find((post) => {
    return Number(post.volunteerId) === Number(volunteerId)
  })
  const agencyPosts = allPosts.find((post) => {
    return Number(post.agencyId) === Number(agencyId)
  })

  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (isProfile) {
      if (!isAgency) {
        if (Array.isArray(volunteerPosts)) {
          setPosts(volunteerPosts)
        } else {
          setPosts([volunteerPosts])
        }
      }

      if (isAgency) {
        if (Array.isArray(agencyPosts)) {
          setPosts(agencyPosts)
        } else {
          setPosts([agencyPosts])
        }
      }
    } else {
      setPosts(allPosts)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (typeof posts[0] === 'undefined' || posts.length === 0) {
    return <div></div>
  }

  return (
    <>
      {posts.map(
        ({
          id,
          volunteerId,
          agencyId,
          posterFirstName,
          posterLastName,
          posterName,
          content,
          type,
          picturePath,
          posterPicturePath,
          reactions,
          comments,
          createdAt,
        }) =>
          type === 'Volunteer' ? (
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
          ) : (
            <PostWidget
              key={id}
              postId={id}
              posterId={agencyId}
              name={posterName}
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
