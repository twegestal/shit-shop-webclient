export const API_BASE_URL = 'http://localhost:5008/';

interface Props {
    endpoint: string,
    data: any;
}

async function LoginService({endpoint, data}: Props) {
    const response = await fetch(API_BASE_URL + endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`An error occurred: ${response.statusText}`);
      }
    
      return await response.json();
}

export { LoginService };