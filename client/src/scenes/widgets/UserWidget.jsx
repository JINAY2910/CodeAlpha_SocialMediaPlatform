import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme, InputBase, IconButton } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser } from "state";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [isEditingTwitter, setIsEditingTwitter] = useState(false);
  const [isEditingLinkedin, setIsEditingLinkedin] = useState(false);
  const [twitterInput, setTwitterInput] = useState("");
  const [linkedinInput, setLinkedinInput] = useState("");

  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUser = useSelector((state) => state.user);

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const isCurrentUser = loggedInUser && loggedInUser._id === userId;

  const getUser = async () => {
    const response = await fetch(`http://localhost:8000/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
    setTwitterInput(data.twitterUrl || "");
    setLinkedinInput(data.linkedinUrl || "");
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
    twitterUrl,
    linkedinUrl,
  } = user;

  const handleSaveSocials = async (platform) => {
    try {
      const body = {};
      if (platform === "twitter") {
        body.twitterUrl = twitterInput;
      } else if (platform === "linkedin") {
        body.linkedinUrl = linkedinInput;
      }

      const response = await fetch(`http://localhost:8000/users/${userId}/socials`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const updatedUser = await response.json();
      if (response.ok) {
        setUser(updatedUser);
        if (isCurrentUser) {
          dispatch(updateUser({ user: updatedUser }));
        }
        if (platform === "twitter") setIsEditingTwitter(false);
        if (platform === "linkedin") setIsEditingLinkedin(false);
      } else {
        console.error("Failed to update socials:", updatedUser.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>

      <Divider />

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetween mb="0.5rem">
          <Typography color={medium}>Who's viewed your profile</Typography>
          <Typography color={main} fontWeight="500">
            {viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">
            {impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem">
          Social Profiles
        </Typography>

        {/* TWITTER */}
        <FlexBetween gap="1rem" mb="0.5rem">
          <FlexBetween gap="1rem" style={{ flexGrow: 1 }}>
            <img src="../assets/twitter.png" alt="twitter" />
            <Box style={{ flexGrow: 1 }}>
              <Typography color={main} fontWeight="500">
                Twitter
              </Typography>
              {isEditingTwitter ? (
                <InputBase
                  value={twitterInput}
                  onChange={(e) => setTwitterInput(e.target.value)}
                  placeholder="https://twitter.com/username"
                  sx={{
                    width: "100%",
                    fontSize: "0.85rem",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "0.5rem",
                    padding: "0.2rem 0.5rem",
                    mt: "0.25rem",
                  }}
                  autoFocus
                />
              ) : (
                <Typography color={medium} sx={{ wordBreak: "break-all" }}>
                  {twitterUrl ? (
                    <a
                      href={twitterUrl.startsWith("http") ? twitterUrl : `https://${twitterUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: palette.primary.main, textDecoration: "none" }}
                    >
                      {twitterUrl}
                    </a>
                  ) : (
                    "Social Network"
                  )}
                </Typography>
              )}
            </Box>
          </FlexBetween>
          {isCurrentUser && (
            <Box display="flex" gap="0.5rem">
              {isEditingTwitter ? (
                <>
                  <IconButton onClick={() => handleSaveSocials("twitter")} size="small">
                    <CheckOutlined sx={{ color: main }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setTwitterInput(twitterUrl || "");
                      setIsEditingTwitter(false);
                    }}
                    size="small"
                  >
                    <CloseOutlined sx={{ color: main }} />
                  </IconButton>
                </>
              ) : (
                <IconButton onClick={() => setIsEditingTwitter(true)} size="small">
                  <EditOutlined sx={{ color: main }} />
                </IconButton>
              )}
            </Box>
          )}
        </FlexBetween>

        {/* LINKEDIN */}
        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem" style={{ flexGrow: 1 }}>
            <img src="../assets/linkedin.png" alt="linkedin" />
            <Box style={{ flexGrow: 1 }}>
              <Typography color={main} fontWeight="500">
                Linkedin
              </Typography>
              {isEditingLinkedin ? (
                <InputBase
                  value={linkedinInput}
                  onChange={(e) => setLinkedinInput(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  sx={{
                    width: "100%",
                    fontSize: "0.85rem",
                    backgroundColor: palette.neutral.light,
                    borderRadius: "0.5rem",
                    padding: "0.2rem 0.5rem",
                    mt: "0.25rem",
                  }}
                  autoFocus
                />
              ) : (
                <Typography color={medium} sx={{ wordBreak: "break-all" }}>
                  {linkedinUrl ? (
                    <a
                      href={linkedinUrl.startsWith("http") ? linkedinUrl : `https://${linkedinUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: palette.primary.main, textDecoration: "none" }}
                    >
                      {linkedinUrl}
                    </a>
                  ) : (
                    "Network Platform"
                  )}
                </Typography>
              )}
            </Box>
          </FlexBetween>
          {isCurrentUser && (
            <Box display="flex" gap="0.5rem">
              {isEditingLinkedin ? (
                <>
                  <IconButton onClick={() => handleSaveSocials("linkedin")} size="small">
                    <CheckOutlined sx={{ color: main }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setLinkedinInput(linkedinUrl || "");
                      setIsEditingLinkedin(false);
                    }}
                    size="small"
                  >
                    <CloseOutlined sx={{ color: main }} />
                  </IconButton>
                </>
              ) : (
                <IconButton onClick={() => setIsEditingLinkedin(true)} size="small">
                  <EditOutlined sx={{ color: main }} />
                </IconButton>
              )}
            </Box>
          )}
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
