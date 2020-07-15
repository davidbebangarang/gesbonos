import axios from "axios";

const API_URL = process.env.REACT_APP_RUTA_AUTH;
//const API_URL = "https://www.supersaas.com/api/users";


class AuthService {
  login(dni, password) {
    console.log(API_URL + "signin")
    return axios
      .post(API_URL + "signin", {
        dni,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, lastname, dni, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      lastname,
      dni,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();