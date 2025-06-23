export type Config = {
  apiToken: string;
  baseUrl: string;
  onRateLimit?: (retryAfter: number, retryCount: number) => void;
};

export function createRequest(config: Config) {
  return async function request<T>(
    path: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<T> {
    const MAX_RETRIES = 5;
    const res = await fetch(`${config.baseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${config.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (res.status === 429) {
      const retryAfterHeader = res.headers.get('Retry-After');
      const retryAfter = retryAfterHeader
        ? parseInt(retryAfterHeader, 10)
        : Math.pow(2, retryCount); // fallback to exponential backoff

      if (retryCount < MAX_RETRIES) {
        config.onRateLimit?.(retryAfter, retryCount);

        await new Promise((resolve) =>
          setTimeout(resolve, retryAfter * 1000)
        );

        return request<T>(path, options, retryCount + 1);
      } else {
        throw new Error(`Rate limit exceeded after ${MAX_RETRIES} retries`);
      }
    }

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(`Front API error (${res.status}): ${errorBody}`);
    }

    return res.json();
  };
}