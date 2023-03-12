import { createContext, useEffect, useState } from 'react';

import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

// o "valor em si" do contexto
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})

// o Provider que vai fornecer o valor do estado aos componentes
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser }

  // a função onAuthStateChangeListener observa mudanças na autenticação
  // e muda o estado no Contexto de acordo
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    })

    return unsubscribe;
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
