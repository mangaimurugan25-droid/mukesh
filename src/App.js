import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [country, setCountry] = useState("India");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `https://disease.sh/v3/covid-19/countries/${country}`
      );

      setData(response.data);
      setLoading(false);
    } catch (error) {
      alert("Country Not Found");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="overlay">

        <h1>🌍 COVID / Health Stats Tracker</h1>

        <div className="search-section">
          <input
            type="text"
            placeholder="Enter Country Name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <button onClick={fetchData}>
            Search
          </button>
        </div>

        {loading && <h2>Loading...</h2>}

        {data && (
          <>
            <div className="country-header">
              <img
                src={data.countryInfo.flag}
                alt={data.country}
              />

              <h2>{data.country}</h2>
            </div>

            <div className="card-container">

              <div className="card">
                <h3>Total Cases</h3>
                <p>{data.cases.toLocaleString()}</p>
              </div>

              <div className="card">
                <h3>Recovered</h3>
                <p>{data.recovered.toLocaleString()}</p>
              </div>

              <div className="card">
                <h3>Deaths</h3>
                <p>{data.deaths.toLocaleString()}</p>
              </div>

              <div className="card">
                <h3>Active Cases</h3>
                <p>{data.active.toLocaleString()}</p>
              </div>

            </div>

            {data.active > 100000 && (
              <div className="alert">
                ⚠ High Risk Country Alert
              </div>
            )}

            <div className="table-section">
              <table>
                <thead>
                  <tr>
                    <th>Country</th>
                    <th>Total Cases</th>
                    <th>Recovered</th>
                    <th>Deaths</th>
                    <th>Active</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{data.country}</td>
                    <td>{data.cases.toLocaleString()}</td>
                    <td>{data.recovered.toLocaleString()}</td>
                    <td>{data.deaths.toLocaleString()}</td>
                    <td>{data.active.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </>
        )}
      </div>
    </div>
  );
}

export default App;

