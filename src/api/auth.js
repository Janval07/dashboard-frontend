import axios from 'axios'

export async function requestToken(username, password) {
  const body = new URLSearchParams({
    grant_type: 'password',
    client_id: 'fastapi-api',
    username,
    password,
    scope: 'openid',
  })
  const { data } = await axios.post(
    `${import.meta.env.VITE_KEYCLOAK_URL}/realms/cybersecurity/protocol/openid-connect/token`,
    body,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
  )
  return data.access_token
}