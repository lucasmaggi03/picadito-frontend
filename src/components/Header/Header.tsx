import header from '../../img/header.jpg';
import './Header.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export function Header() {
  const [locations, setLocations] = useState<{ idlocation: number, location: string }[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [complexes, setComplexes] = useState<{ name: string; address: string }[]>([]);

  const getLocation = async () => {
    try {
      const response = await axios.get('http://localhost:5000/locations');
      setLocations(response.data);
    } catch (error) {
      console.error('Error obteniendo las localidades:', error);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const results = locations
        .filter(loc => loc.location.toLowerCase().includes(search.toLowerCase()))
        .map(loc => loc.location);
      setFilteredLocations(results);
      setShowSuggestions(true);
    } else {
      setFilteredLocations([]);
      setShowSuggestions(false);
    }
  }, [search, locations]);


  const fetchComplexes = async (idlocation: number) => {
    try {
      const response = await axios.get(`http://localhost:5000/complexes?location=${idlocation}`);
      setComplexes(response.data);
    } catch (error) {
      console.error('Error obteniendo los complejos:', error);
    }
  };

  const handleSelectLocation = (locName: string) => {
    setSearch(locName);
    setShowSuggestions(false);

    const locationFound = locations.find(loc => loc.location === locName);
    if (locationFound) {
      setSelectedLocation(locationFound.idlocation);
      fetchComplexes(locationFound.idlocation);
    }
  };

  return (
    <header className="header">
      <img className="img-header" src={header} alt="Header" />
      <div className="search-match">
        <h1>Reservar partido</h1>
        <form className="search-game" action="">
          <div className="search-text">
            <label htmlFor="location">Buscar por localidad</label>
            <div className="autocomplete">
              <input
                type="text"
                id="location"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                placeholder="Escribe una localidad..."
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
          </div>
        </form>

        <h2>Complejos en {search}:</h2>
        {selectedLocation !== null && complexes.length > 0 && (
        <div className="complex-list">
          <ul>
            {complexes.map((complex, index) => (
              <li key={index}>
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
