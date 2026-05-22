import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const mode = theme.palette.mode;

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:8000/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  // Custom premium style override for TextFields
  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "0.75rem",
      backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.015)",
      transition: "all 0.3s ease",
      "& fieldset": {
        borderColor: mode === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)",
      },
      "&:hover fieldset": {
        borderColor: mode === "dark" ? "#66E6FC" : "#00A0BC",
      },
      "&.Mui-focused fieldset": {
        borderColor: mode === "dark" ? "#66E6FC" : "#006B7D",
        borderWidth: "1.5px",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.neutral.medium,
      "&.Mui-focused": {
        color: mode === "dark" ? "#66E6FC" : "#006B7D",
      },
    },
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="15px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{ ...inputStyle, gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ ...inputStyle, gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ ...inputStyle, gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ ...inputStyle, gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px dashed ${mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`}
                  borderRadius="0.75rem"
                  p="0.5rem"
                  sx={{
                    transition: "all 0.3s ease",
                    backgroundColor: mode === "dark" ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 0, 0, 0.01)",
                    "&:hover": {
                      borderColor: mode === "dark" ? "#66E6FC" : "#00A0BC",
                    },
                  }}
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        p="1rem"
                        textAlign="center"
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography color={theme.palette.neutral.medium} variant="body2" fontWeight="500">
                            Drag & drop or <span style={{ color: mode === "dark" ? "#66E6FC" : "#00A0BC", textDecoration: "underline" }}>browse</span> profile picture
                          </Typography>
                        ) : (
                          <FlexBetween>
                            <Typography color={palette.neutral.main} fontWeight="500">{values.picture.name}</Typography>
                            <EditOutlinedIcon sx={{ color: palette.neutral.main }} />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ ...inputStyle, gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ ...inputStyle, gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "1.25rem 0 1rem 0",
                p: "0.85rem",
                borderRadius: "0.75rem",
                fontWeight: "bold",
                fontSize: "0.95rem",
                textTransform: "none",
                background:
                  mode === "dark"
                    ? "linear-gradient(45deg, #00A0BC 0%, #006B7D 100%)"
                    : "linear-gradient(45deg, #000 0%, #333 100%)",
                color: "#FFFFFF",
                boxShadow:
                  mode === "dark"
                    ? "0 4px 15px rgba(0, 160, 188, 0.3)"
                    : "0 4px 15px rgba(0, 0, 0, 0.15)",
                transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                "&:hover": {
                  background:
                    mode === "dark"
                      ? "linear-gradient(45deg, #00B9D8 0%, #008196 100%)"
                      : "linear-gradient(45deg, #222 0%, #555 100%)",
                  boxShadow:
                    mode === "dark"
                      ? "0 6px 20px rgba(0, 160, 188, 0.45)"
                      : "0 6px 20px rgba(0, 0, 0, 0.25)",
                  transform: "translateY(-1px)",
                },
                "&:active": {
                  transform: "translateY(1px)",
                },
              }}
            >
              {isLogin ? "Log In" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              textAlign="center"
              sx={{
                color: mode === "dark" ? "#66E6FC" : "#006B7D",
                fontSize: "13px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                "&:hover": {
                  cursor: "pointer",
                  color: mode === "dark" ? "#CCF7FE" : "#00A0BC",
                  textDecoration: "underline",
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
