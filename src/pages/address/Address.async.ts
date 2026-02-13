import { lazy } from 'react'

export const AddressPageAsync = lazy(
	async () =>
		await import('./Address').then(module => ({
			default: module.default,
		})),
)
