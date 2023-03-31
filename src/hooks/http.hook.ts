import { IHeaders, IArchiveItem } from "../Interfaces";

interface IRequest extends IHeaders {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: string;
}

type FromRequest<T extends IArchiveItem | IArchiveItem[]> =
  T extends IArchiveItem ? IArchiveItem : IArchiveItem[];

export const useHttp = () => {
  const request = async <T extends IArchiveItem | IArchiveItem[]>({
    url,
    method,
    body = null,
    headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }: IRequest): Promise<
    T extends IArchiveItem ? IArchiveItem : IArchiveItem[]
  > => {
    try {
      const response = await fetch(url, { method, body, headers });

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      if (isArray<IArchiveItem>(data)) {
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

function isObject(data: unknown): data is IArchiveItem {
  return (data as IArchiveItem).content !== undefined;
}
