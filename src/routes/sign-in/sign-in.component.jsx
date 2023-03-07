import { createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
  // useEffect chama getRedirectResult() para pegar o resultado do redirecionamento do signInWithGoogleRedirect()
  // e o resultado é um objeto com a propriedade user que contém os dados do usuário
  // que fez o login com o Google
  // É isso que garante que o usuário que fez o login com o Google seja registrado no banco de dados
  // useEffect(() => {
  //   const getLoggedInUser = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   }
  //   getLoggedInUser();
  // }, []);

  const logGooglePopupUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGooglePopupUser}>Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  )
}

export default SignIn;