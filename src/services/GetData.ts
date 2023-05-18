const API_BASE_URL = 'http://10.2.17.156:5008/';

interface GetDataParams {
  endpoint: string;
  data: any;
}

async function GetData({ endpoint, data }: GetDataParams) {
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
