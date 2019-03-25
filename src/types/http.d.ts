export interface ServerResponse {
  code: number;
  message?: string;
  data?: {
    [index: string]: any;
  };
}
