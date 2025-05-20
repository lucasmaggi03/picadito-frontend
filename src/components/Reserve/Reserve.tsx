import { useState } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./Reserve.css";
import type { Complex } from '../../types/index'

export function Reserve() {

  //GOOGLE MAPS
  const location = useLocation();
  const { complex } = location.state as { complex: Complex } || {}; 

  const days = ["13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"];
  const times = ["C1. F5", "C2. F6", "C3. F7", "C4. F11"];

  const [selectedCell, setSelectedCell] = useState<{ day: string; time: string } | null>(null);

  const handleCellClick = (day: string, time: string) => {
    setSelectedCell({ day, time });
    console.log(`Día seleccionado: ${day}, Horario seleccionado: ${time}`);
  };

  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, 
  });
  console.log(complex.latitude, complex.longitude);
  return (
    <div className="reserve-main">
      {complex && (
        <div className="selected-complex">
          <h2>{complex.name}</h2>
          <p>{complex.address}</p>
          <p>${complex.price}</p>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Hora</th>
            {days.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {days.map((day) => (
                <td
                  key={`${day}-${time}`}
                  onClick={() => handleCellClick(day, time)}
                  className={selectedCell?.day === day && selectedCell?.time === time ? "selected" : ""}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCell && (
        <div className="selected-info">
          <p>
            Has seleccionado: <strong>{selectedCell.day}</strong> a las{" "}
            <strong>{selectedCell.time}</strong>.
          </p>
        </div>
      )}
      <div className="location">
        <h2>Ubicación</h2>
        {isLoaded && complex?.latitude && complex?.longitude ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            zoom={15}
            center={{ lat: complex.latitude, lng: complex.longitude }}
          >
            <Marker position={{ lat: complex.latitude, lng: complex.longitude }} />
          </GoogleMap>
        ) : (
          <p>Cargando mapa...</p>
        )}
      </div>
    </div>
  );
}
