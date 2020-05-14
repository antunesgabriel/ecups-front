import * as yup from "yup";

export const formSchema = yup.object().shape({
  name: yup.string().required("Digite um nome"),
  surname: yup.string().required("Digite um sobrenome"),
  nickname: yup.string().required("Digite um nickname"),
  email: yup
    .string()
    .email("Digite um email valido")
    .required("Digite um email"),
});
