export const token = `Bearer ${
  document.cookie
    .split(';')
    .map((value) => value.trim())
    .filter((value) => value.split('=')[0] === 'token')
    .map((value) => value.split('=')[1])[0]
}`;
