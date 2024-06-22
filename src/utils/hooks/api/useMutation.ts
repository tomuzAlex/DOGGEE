import React from 'react';
// const res = await fetch(url, {
//   ...config,
//   method,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     ...config?.headers,
//   },
//   credentials: 'same-origin',
//   ...(body && { body: JSON.stringify(body) }),
// });
// setStatus(res.status);

// if (!res.ok) throw new Error(`Error! status: ${res.status}`); 
// const result = (await res.json() as ApiResponce<K>);
// return { success: result.success, data: result.data };




export const useMutation = <T, K>(
  request: (body?: T) => Promise<ApiResponce<K>>,
) => {
  const [status, setStatus] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const mutation = React.useCallback(async (body?: T) => {
    try {
      return await request(body).then(async (res) => {
        setStatus(res.status);
        return res.data;
      })
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
  }, []);
  return { mutation, isLoading, error, status };
};
