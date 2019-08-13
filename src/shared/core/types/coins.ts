export interface Coins {
  token: string;
}

export interface CoinsNewCredential {
  app_name: string;
  client_id: string;
  redirect_uri: string;
  client_secret: string;
  scopes: string;
  authentication_uri: string;
  isRefreshTokenExist: boolean;
}

export class CoinsNewCredentialValue implements CoinsNewCredential {
  app_name = ''
  client_id = ''
  redirect_uri = ''
  client_secret = ''
  scopes = ''
  authentication_uri = ''
  isRefreshTokenExist = false
}

export class CoinsCredentialAsParams {
  clientId: string = ''
  redirectUri: string = ''
  scopes: string = ''
  state: string = ''
}
