import { IHeaders, ITodoistData } from "../Interfaces";

interface IRequest extends IHeaders {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
}

type FromRequest<T extends ITodoistData | ITodoistData[]> =
  T extends ITodoistData ? ITodoistData : ITodoistData[];

export const useHttp = () => {
  const request = async <T extends ITodoistData | ITodoistData[]>({
    url,
    method,
    body = null,
    headers = {
      "Content-Type": "application/json",
    },
  }: IRequest): Promise<
    T extends ITodoistData ? ITodoistData : ITodoistData[]
  > => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      if (isArray<ITodoistData>(data)) {
        return data as FromRequest<T>;
      } else if (isObject(data)) {
        return data as FromRequest<T>;
      } else {
        throw new Error(`Wrong type data`);
      }
    } catch (e) {
      throw e;
    }
  };

  return {
    request,
  };
};

function isArray<T>(data: unknown): data is Array<T> {
  return Array.isArray(data);
}

function isObject(data: unknown): data is ITodoistData {
  return (data as ITodoistData).content !== undefined;
}
