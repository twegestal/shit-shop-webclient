const API_BASE_URL = "http://localhost:5008/";

interface Props {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE"; // Add other supported HTTP methods if needed
  data?: any;
}

async function FetchData({ endpoint, method, data }: Props) {
  const token = localStorage.getItem("token");
  let headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers = { ...headers, auth_token: token };
  }

  const requestOptions: RequestInit = {
    method,
    headers,
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(API_BASE_URL + endpoint, requestOptions);

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return; // Return undefined if the response doesn't have JSON content
}

export { FetchData };
