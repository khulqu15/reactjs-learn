import { useEffect, useState } from "react";
import api from "../lib/axios";

const OWM = "https://api.openweathermap.org/data/2.5/weather";
const CITY = "Purwosari,ID";
const KEY = import.meta.env.VITE_OWM_KEY;

async function fetchWeather() {
  const url = `${OWM}?q=${encodeURIComponent(CITY)}&appid=${KEY}&units=metric&lang=id`;
  const { data } = await api.get(url);
  return {
    name: data.name,
    temp: Math.round(data.main.temp),
    desc: data.weather?.[0]?.description ?? "-",
    icon: data.weather?.[0]?.icon ?? "01d",
    humidity: data.main.humidity,
    wind: data.wind.speed
  };
}
