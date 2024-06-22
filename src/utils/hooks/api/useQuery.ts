import React from 'react';

// type MutationMethod = 'POST' | 'PUT' | 'DELETE';

// interface ApiSuccessResponce<K> {
//   data: K;
//   success: true;
// }

// interface ApiFalseResponce {
//   data: { message: string };
//   success: false;
// }

// type ApiResponce<K> = ApiSuccessResponce<K> | ApiFalseResponce;


// const res = await fetch(url, {
  //   ...config,
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     ...config?.headers,
  //   },
  //   credentials: 'same-origin',
  // });
  // setStatus(res.status);
  // if (!res.ok) throw new Error(`Error! status: ${res.status}`);
  // const result = (await res.json()) as K;
  // setData(result);
  // return result;


export const useQuery = <K>(
  request: () => Promise<{
    data: K;
    status: number;
  }>,
  deps: React.DependencyList = [],
  config?: Omit<RequestInit, 'method'>,
) => {
  const [status, setStatus] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [data, setData] = React.useState<K | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        request().then(async (res) => {
          setStatus(res.status);
          setData(res.data);
        })

      } catch (e) {
        if (e instanceof Error) {
          setIsLoading(false);

          setError(e.message);
          console.error(`${error}`);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, deps);

  // const mutation = React.useCallback(async (): Promise<ApiResponce<K> | undefined> => {
  //   try {
  //     const res = await fetch(url, {
  //       ...config,
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         ...config?.headers,
  //       },
  //       credentials: 'same-origin',
  //     });
  //     setStatus(res.status);

  //     if (!res.ok)  throw new Error(`Error! status: ${res.status}`);
  //     const result = await res.json();
  //     return result;
  //   } catch (e) {
  //     if (e instanceof Error) {
  //       setIsLoading(false);

  //       setError(e.message);
  //       console.error(`${error}`);
  //       return { success: false, data: { message: e.message } };
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);
  return { data, isLoading, error, status };
};
