import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material'

import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import Follow from '../../components/Follow'
import Join from '../../components/Join'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useState } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useNavigate } from 'react-router-dom'
import postService from '../../services/posts'
const PostWidget = ({
  postId,
  posterId,
  name,
  content,
  type,
  picturePath,
  posterPicturePath,
  reactions,
  comments,
  createdAt,
  isVolunteer = true,
}) => {
  const [isComments, setIsComments] = useState(false)
  const createdAtString = new Date(createdAt).toDateString()
  const navigate = useNavigate()

  const axiosPrivate = useAxiosPrivate()
  const likes = reactions

  const isLiked = likes.length !== 0
  // eslint-disable-next-line react/prop-types
  const likeCount = likes.length

  const { palette } = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main

  const handleLike = async () => {
    await postService.likePost(postId, posterId, axiosPrivate)

    navigate(0)
    navigate(0)
    navigate(0)
  }

  return (
    <WidgetWrapper m="2rem 0">
      {isVolunteer ? (
        <Follow
          followedId={posterId}
          name={name}
          subtitle={createdAtString}
          volunteerPicturePath={posterPicturePath}
        />
      ) : (
        <Join
          agencyId={posterId}
          name={name}
          subtitle={createdAtString}
          picturePath={posterPicturePath}
        />
      )}
      <Typography color={main} sx={{ mt: '1rem' }}>
        {content}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: '0.75rem', marginTop: '0.75rem' }}
          src={`${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => handleLike()}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography> {comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: '0.5rem 0', pl: '1rem' }}>
                {comment}
              </Typography>
              <Divider />
            </Box>
          ))}
        </Box>
      )}
    </WidgetWrapper>
  )
}

export default PostWidget
