import React, { useState, useEffect } from 'react';

function WeatherForecast() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch('https://api.tomorrow.io/v4/weather/forecast?location=-0.1275862,51.5072178&apikey=ttOVzssLyIhBhOzO26B6rfcRagm0QOfJ');
        if (!res.ok) throw new Error('Gagal ambil data cuaca');
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading) return <p>Loading data cuaca...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!weather) return null;

  const dailyData = weather.timelines?.daily?.[0];

  const temperatureAvg = dailyData?.values?.temperatureAvg ?? '-';
  const humidityAvg = dailyData?.values?.humidityAvg ?? '-';
  const sunrise = dailyData?.values?.sunriseTime
    ? new Date(dailyData.values.sunriseTime).toLocaleTimeString()
    : '-';
  const sunset = dailyData?.values?.sunsetTime
    ? new Date(dailyData.values.sunsetTime).toLocaleTimeString()
    : '-';

  const latitude = weather.location?.lat ?? '-';
  const longitude = weather.location?.lon ?? '-';

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', textAlign: 'center' }}>
      <h2>Cuaca Hari Ini</h2>
      <p><strong>Suhu Rata-Rata:</strong> {temperatureAvg}°C</p>
      <p><strong>Kelembaban Rata-Rata:</strong> {humidityAvg}%</p>
      <p><strong>Sunrise:</strong> {sunrise}</p>
      <p><strong>Sunset:</strong> {sunset}</p>
      <p><strong>Latitude:</strong> {latitude}</p>
      <p><strong>Longitude:</strong> {longitude}</p>
    </div>
  );
}

export default WeatherForecast;
