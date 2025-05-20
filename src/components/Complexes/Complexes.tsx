import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Complexes.css";
import imgDft from "../../img/img-complex.jpg";
import type { Complex } from '../../types/index'
import {
  FaStar,
  FaMapMarkerAlt,
  FaFutbol,
  FaShower,
  FaFireAlt,
} from "react-icons/fa";


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
                  {complex.description}
                </p>
                <div className="icons">
                  {complex.rating && (
                    <span>
                      <FaStar /> {complex.rating}
                    </span>
                  )}
                  {complex.hasF5 && (
                    <span>
                      <FaFutbol /> F5
                    </span>
                  )}
                  {complex.hasF7 && (
                    <span>
                      <FaFutbol /> F7
                    </span>
                  )}
                  {complex.hasF11 && (
                    <span>
                      <FaFutbol /> F11
                    </span>
                  )}
                  {complex.hasGrill && (
                    <span>
                      <FaFireAlt />
                    </span>
                  )}
                  {complex.shower && (
                    <span>
                      <FaShower />
                    </span>
                  )}
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