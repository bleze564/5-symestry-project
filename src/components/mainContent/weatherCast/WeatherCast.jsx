import React, { useEffect, useState } from "react";
import { weatherService } from "../services/weatherService";
import { storageService } from "../services/storageService";
import { DEFAULT_CITY, WEATHER_UI, EMPTY_STATE } from "../data";

export const WeatherCast = () => {
  const [cities, setCities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // загрузка из localStorage
  useEffect(() => {
    const saved = storageService.getCities();
    setCities(saved);
  }, []);

  // сохранение
  useEffect(() => {
    storageService.saveCities(cities);
  }, [cities]);

  // добавить город
  const addCity = async () => {
    if (!input) return;

    setLoading(true);

    try {
      const data = await weatherService.getCurrent(input);
      setCities((prev) => [...prev, data]);
      setInput("");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const removeCity = (id) => {
    setCities((prev) => prev.filter((c) => c.id !== id));
  };


  const refreshCity = async (city) => {
    const updated = await weatherService.getCurrent(city.name);

    setCities((prev) =>
      prev.map((c) => (c.id === city.id ? updated : c))
    );
  };

  return (
    <div style={{ padding: 20 }}>
      {/* INPUT */}
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city..."
        />
        <button onClick={addCity} disabled={loading}>
          Add
        </button>
      </div>

      {/* EMPTY STATE */}
      {cities.length === 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>{EMPTY_STATE.title}</h3>
          <p>{EMPTY_STATE.subtitle}</p>
        </div>
      )}

      {/* CARDS */}
      <div style={{ display: "flex", gap: 15, marginTop: 20 }}>
        {cities.map((city) => (
          <div
            key={city.id}
            onClick={() => setSelected(city)}
            style={{
              padding: 15,
              border: "1px solid #ccc",
              borderRadius: 10,
              cursor: "pointer",
            }}
          >
            <h3>{city.name}</h3>
            <p>{city.temp}°C</p>

            <button onClick={(e) => {
              e.stopPropagation();
              refreshCity(city);
            }}>
              Refresh
            </button>

            <button onClick={(e) => {
              e.stopPropagation();
              removeCity(city.id);
            }}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* DETAILS BLOCK (как в макете снизу) */}
      {selected && (
        <div style={{ marginTop: 30, padding: 20, background: "#f5f5f5" }}>
          <h2>{selected.name}</h2>

          <p>🌡 Temp: {selected.temp}°C</p>
          <p>💧 Humidity: {selected.humidity}%</p>
          <p>💨 Wind: {selected.wind} m/s</p>
          <p>📊 Pressure: {selected.pressure}</p>
        </div>
      )}
    </div>
  );
};