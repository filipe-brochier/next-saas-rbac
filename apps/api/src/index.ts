import { defineAbilityFor } from '@saas/auth'

const ability = defineAbilityFor({ role: 'MEMBER' })

const userCanInviteSomeoneElse = ability.can('invite', 'User')
const userCanDeleteOtherUsers = ability.can('delete', 'User')
const userCannotDeleteOtherUsers = ability.cannot('delete', 'User')

console.log('User can invite someone else:', userCanInviteSomeoneElse)
console.log('User can delete other users:', userCanDeleteOtherUsers)
console.log('User cannot delete other users:', userCannotDeleteOtherUsers)
