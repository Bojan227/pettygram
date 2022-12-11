export default async function fetcher<JSON = any>(
  url: string,
  options?: RequestInit
): Promise<JSON> {
  const res = await fetch(url, options);
  return await res.json();
}
