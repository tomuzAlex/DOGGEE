

export interface User {
  username: string;
  password: string;
  id: string;
  notMyComputer: boolean;
}

export interface ApiSuccessResponce<K> {
  data: K;
  success: true;
  status: number;
}

export interface ApiFalseResponce {
  data: { message: string };
  success: false;
  status: number;
}

export type ApiResponce<K> = ApiSuccessResponce<K> | ApiFalseResponce;
