import * as SQLite from 'expo-sqlite';
import { WeatherHistoryProps } from '../type';

let db: SQLite.SQLiteDatabase;

export const setupDatabase = async (): Promise<void> => {
  try {
    db = await SQLite.openDatabaseAsync('weather.db');

    // Enable Write-Ahead Logging (WAL) for better performance
    await db.execAsync('PRAGMA journal_mode = WAL;');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS weather_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL,
        country TEXT NOT NULL,
        temperature REAL NOT NULL,
        condition TEXT NOT NULL,
        wind_speed REAL NOT NULL,
        humidity INTEGER NOT NULL,
        date TEXT NOT NULL
      );
    `);
    
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

export const saveWeatherData = async (city: string, country: string, temperature: number, condition: string, wind_speed: number, humidity: number, date: string): Promise<void> => {
  try {
    const result = await db.runAsync(
      `INSERT INTO weather_history (city, country, temperature, condition, wind_speed, humidity, date) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      city, country, temperature, condition, wind_speed, humidity, date
    );

    console.log('Inserted row ID:', result.lastInsertRowId);
  } catch (error) {
    console.error('Error inserting weather data:', error);
  }
};

export const getWeatherHistory = async (): Promise<WeatherHistoryProps[]> => {
  try {
    const history: WeatherHistoryProps[] = await db.getAllAsync<WeatherHistoryProps>('SELECT * FROM weather_history ORDER BY date DESC');
    return history;
  } catch (error) {
    console.error('Error fetching history:', error);
    return [];
  }
};

// delete history
export const clearWeatherHistory = async (): Promise<void> => {
  try {
    await db.runAsync('DELETE FROM weather_history');
    console.log('Weather history cleared');
  } catch (error) {
    console.error('Error clearing history:', error);
  }
};
