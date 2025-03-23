import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import header from "../../img/header.jpg";
import "./Header.css";

export function Header() {
  const [locations, setLocations] = useState<
    { idlocation: number; location: string }[]
  >([]);
  const [search, setSearch] = useState<string>("");
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [complexes, setComplexes] = useState<
    { idftb: number; name: string; address: string }[]
  >([]);
  const navigate = useNavigate();

  const getLocation = async () => {
    try {
      const response = await axios.get("http://localhost:5000/locations");
      setLocations(response.data);
    } catch (error) {
      console.error("Error obteniendo las localidades:", error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const results = locations
        .filter((loc) =>
          loc.location.toLowerCase().includes(search.toLowerCase())
        )
        .map((loc) => loc.location);
      setFilteredLocations(results);
      setShowSuggestions(true);
    } else {
      setFilteredLocations([]);
      setShowSuggestions(false);
    }
  }, [search, locations]);

  const fetchComplexes = async (idlocation: number) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/complexes?location=${idlocation}`
      );
      setComplexes(response.data);
    } catch (error) {
      console.error("Error obteniendo los complejos:", error);
    }
  };

  const handleSelectLocation = (locName: string) => {
    setSearch(locName);
    setShowSuggestions(false);

    const locationFound = locations.find((loc) => loc.location === locName);
    if (locationFound) {
      setSelectedLocation(locationFound.idlocation);
      fetchComplexes(locationFound.idlocation);
    }
  };

  const handleComplexClick = (complex: {
    idftb: number;
    name: string;
    address: string;
  }) => {
    navigate("/reserve", { state: { complex } });
  };

  return (
    <header className="header">
      <img className="img-header" src={header} alt="Header" />
      <div className="search-match">
        <h1>Reservar partido</h1>
        <form className="search-game" action="">
          <div className="search-text">
            <input
              type="text"
              id="location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Buscar Ciudad"
            />
            {showSuggestions && filteredLocations.length > 0 && (
              <ul className="suggestions">
                {filteredLocations.map((loc, index) => (
                  <li key={index} onClick={() => handleSelectLocation(loc)}>
                    {loc}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="search-text">
            <select id="sport" name="sport">
              <option value="">Elige cancha</option>
              <option value="f5">F5</option>
              <option value="f6">F6</option>
              <option value="f7">F7</option>
              <option value="f8">F8</option>
              <option value="f9">F9</option>
              <option value="f10">F10</option>
              <option value="f11">F11</option>
            </select>
          </div>

          <div className="search-text">
            <input
              type="date"
              id="date"
              name="date"
              placeholder="Fecha"
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
                  .toISOString()
                  .split("T")[0]
              }
            />
          </div>

          <div className="search-text">
            <select id="time" name="time">
              <option value="">Selecciona una hora</option>
              {Array.from({ length: 24 }, (_, i) => {
                const hour = i.toString().padStart(2, "0");
                return (
                  <option key={hour} value={`${hour}:00`}>
                    {`${hour}:00`}
                  </option>
                );
              })}
            </select>
          </div>

          <button type="submit">Buscar canchas</button>
        </form>

        {selectedLocation !== null && complexes.length > 0 && (
          <div className="complex-list">
            <ul>
              {complexes.map((complex, index) => (
                <li key={index} onClick={() => handleComplexClick(complex)}>
                  <strong>{complex.name}</strong> - {complex.address}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
