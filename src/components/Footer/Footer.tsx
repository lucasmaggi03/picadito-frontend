import './Footer.css';
import logo from '../../img/logo2.webp'

import { CiInstagram } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";
import { CiLinkedin } from "react-icons/ci";
import { BsGithub } from "react-icons/bs";

export function Footer(){

    return(
        <>
        <footer>
            <div className="img">
                <img src={logo} alt="" />
            </div>
            <div className="info">
                <p>Politicas de Seguridad</p>
                <p>Redes social</p>
                <div className="social-media">
                    <CiInstagram />
                    <BsTwitterX />
                    <CiLinkedin />
                    <BsGithub />
                </div>
            </div>
            <div className="contact">
                <p>Contacto</p>
                <p>contacto@picadito.com</p>
            </div>
        </footer>
        </>
    )
}