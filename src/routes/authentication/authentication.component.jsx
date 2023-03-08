import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

import './authentication.styles.scss';

const Authentication = () => {
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

  return (
    <div className='authentication-container'>
      <SignInForm />
      <SignUpForm />
    </div>
  )
}

export default Authentication;