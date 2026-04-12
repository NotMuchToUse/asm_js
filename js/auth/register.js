import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "../firebase/firebaseConfig";

export const register = async (email, password, href) => {
  try {
    const createUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const { user } = createUser;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      createdAt: new Date(),
    });

    window.location.href = href;
  } catch (error) {
    console.error({
      code: error.code,
      message: error.message,
    });
  }
};
