import * as yup from "yup";

export const registerPageSchemas = yup.object().shape({
  username: yup.string().required("Kullanıcı adını giriniz"),
  password: yup.string().required("Şifre giriniz")
});
