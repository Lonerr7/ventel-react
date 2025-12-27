import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {ResponseAppData, TransformedResponseAppData} from "./schema/ApiSchema";
import {normalizeData} from "../lib/data";

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: f.URI_SHARED + 'public/'}),
  endpoints: (build) => ({
    getData: build.query<TransformedResponseAppData, void>({
      query: () => '?load-data',
      transformResponse: (data: ResponseAppData) => {
        if (data) {
          // Если положительный ответ от сервера - нормализуем прайсы
          const normalizedPrices = normalizeData(data.prices);
          const normalizedImages = normalizeData(data.images);

          return {
            idPrice: normalizedPrices,
            idImages: normalizedImages,
            original: data,
          }
        }

        return undefined;
      }
    })
  })
});

export const {useGetDataQuery} = api;
