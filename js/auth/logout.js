import { auth, signOut } from "../firebase/firebaseConfig";

export const logout = () => {
  return signOut(auth);
};
