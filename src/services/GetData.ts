const API_BASE_URL = 'http://localhost:5008/';

interface Props {
  endpoint: string;
  data: any;
}

async function GetData({ endpoint, data }: Props) {
  const token = localStorage.getItem('token');
  let headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers = { ...headers, 'auth_token': token }
  }

  const response = await fetch(API_BASE_URL + endpoint, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`An error occurred: ${response.statusText}`);
  }

  return await response.json();
}

export { GetData };
