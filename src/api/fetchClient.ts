export const BASE_URL = 'https://swapi.dev/api';

export const getData = async <T>(url: string, useBaseUrl = true): Promise<T> => {
  const fullUrl = useBaseUrl ? `${BASE_URL}${url}` : url;

  try {
    const response = await fetch(fullUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json() as T;
  } catch (error) {
    throw new Error(`Fetch error: ${error}`);
  }
};
