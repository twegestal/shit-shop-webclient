const API_BASE_URL = "http://localhost:5008/";

interface Props {
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
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

  const request: RequestInit = {
    method,
    headers,
  };

  if (data) {
    request.body = JSON.stringify(data);
  }

  const response = await fetch(API_BASE_URL + endpoint, request);

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  }

  return; //Server does not always respons with json, then return undefined
}

export { FetchData };
