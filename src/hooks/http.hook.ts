import { IHeaders } from "../Interfaces";
import { getItem } from "../utils/PresistanceStorage";

interface IRequest extends IHeaders {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
}

// type FromRequest<T extends IArchiveItem | IArchiveItem[]> =
//   T extends IArchiveItem ? IArchiveItem : IArchiveItem[];

/**
 * @param customFetch
 * @url -> fetch url
 * @method  CRUD methods
 * @body -> JSON.stringify data for post put methods
 * @header ->
 * @returns API data
 */
export const useHttp = () => {
  const request = async <T>({
    url,
    method,
    body = null,
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ` + getItem<string>("token"),
    },
  }: IRequest): Promise<T> => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data: T = await response.json();

      // if (isArray<IArchiveItem>(data)) {
      //   return data as FromRequest<T>;
      // } else if (isObject(data)) {
      //   return data as FromRequest<T>;
      // } else {
      //   throw new Error(`Wrong type data`);
      // }
      return data;
    } catch (e) {
      throw e;
    }
  };

  return {
    request,
  };
};

// function isArray<T>(data: unknown): data is Array<T> {
//   return Array.isArray(data);
// }

// function isObject(data: unknown): data is IArchiveItem {
//   return (data as IArchiveItem).content !== undefined;
// }
