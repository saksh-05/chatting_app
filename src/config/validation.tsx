import * as yup from "yup";

export const userEmailSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const userNameSchema = yup.object().shape({
  userName: yup.string().min(2).max(25).required(),
});

export const userPasswordSchema = yup.object().shape({
  password: yup.string().min(6).required(),
});
