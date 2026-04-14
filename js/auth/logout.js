import { auth, signOut } from "../firebase/firebaseConfig.js";

export const logout = () => {
  return signOut(auth);
};
