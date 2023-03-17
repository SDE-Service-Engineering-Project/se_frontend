import { AuthResponse } from '../../../models/AuthResponse';

export const mockAuthResponse: AuthResponse = {
  authToken: 'newAuth',
  expiresAt: Date.prototype,
  refreshToken: '',
  userName: 'testUser',
};
