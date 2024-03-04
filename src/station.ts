import axios from 'axios';
import { StationResponse } from './types';

export class Station {
  async getById(id: string) {
    const { data } = await axios.get<StationResponse>(
      `https://precoscombustiveis.dgeg.gov.pt/api/PrecoComb/GetDadosPosto?id=${id}`,
    );
    return data;
  }
}
