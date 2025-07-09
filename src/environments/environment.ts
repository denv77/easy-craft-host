export const environment = {
  production: false,
  bffUrl: 'https://docker.smartcom.msk.ru:8043',
  // bffUrl: 'http://127.0.0.1:8080',
  // bffUrl: 'http://localhost:8080',
  maxCookieExpiresTime: 5 * 60, // За сколько секунд до окончания сессии появится диалоговое окно с предупреждением о завершении сессии
  minCookieExpiresTime: 2 * 60, // За сколько секунд до окончания сессии произойдет автоматический logout
  maxUserIdleTime: 10 * 60, // Сколько секунд пользователь может ничего не делать перед автоматическим logout
  logoutCountdown: 60 // Сколько секунд будет висеть диалоговое окно перед автоматическим logout
}
