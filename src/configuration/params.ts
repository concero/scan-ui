import { TxsDirection } from '@/types'

type ParseFn<T> = (val: string | null) => T
type ValidateFn<T> = (val: T) => boolean

export const parseDirection: ParseFn<TxsDirection> = val => {
	if (!val) return TxsDirection.Incoming
	const lowerVal = val.toLowerCase()
	if (lowerVal === TxsDirection.Incoming) return TxsDirection.Incoming
	if (lowerVal === TxsDirection.Outgoing) return TxsDirection.Outgoing
	return TxsDirection.Incoming
}

export const validateDirection: ValidateFn<TxsDirection> = val => Object.values(TxsDirection).includes(val)

// TODO: Add page parsing logic

export const paramConfig = {
	direction: {
		defaultValue: TxsDirection.Incoming,
		parse: parseDirection,
		validate: validateDirection,
	},
} as const

export type ParamConfig = typeof paramConfig
