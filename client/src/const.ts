export enum AuthStatus {
  Auth = 'auth',
  NotAuth = 'not-auth',
  Unknown = 'unknown',
}

export const AUTHORIZATION = 'Authorization';
export const BASE_URL = 'http://localhost:5000';

export enum ApiRoute {
  signup = '/auth/signup',
}

export enum LoadingStatus {
  Idle = 'idle',
  Pending = 'pending',
}
