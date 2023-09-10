import { useEffect, useState } from 'react';
import { CanceledError } from 'axios';
import apiClient from '../services/api-client';

export interface Genre {
  id: number;
  name: string;
}

interface GenresResponse {
  count: number;
  results: Genre[];
}

function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);

    apiClient
      .get<GenresResponse>('/genres', { signal: controller.signal })
      .then(res => {
        setGenres(res.data.results);
        setIsLoading(false);
      })
      .catch(err => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { genres, error, isLoading };
}

export default useGenres;