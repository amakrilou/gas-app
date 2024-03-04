import dotenv from 'dotenv';
import { GasType } from '../types';

dotenv.config();
//TWILIO
export const SID = process.env.SID || '';
export const AUTH_TOKEN = process.env.AUTH_TOKEN || '';
export const FROM = process.env.FROM || '';
export const TO = process.env.TO || '';

//DGEG
export const STATION_IDS = process.env.STATION_IDS?.split(',') || [];
export const TARGET = (process.env.TARGET as GasType) || GasType.DIESEL_PLUS;

//ALERT
export const POLLING_INTERVAL = Number(process.env.POLLING_INTERVAL) || 60000;
export const ALERT_WEEKDAY = process.env.ALERT_WEEKDAY || 'Monday';
export const ALERT_HOURS = Number(process.env.ALERT_HOURS) || 0;
export const ALERT_MINUTES = Number(process.env.ALERT_MINUTES) || 0;
