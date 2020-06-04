import { UserIdAndPassword } from './CommonApiModel';

export type UseQuery = <T extends any, R extends any>(
  option: UseQueryOption<T, R>,
  baseURL?: string
) => Query<T, R>;

export interface UseQueryOption<RequestData extends any, ResponseData extends any> {
  url: string;
  method: 'get' | 'post';
  payload?: RequestData;
  header?: any;
  data?: ResponseData;
}

export interface Query<RequestData extends any, ResponseData extends any> {
  query: RequestData;
  setQuery: (query: RequestData) => void;
  data: ResponseData;
  setData: (data: ResponseData) => void;
  isLoading: boolean;
  error: any;
  exec: (newPayload: RequestData) => Promise<ResponseData>;
  execLogin: (customBaseURL: string, username: string, newPayload?: UserIdAndPassword) => Promise<ResponseData>;
}
