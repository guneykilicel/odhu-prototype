import { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import { Link, useNavigate } from "react-router-dom";
import classNames from 'classnames';
import './login.css';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);

  var buttonClasses = classNames({
    "container": true,
    "right-panel-active": isActive
  })

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
    navigate("/");
  };

  return (

    <div>
      <div className={buttonClasses} id="main">
        <div className="sign-up">
          <form action="#">
            <h1>Hesap Oluştur</h1>
            <p>Mail Adresini Kullanarak Kayıt Ol</p>
            <input type="text" name="txt" placeholder="Ad" required="" />
            <input type="text" surname="txt" placeholder="Soyad" required="" />
            <input type="email" name="email" placeholder="Email" required="" />
            <input type="password" name="pswd" placeholder="Şifre" required="" />
            <button>Kayıt Ol</button>
          </form>
        </div>
        <div className="sign-in">
          <form action="#" onSubmit={handleSubmit}>
            <h1>Giriş Yap</h1>
            <p>Önceden Oluşturduğunuz Hesaba Giriş Yapın</p>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required="" />
            <input onChange={(e) => setPassword(e.target.value)} type="password" name="pswd" placeholder="Şifre" required="" />
            <a href="#">Şifremi Unuttum</a>
            <button className="button" onClick={() => setActive(false)} type="submit">
                {isFetching ? (
                  <CircularProgress
                    style={{ width: "25px", height: "25px" }}
                    color="inherit"
                  />
                ) : (
                  "Login"
                )}
              </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-left">
              <h1>Hoş Geldiniz</h1>
              <p>Mevcut Hesabınızla Giriş Yapabilirsiniz</p>
              <button id="signIn" onClick={() => setActive(false)}>Giriş Yap</button>
            </div>
            <div className="overlay-right">
              <h1>Sağlıklı Günler Dileriz</h1>
              <p>
                Hesabınız Yoksa Hizmetlerimize Erişmek İçin Şimdi Kayıt
                Olabilirsiniz
              </p>
              <button id="signUp" onClick={() => setActive(true)}>Kayıt Ol</button>
            </div>
          </div>
        </div>
      </div>

    </div>
    // <div className="auth-page">
    //   <h1>Welcome to Social Media App</h1>
    //   <form className="form" onSubmit={handleSubmit}>
    //     <h2>Login</h2>
    //     <div className="form-input">
    //       <TextField
    //         required
    //         type="email"
    //         label="Email"
    //         variant="outlined"
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div className="form-input">
    //       <TextField
    //         required
    //         type="password"
    //         label="Password"
    //         variant="outlined"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <Link to="/register" className="auth-link" href="/">
    //       Go to Register
    //     </Link>
    //     <Button type="submit" variant="contained" color="success">
    //       {isFetching ? (
    //         <CircularProgress
    //           style={{ width: "25px", height: "25px" }}
    //           color="inherit"
    //         />
    //       ) : (
    //         "Login"
    //       )}
    //     </Button>
    //   </form>
    // </div>
  );
};