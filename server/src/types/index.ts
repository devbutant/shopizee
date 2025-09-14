export interface ServerConfig {
  port: number;
  host: string;
  database: {
    path: string;
    enableWAL: boolean;
  };
}

export interface DatabaseConfig {
  path: string;
  enableWAL: boolean;
}
