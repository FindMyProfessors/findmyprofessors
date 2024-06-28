import { isAuthError, AuthErrorType, AuthError } from './auth';

describe('isAuthError', () => {
  it('should return true for a valid AuthError', () => {
    const error: AuthError = {
      message: 'Invalid password',
      type: AuthErrorType.INVALID_PASSWORD,
    };
    expect(isAuthError(error)).toBe(true);
  });

  it('should return false for an error with an invalid type', () => {
    const error = {
      message: 'Invalid password',
      type: 'INVALID_TYPE',
    };
    expect(isAuthError(error)).toBe(false);
  });

  it('should return false for an error with a missing message', () => {
    const error = {
      type: AuthErrorType.INVALID_PASSWORD,
    };
    expect(isAuthError(error)).toBe(false);
  });

  it('should return false for an error with a missing type', () => {
    const error = {
      message: 'Invalid password',
    };
    expect(isAuthError(error)).toBe(false);
  });

  it('should return false for a non-object error', () => {
    const error = 'Invalid password';
    expect(isAuthError(error)).toBe(false);
  });

  it('should return false for a null error', () => {
    const error = null;
    expect(isAuthError(error)).toBe(false);
  });
});