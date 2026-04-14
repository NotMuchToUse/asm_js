import {
  auth,
  signInWithEmailAndPassword,
} from "../firebase/firebaseConfig.js";

export const login = async (email, password, href) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = href;
  } catch (error) {
    console.error({
      code: error.code,
      message: error.message,
    });
  }
};
