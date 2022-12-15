const index = document.cookie
  .split('; ')
  .findIndex((value) => value.includes('token'));

export const token = `Bearer ${
  document.cookie.split('; ')[index].split('=')[1]
}`;
