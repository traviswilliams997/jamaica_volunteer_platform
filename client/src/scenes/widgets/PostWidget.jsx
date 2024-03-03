import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material'

import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material'
import FlexBetween from '../../components/FlexBetween'
import Follow from '../../components/Follow'
import WidgetWrapper from '../../components/WidgetWrapper'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { likeUnlikePost } from '../../reducers/postReducer'

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
}) => {
  const [isComments, setIsComments] = useState(false)
  const createdAtString = new Date(createdAt).toDateString()
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()

  const isLiked = false //Boolean(reactions[loggedInUserId])
  const likeCount = reactions ? 1000 : reactions

  const { palette } = useTheme()
  const main = palette.neutral.main
  const primary = palette.primary.main

  return (
    <WidgetWrapper m="2rem 0">
      <Follow
        followedId={posterId}
        name={name}
        subtitle={createdAtString}
        volunteerPicturePath={posterPicturePath}
      />
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
            <IconButton
              onClick={() => dispatch(likeUnlikePost(postId, axiosPrivate))}
            >
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
            <Typography> {'7' /*comments.length */}</Typography>
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
