export type Location = {
  name: string;
  country: string;
}

export type WeatherDataProps = {
  current: {
    cloud: number;
    condition: {
      code: number;
      icon: string;
      text: string;
    };
    dewpoint_c: number;
    dewpoint_f: number;
    feelslike_c: number;
    feelslike_f: number;
    gust_kph: number;
    gust_mph: number;
    heatindex_c: number;
    heatindex_f: number;
    humidity: number;
    is_day: number;
    last_updated: string;
    last_updated_epoch: number;
    precip_in: number;
    precip_mm: number;
    pressure_in: number;
    pressure_mb: number;
    temp_c: number;
    temp_f: number;
    uv: number;
    vis_km: number;
    vis_miles: number;
    wind_degree: number;
    wind_dir: string;
    wind_kph: number;
    wind_mph: number;
    windchill_c: number;
    windchill_f: number;
  };
  forecast: {
    forecastday: any[];
  };
  location: {
    country: string;
    lat: number;
    localtime: string;
    localtime_epoch: number;
    lon: number;
    name: string;
    region: string;
    tz_id: string;
  };
};

const kenya = {"current": {"cloud": 50, "condition": {"code": 1003, "icon": "//cdn.weatherapi.com/weather/64x64/night/116.png", "text": "Partly cloudy"}, "dewpoint_c": 11.3, "dewpoint_f": 52.3, "feelslike_c": 16.3, "feelslike_f": 61.3, "gust_kph": 25.1, "gust_mph": 15.6, "heatindex_c": 15.8, "heatindex_f": 60.4, "humidity": 88, "is_day": 0, "last_updated": "2025-02-14 02:45", "last_updated_epoch": 1739490300, "precip_in": 0, "precip_mm": 0, "pressure_in": 30.15, "pressure_mb": 1021, "temp_c": 16.3, "temp_f": 61.3, "uv": 0, "vis_km": 10, "vis_miles": 6, "wind_degree": 40, "wind_dir": "NE", "wind_kph": 14.4, "wind_mph": 8.9, "windchill_c": 15.8, "windchill_f": 60.4}, "forecast": {"forecastday": [[Object], [Object], [Object], [Object], [Object], [Object]]}, "location": {"country": "Kenya", "lat": -1.2833, "localtime": "2025-02-14 02:52", "localtime_epoch": 1739490744, "lon": 36.8167, "name": "Nairobi", "region": "Nairobi Area", "tz_id": "Africa/Nairobi"}}
