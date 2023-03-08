import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword, signInWithGooglePopup
} from '../../utils/firebase/firebase.utils';
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

// objeto com os campos do formulário para iniciar o estado
const defaultFormfields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormfields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormfields);
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
  }

  const handleSubmit = async event => {
    // previne o comportamento padrão do formulário de enviar os dados
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      console.log(response);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong password");
          break;
        case "auth/user-not-found":
          alert("User not found");
          break;
        default:
          alert("Something went wrong:", error.message);
      }
      console.error("oops, something went wrong:", error);
    }
  }

  // event handler genérico para todos os inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          {/*É necessário adicionar type="button" nesse caso ou ele será
          automaticamente interpretado como type="submit" e tentará 
          enviar o formulário mesmo que ele esteja vazio*/}
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm;