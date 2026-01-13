import { api } from './api-client'

interface GetProjectsResponse {
  projects: {
    id: string
    name: string
    slug: string
    ownerId: string
    description: string | null
    avatarUrl: string | null
    organizationId: string
    createdAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }[]
}

export async function getProjects(org: string): Promise<GetProjectsResponse> {
  const result = await api
    .get(`organizations/${org}/projects`)
    .json<GetProjectsResponse>()

  return result
}
