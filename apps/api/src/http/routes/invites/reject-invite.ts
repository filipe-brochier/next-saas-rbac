import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function rejectInvite(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/invite/:inviteId/reject',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Reject an invite',
          params: z.object({
            inviteId: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, reply) => {
        const { inviteId } = request.params
        const userId = await request.getCurrentUserId()

        const invite = await prisma.invite.findUnique({
          where: { id: inviteId },
        })

        if (!invite) {
          throw new BadRequestError('Invalid not found or expired')
        }

        const user = await prisma.user.findUnique({
          where: { id: userId },
        })

        if (!user) {
          throw new BadRequestError('User not found')
        }

        if (invite.email !== user.email) {
          throw new BadRequestError(
            'This invite is not for the current user email',
          )
        }

        await prisma.invite.delete({
          where: { id: inviteId },
        })

        return reply.status(204).send()
      },
    )
}
