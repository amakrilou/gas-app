export enum GasType {
  DIESEL = 'Gasóleo simples',
  DIESEL_PLUS = 'Gasóleo especial',
  PETROL_95 = 'Gasolina simples 95',
  PETROL_95_PLUS = 'Gasolina especial 95',
  PETROL_98_PLUS = 'Gasolina especial 98',
}

export type StationAddress = {
  Distrito: string;
  Municipio: string;
  Morada: string;
  Localidade: string;
  CodPostal: string;
  Latitude: number;
  Longitude: number;
  Sentido: string;
};

export type StationHours = {
  DiasUteis: string;
  Sabado: string;
  Domingo: string;
  Feriado: string;
};

export type StationAsset = {
  Descritivo: string;
  FicheiroLogo: string;
};

export type StationGas = {
  TipoCombustivel: GasType;
  Preco: string;
  DataAtualizacao: string;
};

export type StationResult = {
  Nome: string;
  Marca: string;
  Utilizacao: string;
  TipoPosto: string;
  Morada: StationAddress;
  HorarioPosto: StationHours;
  Servicos: StationAsset[];
  MeiosPagamento: StationAsset[];
  Combustiveis: StationGas[];
  OutrosServicos: unknown;
  Observacoes: string;
};

export type StationResponse = {
  status: boolean;
  mensagem: string;
  resultado: StationResult;
  token: null;
};

export const Weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
