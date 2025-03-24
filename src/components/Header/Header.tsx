import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import header from "../../img/header.jpg";
import "./Header.css";

export function Header() {
  const [locations, setLocations] = useState<{ idlocation: number; location: string }[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [sport, setSport] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await axios.get("http://localhost:5000/locations");
        setLocations(response.data);
      } catch (error) {
        console.error("Error obteniendo las localidades:", error);
      }
    };
    getLocation();
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
    navigate("/complexes", { state: { selectedLocation, sport, date, time } });
  };

  return (
    <header className="header">
      <img className="img-header" src={header} alt="Header" />
      <div className="search-match">
        <h1>Reservar partido</h1>
        <form className="search-game" onSubmit={handleSubmit}>
          <div className="search-text">
            <input
              type="text"
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

          <div className="search-text">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className="search-text">
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              <option value="">Selecciona una hora</option>
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                  {`${i.toString().padStart(2, "0")}:00`}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Buscar canchas</button>
        </form>
      </div>
    </header>
  );
}
