// TODO: These types were previously in @numize/shared-schemas
// Define them here until we decide on a better approach

export interface ISignInRequest {
  username: string;
  password: string;
}

export interface ISignInResponse {
  message?: string;
  accessToken?: string;
  // Add other fields as needed
}
