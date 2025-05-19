import './Home.css';
import { IoIosArrowDown } from "react-icons/io";


export function Home() {
    
    return (
        <>
            <div className="welcome">
                <div className='watafak'>
                    </div>

                <div className='header2222'>
                    <img src="src\img\header.jpg" alt="" className='bg-2' />
                </div>
                <img src="src\img\mastant.jpg" alt="" className='bg-1' />
                
                


                <div className='welcome-text'>
                <h1>BIENVENIDO A PICADITO</h1>
                <h2>TU PAGINA N1 PARA RESERVAR CANCHAS</h2>
                <p> Elegi tu cancha y horario, pagas una seña de 20% y tenes tu cancha reservada a tu eleccion! <br/> Contacto: PICADITO@GMAIL.COM </p>
                
                <div className='arrow'><IoIosArrowDown /></div>
                </div>

                
            </div>

            <div className='reservar'>
                <div className='reservar-box'>
                    <h1>RESERVA TU PARTIDO</h1>
                    <div className='reservar-text'>
                        <input type="text" placeholder='Buscar Ciudad' />
                        <input type="text" placeholder='Elige Cancha' />
                        <input type="date" placeholder='Hora' />
                    </div>
                    <button className='reservar-button'>Buscar Canchas</button>
                </div>
            </div>
        </>
    )
}