import { register } from "../auth/register.js";
import { login } from "./../auth/login.js";

const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");

// Register
export const registerUser = () => {
  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("exampleInputEmail1").value;
    const password = document.getElementById("exampleInputPassword1").value;

    alert("Đăng ký thành công");
    register(email, password, "./login.html");
  });
};

// Login
export const loginUser = () => {
  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("exampleInputEmail2").value;
    const password = document.getElementById("exampleInputPassword2").value;

    alert("Đăng nhập thành công");
    login(email, password, "./home.html");
  });
};
