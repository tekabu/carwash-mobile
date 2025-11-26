import Constants from 'expo-constants';

const rawBaseUrl =
  Constants?.expoConfig?.extra?.apiBaseUrl ??
  Constants?.manifest?.extra?.apiBaseUrl ??
  '';
const baseUrl = rawBaseUrl.replace(/\/$/, '');

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const isJsonLike = (value) =>
  value &&
  typeof value === 'object' &&
  !(value instanceof FormData) &&
  !(value instanceof Blob);

async function parseJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function request(endpoint, options = {}) {
  if (!baseUrl) {
    const error = new Error('Missing API base URL.');
    error.status = 0;
    throw error;
  }

  const config = {
    method: 'GET',
    ...options,
  };

  config.headers = {
    ...defaultHeaders,
    ...config.headers,
  };

  if (isJsonLike(config.body)) {
    config.body = JSON.stringify(config.body);
  }

  const url = `${baseUrl}${endpoint}`;
  const method = config.method?.toUpperCase() || 'GET';
  const logLabel = `[api] ${method} ${endpoint}`;
  console.log(`${logLabel} -> ${baseUrl || 'NO_BASE_URL'}`);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, { ...config, signal: controller.signal });
    clearTimeout(timeoutId);
    console.log(`${logLabel} [${response.status}]`);
    const data = await parseJson(response);

    if (!response.ok) {
      const message =
        data?.message || `Request failed with status ${response.status}.`;
      const error = new Error(message);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    if (error.status) {
      throw error;
    }
    if (error.name === 'AbortError') {
      console.error(`${logLabel} timed out`);
      const timeoutError = new Error('Request timed out. Please try again.');
      timeoutError.status = 0;
      throw timeoutError;
    }
    console.error(`${logLabel} network error`, error);
    const networkError = new Error(
      error?.message || 'Network error. Please check your connection.',
    );
    networkError.status = 0;
    throw networkError;
  }
}

const api = {
  request,
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) =>
    request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options) =>
    request(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
