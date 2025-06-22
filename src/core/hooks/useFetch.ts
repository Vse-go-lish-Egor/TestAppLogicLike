import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';

type FetchStatus = 'loading' | 'success' | 'error';

export const useFetch = <T,>(fetchFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');

  const execute = useCallback(async () => {
    setStatus('loading');
    try {
      const result = await fetchFunction();
      console.log('result', result);
      setData(result);
      setStatus('success');
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Unknown error');
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStatus('error');
    }
  }, [fetchFunction]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, error, status, refetch: execute };
};