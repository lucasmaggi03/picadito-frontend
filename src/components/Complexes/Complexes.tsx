import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Complexes.css";
import imgDft from "../../img/img-complex.jpg";
import {
  FaStar,
  FaMapMarkerAlt,
  FaFutbol,
  FaShower,
  FaFireAlt,
} from "react-icons/fa";

interface Complex {
  idftb: number;
  name: string;
  address: string;
  price: number;
  imgUrl: string;
  latitude: number;
  longitude: number;
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
        setComplexes(response.data);
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
            state={{ complex }}
            className="complex-card"
          >
            <div className="img-complex">
              <img src={complex.imgUrl || imgDft} alt={complex.name} />
              <div className="info-overlay">
                <div className="">
                  <h2 className="complex-title">{complex.name}</h2>
                  <p className="address">
                    <FaMapMarkerAlt /> {complex.address}
                  </p>
                </div>
                <p className="description">
                  Disfruta de partidos increíbles en nuestro predio con canchas
                  de F5 y F7. Contamos con parrilleros para que celebres después
                  del juego y baños para tu comodidad.
                </p>
                <div className="icons">
                  <span>
                    <FaStar /> 4.7
                  </span>
                  <span>
                    <FaFutbol /> F5
                  </span>
                  <span>
                    <FaFutbol /> F7
                  </span>
                  <span>
                    <FaFutbol /> F11
                  </span>
                  <span>
                    <FaFireAlt />
                  </span>
                  <span>
                    <FaShower />
                  </span>
                </div>
                <div className="bottom-row">
                  <button className="reserve-btn">Reservar ahora</button>
                  <span className="price-label">
                    Desde ${complex.price || "30.000"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="not-found">No se encontraron complejos disponibles.</p>
      )}
    </section>
  );
}
