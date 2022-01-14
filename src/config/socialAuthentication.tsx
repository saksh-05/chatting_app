import { signInWithPopup, AuthProvider, getAuth } from "firebase/auth";
// import { auth } from "./firebase-config";
export const socialAuthentication = (provider: AuthProvider) => {
  const auth = getAuth();
  return signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};
