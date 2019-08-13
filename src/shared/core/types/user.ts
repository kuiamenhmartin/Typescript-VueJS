export class User {
  name?: string = '';
  email: string = '';
  password?: string = '';
  token?: string = '';
}

export interface StayedLogin {
  token: string;
}

export interface UserSignUp {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface UserResetPassword {
  password: string;
  password_confirmation: string;
  token: string;
}

export interface ApiCredential {
  app_name: string;
  scopes: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  authentication_uri: string;
}
