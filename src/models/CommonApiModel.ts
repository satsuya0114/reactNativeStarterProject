export interface SCTRequestBody<Data> {
  userID: string;
  language: number;
  requestTime: number;
  data: Data;
}

export interface SCTResponseBody<Data> {
  result: boolean;
  message: string;
  type: string;
  responseTime: number;
  data: Data;
}

export interface UserIdAndPassword {
  userId: string;
  password: string; // md5 string
}

export interface ApIdAndUserId {
  apId: string;
  userId: string;
}
