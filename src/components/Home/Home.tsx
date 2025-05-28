import './Home.css';
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';
import  gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from 'react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Home() {
    const [locations, setLocations] = useState<{ idlocation: number; location: string}[]>([]);
    const [search, setSearch] = useState<string>("");
    const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
    const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
    const navigate = useNavigate();
    const [sport, setSport] = useState<string>("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const getLocation = async () => {
            try {
                const response = await axios.get("http://localhost:5000/locations");
                setLocations(response.data);
            } catch (error) {
                console.error("Error obteniendo las localidades:", error);
            }
        };
        getLocation()
    }, []);

    useEffect(() => {
        if (search.length > 0) {
            const results = locations
                .filter((loc) => loc.location.toLowerCase().includes(search.toLowerCase()))
                .map((loc) => loc.location);
            setFilteredLocations(results);
            setShowSuggestions(true);
        } else {
            setFilteredLocations([]);
            setShowSuggestions(false);
        }
    }, [search, locations]);

    const handleSelectLocation = (locName: string) => {
        setSearch(locName);
        setShowSuggestions(false);
        const locationFound = locations.find((loc) => loc.location === locName);
        if (locationFound) {
            setSelectedLocation(locationFound.idlocation);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLocation) {
            alert("Por favor, selecciona una ubicación.");
            return;
        }
        navigate("/complexes", { state: { selectedLocation, sport, date } });
    };
    

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
                <div className='home-nav'>
                    <Link to="/"> <img className="logo" src="src\img\logo.png" alt="" /></Link>
                <div className='home-nav-menu'>
                    <ul className="nav-menu">
                        <div className="nav-menu-left"> 
                            <li><Link to="/reservar">Reservar</Link></li>
                            <li><Link to="/contacto">Contacto</Link></li>
                        </div>
                            <li><Link to="/login" className="auth-btn">Iniciar Sesión</Link></li>
                            <li><Link to="/register" className="auth-btn">Registrarse</Link></li>
                    </ul>
                </div>
                </div>
                <div className='reservar-box'>
                    <h1>RESERVA TU PARTIDO</h1>

                    <form className='search-form' onSubmit={handleSubmit}>
                        <div className='search'>
                        <div className='search-text'>
                            <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} placeholder='Buscar Ciudad' />
                        {showSuggestions && filteredLocations.length > 0 && (
                            <ul className='suggestions'>
                                {filteredLocations.map((loc,index) => (
                                    <li key={index} onClick={() => handleSelectLocation(loc)}> {loc} </li>
                                ))}
                            </ul>
                        )}
                        </div>
                        
                        <div className='search-text'>
                            <select value={sport} onChange={(e) => setSport(e.target.value)}>
                            <option value="">Elige cancha</option>
                              <option value="f5">Fútbol 5</option>
                              <option value="f6">Fútbol 6</option>
                              <option value="f7">Fútbol 7</option>
                              <option value="f8">Fútbol 8</option>
                              <option value="f9">Fútbol 9</option>
                              <option value="f10">Fútbol 10</option>
                              <option value="f11">Fútbol 11</option>
                            </select>
                        </div>

                        <div className='search-text'>
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                        </div>
                    </div>

                    <button className='search-button' type="submit">Buscar canchas</button> 
                    </form>
                    
                </div>
            </div>
        </>
    )
}