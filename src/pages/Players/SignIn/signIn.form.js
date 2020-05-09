import * as yup from "yup";

export const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um email válido")
    .required("Digite seu email"),
  password: yup
    .string()
    .min(6, "A senha deve ter no minimo 6 caracters")
    .required("Digite sua senha"),
});
