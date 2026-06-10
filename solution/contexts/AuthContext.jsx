import { createContext } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';
import { useHistory } from 'react-router-dom';

const AuthContextProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useLocalStorage('s11d2', {});
  const history = useHistory();
  let isLoggedIn = authInfo && authInfo.token;

  const initAuth = (authFormData) => {
    axios
      .post(
        'https://nextgen-project.onrender.com/api/s11d2/login',
        authFormData
      )
      .then(function (response) {
        response.data && setAuthInfo(response.data);
        history.push('/friends');
      })
      .catch(function (error) {
        console.log('authError', error);
      });
  };

  const logOut = () => {
    setAuthInfo({});
    history.push('/login');
  };

  return (
    <AuthContext.Provider value={{ initAuth, logOut, isLoggedIn, authInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContext = createContext();
export default AuthContextProvider;
