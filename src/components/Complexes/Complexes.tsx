import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom"; 
import axios from "axios";
import "./Complexes.css";
import imgDft from '../../img/img-complex.jpg';

interface Complex {
  idftb: number;
  name: string;
  address: string;
  price: number;
  imgUrl: string;
  latitude: number; // Ahora incluye latitud
  longitude: number; // Ahora incluye longitud
}

export function Complexes() {
  const location = useLocation();
  const { selectedLocation, sport, date, time } = location.state || {};
  const [complexes, setComplexes] = useState<Complex[]>([]);

  useEffect(() => {
    const fetchComplexes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/complexes?location=${selectedLocation}`
        );
        setComplexes(response.data); // Asegúrate de que la API devuelve latitude y longitude
      } catch (error) {
        console.error("Error obteniendo los complejos:", error);
      }
    };

    if (selectedLocation) fetchComplexes();
  }, [selectedLocation, sport, date, time]);

  return (
    <section className="container">
      {complexes.length > 0 ? (
        complexes.map((complex) => (
          <Link
            key={complex.idftb}
            to="/reserve"
            state={{ complex }} // Enviamos toda la información del complejo
            className="complex-card"
          >
            <div className="img-complex">
              <img
                src={complex.imgUrl || imgDft}
                alt={complex.name}
              />
              <p className="price">${complex.price || '30.000'}</p>
            </div>
            <div className="complex-info">
              <h1 className="complex-name">{complex.name}</h1>
              <p>{complex.address}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className="not-found">No se encontraron complejos disponibles.</p>
      )}
    </section>
  );
}
