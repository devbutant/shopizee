export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  defaultHeaders?: Record<string, string>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  count?: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Configuration par défaut
const DEFAULT_CONFIG: Required<ApiConfig> = {
  baseUrl: '',
  timeout: 10000,
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
};

// Fonction de création de configuration
export const createApiConfig = (config: ApiConfig): Required<ApiConfig> => ({
  ...DEFAULT_CONFIG,
  ...config,
});

// Fonction request pure
export const makeRequest = async <T>(
  config: Required<ApiConfig>,
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${config.baseUrl}${endpoint}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.timeout);

  // Ne pas envoyer Content-Type si pas de body
  const headers: Record<string, string> = { 
    ...config.defaultHeaders, 
    ...(options.headers as Record<string, string> || {})
  };
  if (!options.body) {
    delete headers['Content-Type'];
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const result: ApiResponse<T> = await response.json();

    if (!response.ok || !result.success) {
      throw new ApiError(
        result.error || 'API request failed',
        response.status,
        response
      );
    }

    return result.data!;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timeout', 408);
    }
    
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
};

// Fonctions HTTP pures
export const get = async <T>(
  config: Required<ApiConfig>,
  endpoint: string,
  params?: Record<string, string | boolean>
): Promise<T> => {
  const url = new URL(`${config.baseUrl}${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }

  return makeRequest<T>(config, url.pathname + url.search);
};

export const post = async <T>(
  config: Required<ApiConfig>,
  endpoint: string,
  data?: any
): Promise<T> => {
  const options: RequestInit = {
    method: 'POST',
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  return makeRequest<T>(config, endpoint, options);
};

export const put = async <T>(
  config: Required<ApiConfig>,
  endpoint: string,
  data?: any
): Promise<T> => {
  const options: RequestInit = {
    method: 'PUT',
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  return makeRequest<T>(config, endpoint, options);
};

export const patch = async <T>(
  config: Required<ApiConfig>,
  endpoint: string,
  data?: any
): Promise<T> => {
  const options: RequestInit = {
    method: 'PATCH',
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  return makeRequest<T>(config, endpoint, options);
};

export const del = async <T>(
  config: Required<ApiConfig>,
  endpoint: string
): Promise<T> => {
  return makeRequest<T>(config, endpoint, {
    method: 'DELETE',
  });
};

// Configuration par défaut
const defaultConfig = createApiConfig({
  baseUrl: (import.meta as any).env.VITE_API_BASE_URL,
});

// API fonctionnelle avec configuration par défaut
export const apiClient = {
  get: <T>(endpoint: string, params?: Record<string, string | boolean>) => 
    get<T>(defaultConfig, endpoint, params),
  post: <T>(endpoint: string, data?: any) => 
    post<T>(defaultConfig, endpoint, data),
  put: <T>(endpoint: string, data?: any) => 
    put<T>(defaultConfig, endpoint, data),
  patch: <T>(endpoint: string, data?: any) => 
    patch<T>(defaultConfig, endpoint, data),
  delete: <T>(endpoint: string) => 
    del<T>(defaultConfig, endpoint),
};
