import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mode = theme.palette.mode;

  const bgGradient =
    mode === "dark"
      ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #020617 100%)"
      : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)";

  return (
    <Box
      width="100%"
      height="100vh"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: bgGradient,
        backgroundSize: "cover",
        padding: "1.5rem 1rem",
        overflow: "hidden",
      }}
    >
      <Box
        width={isNonMobileScreens ? "38%" : "92%"}
        maxWidth="500px"
        maxHeight="92vh"
        p="2.5rem 2rem"
        borderRadius="2rem"
        sx={{
          backgroundColor:
            mode === "dark"
              ? "rgba(26, 26, 26, 0.75)"
              : "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border:
            mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow:
            mode === "dark"
              ? "0 10px 40px 0 rgba(0, 0, 0, 0.45)"
              : "0 10px 40px 0 rgba(31, 38, 135, 0.08)",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            background: mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
          },
        }}
      >
        <Box textAlign="center" mb="2rem">
          <Typography
            fontWeight="bold"
            fontSize="38px"
            color="primary"
            sx={{
              letterSpacing: "-0.5px",
              background:
                mode === "dark"
                  ? "linear-gradient(45deg, #66E6FC 30%, #CCF7FE 90%)"
                  : "linear-gradient(45deg, #00A0BC 30%, #006B7D 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              mb: "0.25rem",
            }}
          >
            AlphaSphere
          </Typography>
          <Typography
            color={theme.palette.neutral.mediumMain}
            fontWeight="500"
            fontSize="14px"
          >
            Welcome to the premium social hub
          </Typography>
        </Box>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;
