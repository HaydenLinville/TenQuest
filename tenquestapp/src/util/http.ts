export async function get(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Data not fetched");
  }
  const data = (await response.json()) as unknown;
  return data;
}
