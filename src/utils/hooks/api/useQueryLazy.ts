import React from 'react';

type MutationMethod = 'POST' | 'PUT' | 'DELETE';

interface ApiSuccessResponce<K> {
  data: K;
  success: true;
}

interface ApiFalseResponce {
  data: { message: string };
  success: false;
}

type ApiResponce<K> = ApiSuccessResponce<K> | ApiFalseResponce;

export const useQueryLazy = <K>(
  url: string,
  deps: React.DependencyList = [],
  config?: Omit<RequestInit, 'method'>,
) => {
  const [status, setStatus] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const query = React.useCallback(async (): Promise<ApiResponce<K> | undefined> => {
    try {
      setIsLoading(true);
      const res = await fetch(url, {
        ...config,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        credentials: 'same-origin',
      });
      setStatus(res.status);
      if (!res.ok) throw new Error(`Error! status: ${res.status}`);
      setIsLoading(false);
      return await res.json();
    } catch (e) {
      if (e instanceof Error) {
        setIsLoading(false);
        setError(e.message);
        console.error(`${error}`);
        return { success: false, data: { message: e.message } };
      }
    } finally {
        setIsLoading(false);
    }
  }, [deps]);
  return { query, isLoading, error, status };
};
