import { signInWithPopup, AuthProvider } from "firebase/auth";
import { auth } from "./firebase-config";
export const socialAuthentication = (provider: AuthProvider) => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => console.log(err));
};
