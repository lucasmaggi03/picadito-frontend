import "./SingIn.css";
import logo from '../../img/logo2.webp'
import { useState } from "react";


export const SingIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) =>{
        e.preventDefault();
    }


  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1>Bienvenido</h1>
        <p>Por favor ingrese sus datos</p>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input placeholder="correo@email.com" value={email} onChange={(e) => setEmail(e.target.value) } type="email" />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="••••••••" />
          </div>
          <a href="#" className="forgot-link">Recuperar contraseña</a>
          <button className="signin-btn" onClick={handleLogin}>Ingresar</button>
        </form>
        <p className="signup-text">
          No tiene una cuenta? <a href="#">Registrate</a>
        </p>
      </div>
      <div className="side-img">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};
