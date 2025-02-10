import React from "react";
import "../css/LoginPage.css";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, colors } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { registerPageSchemas } from "../schemas/RegisterPageSchemas";
import LoginPageService from "../services/LoginPageService";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "../redux/appSlice";
import { UserType } from "../Types/Types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface CheckUserType {
  result: boolean;
  currentUser: UserType | null;
}

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkUser = (
    userlist: UserType[],
    username: string,
    password: string
  ): CheckUserType => {
    const response: CheckUserType = { result: false, currentUser: null };
    userlist.forEach((user: UserType) => {
      if (user.username === username && user.password === password) {
        response.result = true;
        response.currentUser = user;
      }
    });
    return response;
  };

  const submit = async (values: any, action: any) => {
    try {
      dispatch(setLoading(true));

      const response: UserType[] = await LoginPageService.login();

      if (response) {
        const checkUserResponse: CheckUserType = checkUser(
          response,
          values.username,
          values.password
        );
        if (checkUserResponse.result && checkUserResponse.currentUser) {
          dispatch(setCurrentUser(checkUserResponse.currentUser));
          localStorage.setItem(
            "currentUser",
            JSON.stringify(checkUserResponse.currentUser)
          );
          toast.success("Giriş başarılı");
          navigate("/");
        } else {
          toast.error("Kullanıcı adı veya Şifre yanlış");
        }
      }
    } catch (error) {
      toast.error("Giriş yapılırken hata oluştu" + error);
    } finally {
      dispatch(setLoading(false));
    }
  };
  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: submit,
    validationSchema: registerPageSchemas,
  });

  const clear = () => {
    resetForm();
  };
  return (
    <div className="login">
      <div className="register-div">
        <form onSubmit={handleSubmit}>
          <div className="form-div">
            <TextField
              value={values.username}
              onChange={handleChange}
              sx={{
                width: "300px",
                marginBottom: "15px",
              }}
              id="username"
              placeholder="Kullanıcı adı"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                },
              }}
              variant="standard"
              fullWidth
              helperText={
                errors.username && (
                  <span style={{ color: "red" }}>{errors.username}</span>
                )
              }
            />

            <TextField
              value={values.password}
              onChange={handleChange}
              sx={{ width: "300px" }}
              id="password"
              placeholder="Şifre"
              type="password"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                },
              }}
              variant="standard"
              fullWidth
              helperText={
                errors.password && (
                  <span style={{ color: "red" }}>{errors.password}</span>
                )
              }
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "180px",
                margin: "10px",
                justifyContent: "space-between",
              }}
            >
              <Button
                type="submit"
                sx={{ textTransform: "none" }}
                variant="contained"
                size="small"
              >
                Giriş Yap
              </Button>
              <Button
                onClick={clear}
                sx={{ textTransform: "none" }}
                color="secondary"
                variant="contained"
                size="small"
              >
                Temizle
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
