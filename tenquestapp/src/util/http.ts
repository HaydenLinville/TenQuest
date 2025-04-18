export async function get(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Data not fetched");
  }
  const data = (await response.json()) as unknown;
  return data;
}

export async function post(url: string, data: object) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to POST to ${url} (status: ${response.status})`);
    }
  } catch (error) {
    console.error("from submit error", error);
  }
}

export async function deleteData<T>(url: string, id: number) {
  try {
    const response = await fetch(url + id, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(`Failed to delete: (status: ${response.status})`);
    }
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : null;
  } catch (error) {
    console.error(`Error sending delete request`, error);
    return null;
  }
}
