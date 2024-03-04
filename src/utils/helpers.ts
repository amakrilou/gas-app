import twilio from 'twilio';
import { SID, AUTH_TOKEN, FROM, TO, TARGET } from './config';
import { StationResponse, Weekdays } from '../types';

const client = twilio(SID, AUTH_TOKEN);

export function getPriceFromString(priceString?: string) {
  if (!priceString) return 0;
  return Number(
    priceString?.slice(0, priceString.indexOf(' ')).replace(',', '.'),
  );
}

export function getStationPrice(station: StationResponse) {
  const priceString = station.resultado.Combustiveis.find(
    (c) => c.TipoCombustivel === TARGET,
  )?.Preco;
  const price = getPriceFromString(priceString);
  return price;
}

export function getBestPriceMessage(station: StationResponse) {
  const price = station.resultado.Combustiveis.find(
    (c) => c.TipoCombustivel === TARGET,
  )?.Preco;
  const updateTimestamp = station.resultado.Combustiveis.find(
    (c) => c.TipoCombustivel === TARGET,
  )?.DataAtualizacao;
  return (
    'Melhor resultado:\n\n' +
    `${station.resultado.Nome} - ${station.resultado.Marca}\n${price} (${updateTimestamp})\n${station.resultado.Morada.Morada}\n${station.resultado.Morada.Localidade}`
  );
}

export function getAllResultsMessage(stations: StationResponse[]) {
  return (
    'Todos os resultados:\n\n' +
    stations
      .map((station) => {
        const price = station.resultado.Combustiveis.find(
          (c) => c.TipoCombustivel === TARGET,
        )?.Preco;
        const update = station.resultado.Combustiveis.find(
          (c) => c.TipoCombustivel === TARGET,
        )?.DataAtualizacao;
        return `${station.resultado.Nome} - ${station.resultado.Marca}\n${price} (${update})\n${station.resultado.Morada.Morada}\n${station.resultado.Morada.Localidade}`;
      })
      .join('\n\n')
  );
}

export function getDayIndex(day: (typeof Weekdays)[number]) {
  return Weekdays.findIndex((d) => d === day);
}

export function sendMessage(body: string) {
  return client.messages.create({
    body: body,
    from: FROM,
    to: TO,
  });
}
