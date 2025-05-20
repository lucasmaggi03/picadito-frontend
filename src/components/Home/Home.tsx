import './Home.css';
import { IoIosArrowDown } from "react-icons/io";

import  gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Home() {
    

    useGSAP( () => {
        gsap.fromTo('.reservar-box', {
            y: -200,
            opacity: 0,
        }, {
            y: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: '.reservar',
                start: 'top center',
                end: 'bottom bottom',
                snap: 1,
                scrub: true,
            }})
        gsap.fromTo('.arrow', {
            y: 0 ,
        },{
            y: 250,
            scrollTrigger: {
                trigger: '.arrow',
                start: 'bottom center',
                end: 'top top',
                scrub: true,
            }
        })
    })
    
    return (
        <>
            <div className="welcome">
                <div className='header2222'>
                    <img src="src\img\header.jpg" alt="" className='bg-2' />
                </div>
                <img src="src\img\mastant.jpg" alt="" className='bg-1' />
            
                <div className='welcome-text'>
                <h1>BIENVENIDO A PICADITO</h1>
                <h2>TU PAGINA №1 PARA RESERVAR CANCHAS</h2>
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