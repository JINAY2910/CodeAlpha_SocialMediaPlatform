import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
  AttachFileOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [isAttachment, setIsAttachment] = useState(false);
  const [image, setImage] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mediumMain = palette.neutral.mediumMain;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    } else if (attachment) {
      formData.append("picture", attachment);
      formData.append("picturePath", attachment.name);
    }

    const response = await fetch(`http://localhost:8000/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setAttachment(null);
    setPost("");
    setIsImage(false);
    setIsAttachment(false);
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>

      {/* IMAGE DROPZONE */}
      {isImage && (
        <Box
          border={`1px dashed ${palette.primary.main}`}
          borderRadius="0.75rem"
          mt="1rem"
          p="1rem"
          sx={{
            backgroundColor: palette.neutral.light,
            transition: "all 0.3s ease",
          }}
        >
          <Dropzone
            multiple={false}
            accept={{
              "image/jpeg": [],
              "image/png": [],
              "image/jpg": [],
            }}
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file && file.type.startsWith("image/")) {
                setImage(file);
              } else {
                alert("Only image files (.jpg, .jpeg, .png) are allowed in this section. To upload other file formats, please click 'Attachment'.");
              }
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.light}`}
                  p="1.5rem"
                  width="100%"
                  textAlign="center"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <Typography color={mediumMain} fontWeight="500">
                      Drag & drop or <span style={{ color: palette.primary.main, textDecoration: "underline" }}>browse</span> an image (.jpg, .jpeg, .png)
                    </Typography>
                  ) : (
                    <FlexBetween>
                      <Typography color={palette.neutral.dark} fontWeight="500">
                        {image.name}
                      </Typography>
                      <EditOutlined sx={{ color: palette.neutral.dark }} />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ ml: "0.5rem" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      {/* ATTACHMENT DROPZONE */}
      {isAttachment && (
        <Box
          border={`1px dashed ${palette.primary.main}`}
          borderRadius="0.75rem"
          mt="1rem"
          p="1rem"
          sx={{
            backgroundColor: palette.neutral.light,
            transition: "all 0.3s ease",
          }}
        >
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => setAttachment(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.light}`}
                  p="1.5rem"
                  width="100%"
                  textAlign="center"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!attachment ? (
                    <Typography color={mediumMain} fontWeight="500">
                      Drag & drop or <span style={{ color: palette.primary.main, textDecoration: "underline" }}>browse</span> any file (video, PDF, zip, etc.)
                    </Typography>
                  ) : (
                    <FlexBetween>
                      <Typography color={palette.neutral.dark} fontWeight="500">
                        {attachment.name}
                      </Typography>
                      <EditOutlined sx={{ color: palette.neutral.dark }} />
                    </FlexBetween>
                  )}
                </Box>
                {attachment && (
                  <IconButton
                    onClick={() => setAttachment(null)}
                    sx={{ ml: "0.5rem" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <Box display="flex" gap="1.5rem">
          {/* IMAGE OPTION */}
          <FlexBetween
            gap="0.25rem"
            onClick={() => {
              setIsImage(!isImage);
              setIsAttachment(false);
              setAttachment(null);
            }}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <ImageOutlined sx={{ color: isImage ? palette.primary.main : mediumMain }} />
            <Typography
              color={isImage ? palette.primary.main : mediumMain}
              sx={{ fontWeight: "500" }}
            >
              Image
            </Typography>
          </FlexBetween>

          {/* ATTACHMENT OPTION */}
          <FlexBetween
            gap="0.25rem"
            onClick={() => {
              setIsAttachment(!isAttachment);
              setIsImage(false);
              setImage(null);
            }}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            <AttachFileOutlined sx={{ color: isAttachment ? palette.primary.main : mediumMain }} />
            <Typography
              color={isAttachment ? palette.primary.main : mediumMain}
              sx={{ fontWeight: "500" }}
            >
              Attachment
            </Typography>
          </FlexBetween>
        </Box>

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: palette.mode === "dark" ? "#0A0A0A" : "#FFFFFF",
            backgroundColor: palette.mode === "dark" ? "#66E6FC" : "#00A0BC",
            borderRadius: "3rem",
            padding: "0.5rem 1.5rem",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: palette.mode === "dark" ? "#CCF7FE" : "#006B7D",
              color: palette.mode === "dark" ? "#0A0A0A" : "#FFFFFF",
              cursor: "pointer",
            },
            "&.Mui-disabled": {
              backgroundColor: palette.neutral.light,
              color: palette.neutral.medium,
            },
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
