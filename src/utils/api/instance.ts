// const baseUrl = 'https://66147b222fc47b4cf27c6734.mockapi.io';

// type MutationMethod = 'POST' | 'PUT' | 'DELETE';



export class Api {
  readonly baseUrl: baseUrl = 'https://66147b222fc47b4cf27c6734.mockapi.io';

  constructor(baseUrl: baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request<T>(additionalUrl: string, params: RequestInit = {}) {
    const responce = await fetch(this.baseUrl + additionalUrl, params);
    if (!responce.ok) throw new Error(responce.statusText);
    const responceData = await responce.json() as ApiResponce<T>;
    return { data: responceData, status: responceData.status  };
  }

  get<T>(additionalUrl: string, params: Omit<RequestInit, 'body'>) {
    return this.request<T>(additionalUrl, { ...params, method: 'GET' });
  }

  post(additionalUrl: string, body: Record<string, any>, params: RequestInit) {
    return this.request(additionalUrl, {
      ...params,
      method: 'POST',
      ...(!!body && body.JSON.stringify(body)),
    });
  }
}

export const api = new Api('https://66147b222fc47b4cf27c6734.mockapi.io');
