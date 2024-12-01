import { Product } from '../store/store.types';

export interface SWRResponse {
  data: Product[];
  error: Error | undefined;
  isLoading: boolean;
}

export const fetcher = (url: string) => fetch(url).then((res) => res.json());
