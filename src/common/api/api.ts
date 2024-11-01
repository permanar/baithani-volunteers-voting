const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

const ApiClient = async <T>(url: string, options?: RequestInit) => {
  const fullURL = new URL(url, baseURL);

  const response = await fetch(fullURL.href, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    credentials: "same-origin",
    mode: "same-origin",
    cache: "no-cache",
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data as T;
};

export { ApiClient };
