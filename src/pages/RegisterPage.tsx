import React from "react";
import "../css/RegisterPage.css";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Button, colors } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { registerPageSchemas } from "../schemas/RegisterPageSchemas";
import RegisterPageService from "../services/RegisterPageService";
import { UserType } from "../Types/Types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const submit = async (values: any, actions: any) => {
    try {
      const payload: UserType = {
        id: String(Math.floor(Math.random() * 99999)),
        username: values.username,
        password: values.password,
        balance: 1000,
      };

      const response = await RegisterPageService.register(payload);
      if (response) {
        clear();
        toast.success("Kullanıcı Başrıyla Eklendi");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Ekleme İşlemi Başarısız");
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
    <div className="register">
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
                Kayıt Ol
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

export default RegisterPage;
