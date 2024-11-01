const ACCESS_TOKEN_NAME = "accessToken";
const REFRESH_TOKEN_NAME = "refreshToken";

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN_NAME);
}

export function setToken(token) {
  localStorage.setItem(ACCESS_TOKEN_NAME, token);
}

export function removeToken() {
  localStorage.removeItem(ACCESS_TOKEN_NAME);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_NAME);
}

export function setRefreshToken(token) {
  localStorage.setItem(REFRESH_TOKEN_NAME, token);
}

export function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_NAME);
}
