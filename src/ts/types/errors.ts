export interface ApiErrorResponse {
  data?: {
    message?: string;
    errors?: {
      full_messages?: string[];
    };
  };
}
