import axios from 'axios'

const API_BASE_URL = 'https://pokeapi.co/api/v2';

const api = axios.create({ baseURL: API_BASE_URL });

export const pokemonService = {
  // Fazer DTO para tipar a resposta da API
  getList: async (limit = 20, offset = 0): Promise<any> => {
    const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
    return data;
  },

  searchByName: async (name: string): Promise<any> => {
    const { data } = await api.get(`/pokemon/${name.toLowerCase().trim()}`);
    return data;
  },

  getById: async (id: number): Promise<any> => {
    const { data } = await api.get(`/pokemon/${id}`);
    return data;
  },


}