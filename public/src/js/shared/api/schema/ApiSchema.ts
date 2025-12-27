export type ErrorResponse = {
  error: string;
  status: false;
}

export type SuccessResponse<T> = {
  data: T;
  status: true;
}

export type Response<T> = SuccessResponse<T> | ErrorResponse;

interface IResponseFan {
  id: string;
  manufacturer: string;
  name: string;
  type: string;
  price: string;
  image?: string;
  doc1?: string;
  doc2?: string;
  doc3?: string;
}

interface IResponseImage {
  id: string;
  path: string;
}

export interface TransformedResponseAppData {
  idPrice: Record<string, IResponseFan>;
  idImages: Record<string, IResponseImage>;
  original: ResponseAppData;
}

export interface ResponseAppData {
  prices: Array<IResponseFan>;
  images: Array<IResponseImage>;
}
