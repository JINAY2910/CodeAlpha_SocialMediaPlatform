import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:8000/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (() => {
        const ext = picturePath.split(".").pop().toLowerCase();
        const fileUrl = `http://localhost:8000/assets/${picturePath}`;
        if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
          return (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={fileUrl}
            />
          );
        } else if (["mp4", "webm", "ogg", "mov"].includes(ext)) {
          return (
            <video
              width="100%"
              height="auto"
              controls
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
            >
              <source src={fileUrl} />
              Your browser does not support the video tag.
            </video>
          );
        } else {
          return (
            <Box
              display="flex"
              alignItems="center"
              gap="1rem"
              p="1rem"
              mt="0.75rem"
              borderRadius="0.75rem"
              sx={{
                backgroundColor: palette.neutral.light,
                border: `1px solid ${palette.neutral.medium}`,
              }}
            >
              <Typography color={main} variant="body2" sx={{ fontWeight: "bold", flexGrow: 1 }}>
                Attachment: {picturePath}
              </Typography>
              <a
                href={fileUrl}
                download
                target="_blank"
                rel="noreferrer"
                style={{
                  color: primary,
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                }}
              >
                Download File
              </a>
            </Box>
          );
        }
      })()}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
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
            <Typography>{comments.length}</Typography>
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
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
