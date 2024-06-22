interface ApiSuccessResponce<K> {
    data: K;
    success: true;
    status: number
  }
  
  interface ApiFalseResponce {
    data: { message: string };
    success: false;
    status: number;
  }
  
  type ApiResponce<K> = ApiSuccessResponce<K> | ApiFalseResponce;
  
  type baseUrl = string;