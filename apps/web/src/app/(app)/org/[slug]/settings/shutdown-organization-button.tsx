import { XCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCurrentOrganization } from '@/auth/auth'
import { shutdownOrganization } from '@/http/shutdown-organization'

import { ShutdownOrganizationDialog } from './shutdown-organization-dialog'

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrg = await getCurrentOrganization()

    if (!currentOrg) {
      throw new Error('No organization found')
    }

    await shutdownOrganization({ org: currentOrg })

    redirect('/')
  }

  return (
    <ShutdownOrganizationDialog action={shutdownOrganizationAction}>
      <XCircle className="mr-2 size-4" />
      Shutdown organization
    </ShutdownOrganizationDialog>
  )
}
