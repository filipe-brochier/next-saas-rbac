import { api } from './api-client'

interface GetProfileResponse {
  user: string
}

export async function getProfile(): Promise<GetProfileResponse> {
  const result = await api.get('profile').json<GetProfileResponse>()

  return result
}
