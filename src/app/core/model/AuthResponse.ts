export interface AuthResponse {
  authToken: string,
  refreshToken: string,
  expiresAt: Date,
  userName: string
}
