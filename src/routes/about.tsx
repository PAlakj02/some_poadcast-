import { createFileRoute, redirect } from '@tanstack/react-router'

// Old address, kept so existing links still work.
export const Route = createFileRoute('/about')({ beforeLoad: () => { throw redirect({ to: '/podcast', replace: true }) } })
