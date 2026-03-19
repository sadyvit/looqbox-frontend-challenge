import { useState, useCallback } from 'react';
import { Pokemon } from '../types';
import { pokemonService } from '../services/pokemonService';


export const usePokemonSearch = () => {
  const [result, setResult] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await pokemonService.searchByName(query);
      setResult(data);
    } catch (err) {
      setError(`Não foi possível encontrar o Pokémon "${query}". Verifique o nome e tente novamente.`);
    } finally {
      setLoading(false);

    }
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return { result, loading, error, search, clear };
}
