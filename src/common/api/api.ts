import toast from "react-hot-toast";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050/api/v1";

type ApiClientOptions<TParams> = RequestInit & {
  params?: TParams;
};

const ApiClient = async <T, TParams = Record<string, string | number | boolean | undefined | null>>(
  url: string,
  options?: ApiClientOptions<TParams>
) => {
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
    if (response.status === 401) {
      toast.error("Sesi anda telah habis 😢. Silakan login kembali untuk melanjutkan.");

      setTimeout(() => {
        window.location.href = "/login";
      }, 2500);
    }

    throw new Error(data.message);
  }

  return data as T;
};

export { ApiClient };
