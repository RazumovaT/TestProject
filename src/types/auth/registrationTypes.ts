export type RegisterUserBodyRequest = {
  username: string;
  password: string;
};
export type RegisterUserResponse = {
  data: { token: string };
  error_code: number;
  error_message: string;
  profiling?: string;
  timings: null;
};
