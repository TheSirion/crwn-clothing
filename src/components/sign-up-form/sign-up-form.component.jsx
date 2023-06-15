import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { SignUpContainer, StyledH2 } from "./sign-up-form.styles.jsx";

// objeto com os campos do formulário para iniciar o estado
const defaultFormfields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormfields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormfields);
  }

  const handleSubmit = async event => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      // cria o usuário no Firebase Authentication
      // e retorna um objeto com a propriedade user que contém os dados do usuário
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      // cria o usuário no Firestore
      await createUserDocumentFromAuth(user, { displayName });

      // limpa os campos do formulário
      resetFormFields();

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
        console.error('oops, email already in use:', error);
      } else if (error.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters');
        console.error('weak password, be more creative:', error);
      }
      else {
        console.error('user creation encountered an error', error);
      }
    }
  }

  // event handler genérico para todos os inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <SignUpContainer>
      <StyledH2>Don't have an account?</StyledH2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "displayName",
            value: displayName
          }}
        />

        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password
          }}
        />

        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword
          }}
        />
        <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm;