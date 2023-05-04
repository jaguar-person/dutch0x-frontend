export default function createHeaders(
  contentType = 'application/json',
  accessToken?: string
) {
  const headers = {
    'Content-Type': contentType,
    Accept: '*/*',
    'Access-Control-Allow-Headers': '*',
    ...(accessToken && { Authorisation: `${accessToken}` }),
  };

  return headers;
}
