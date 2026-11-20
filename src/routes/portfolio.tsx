import { createFileRoute, redirect } from '@tanstack/react-router'

// Old address, kept so existing links still work.
export const Route = createFileRoute('/portfolio')({ beforeLoad: () => { throw redirect({ to: '/', replace: true }) } })
