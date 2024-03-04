import { Station } from './station';
import { StationResponse } from './types';
import {
  ALERT_HOURS,
  ALERT_MINUTES,
  ALERT_WEEKDAY,
  POLLING_INTERVAL,
  STATION_IDS,
} from './utils/config';
import {
  getAllResultsMessage,
  getBestPriceMessage,
  getDayIndex,
  getStationPrice,
  sendMessage,
} from './utils/helpers';

setInterval(async () => {
  const currentDate = new Date();

  const currentDay = currentDate.getDay();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  console.log({
    currentDate,
    day: {
      current: currentDay,
      target: getDayIndex(ALERT_WEEKDAY),
      match: currentDate.getDay() === getDayIndex(ALERT_WEEKDAY),
    },
    hours: {
      current: currentHours,
      target: ALERT_HOURS,
      match: currentHours === ALERT_HOURS,
    },
    minutes: {
      current: currentMinutes,
      target: ALERT_MINUTES,
      match: currentMinutes === ALERT_MINUTES,
    },
  });

  if (
    currentDate.getDay() === getDayIndex(ALERT_WEEKDAY) &&
    currentDate.getHours() === ALERT_HOURS &&
    currentDate.getMinutes() === ALERT_MINUTES
  ) {
    console.log('Collecting Data...');
    const station = new Station();
    const stations = await Promise.all(
      STATION_IDS.map((id) => station.getById(id)),
    );

    let bestStation: StationResponse = stations[0];

    for (const station of stations) {
      const stationPrice = getStationPrice(station);
      const bestPrice = getStationPrice(bestStation);
      if (stationPrice < bestPrice) bestStation = station;
    }

    //All results message
    await sendMessage(getAllResultsMessage(stations)).then((message) =>
      console.log(message.sid),
    );

    //Best price message
    await sendMessage(getBestPriceMessage(bestStation)).then((message) =>
      console.log(message.sid),
    );
  }
}, POLLING_INTERVAL);
