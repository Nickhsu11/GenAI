// Custom axios instance used by every orval-generated hook.
// Points at the fake API. In the real Demo project this is where auth
// headers / base URL / error normalization live.
import axios, { type AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8099',
  // Serialize array params as repeated keys (estado=Ativo&estado=Suspenso),
  // not estado[]=… — so the backend reads them with getAll('estado').
  paramsSerializer: { indexes: null },
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> =>
  instance({ ...config }).then((r) => r.data);

export default customInstance;
