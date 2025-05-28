import "../SingIn/SingIn.css";
import logo from "../../img/logo2.webp";

const handleRegister = (e : React.MouseEvent<HTMLButtonElement, MouseEvent>
) =>{
    e.preventDefault();
    console.log('register')
}

export const Register = () => {
  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1>Crear cuenta</h1>
        <p>Ingrese los datos para registrarse</p>
        <form>
          <div className="form-group name">
            <div className="">
              <label>Nombre</label>
              <input placeholder="Juan" type="text" />
            </div>
            <div className="">
              <label>Apellido</label>
              <input placeholder="Pérez" type="text" />
            </div>
          </div>
          <div className="form-group">
            <label>Email</label>
            <input placeholder="correo@email.com" type="email" />
          </div>
          <div className="form-group">
            <label>Celular</label>
            <input placeholder="xxx xxx-xxxx" type="number" />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label>Confirmar contraseña</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button className="signin-btn" onClick={handleRegister}>Registrarse</button>
        </form>
        <p className="signup-text">
          Ya tiene una cuenta? <a href="#">Iniciar sesión</a>
        </p>
      </div>
      <div className="side-img">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};
