const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

type ApiClientOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined | null>;
};

const ApiClient = async <T>(url: string, options?: ApiClientOptions) => {
  const fullURL = new URL(url, baseURL);

  // if there are query parameters, append them to the URL
  if (options?.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        fullURL.searchParams.append(key, String(value));
      }
    });
  }

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
