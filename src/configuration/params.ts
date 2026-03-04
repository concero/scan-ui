import { TxsDirection, TxType } from '@/types'

type ParseFn<T> = (val: string | null) => T
type ValidateFn<T> = (val: T | undefined) => boolean

export const parseDirection: ParseFn<TxsDirection> = val => {
	if (!val) return TxsDirection.Incoming
	const lowerVal = val.toLowerCase()
	if (lowerVal === TxsDirection.Incoming) return TxsDirection.Incoming
	if (lowerVal === TxsDirection.Outgoing) return TxsDirection.Outgoing
	return TxsDirection.Incoming
}

export const validateDirection: ValidateFn<TxsDirection> = val =>
	val !== undefined && Object.values(TxsDirection).includes(val)

// --- Status ---
const parseStringParam: ParseFn<string | undefined> = val => val ?? undefined
const validateStringParam: ValidateFn<string | undefined> = () => true

// --- Chain IDs (fromChainId / toChainId) ---
const parseChainIdParam: ParseFn<string | undefined> = val => val ?? undefined
const validateChainIdParam: ValidateFn<string | undefined> = val => !val || /^\d+(,\d+)*$/.test(val)

// --- Timestamps ---
const parseTimestampParam: ParseFn<string | undefined> = val => val ?? undefined
const validateTimestampParam: ValidateFn<string | undefined> = val => !val || (/^\d+$/.test(val) && Number(val) > 0)

export const validateType: ValidateFn<TxType> = val => val !== undefined && Object.values(TxType).includes(val)

// TODO: Add page parsing logic

export const paramConfig = {
	direction: {
		defaultValue: TxsDirection.Incoming,
		parse: parseDirection,
		validate: validateDirection,
	},
	status: {
		defaultValue: undefined,
		parse: parseStringParam,
		validate: validateStringParam,
	},
	type: {
		defaultValue: undefined,
		parse: parseStringParam,
		validate: validateStringParam,
	},
	fromChainId: {
		defaultValue: undefined,
		parse: parseChainIdParam,
		validate: validateChainIdParam,
	},
	toChainId: {
		defaultValue: undefined,
		parse: parseChainIdParam,
		validate: validateChainIdParam,
	},
	fromTimestamp: {
		defaultValue: undefined,
		parse: parseTimestampParam,
		validate: validateTimestampParam,
	},
	toTimestamp: {
		defaultValue: undefined,
		parse: parseTimestampParam,
		validate: validateTimestampParam,
	},
} as const

export type ParamConfig = typeof paramConfig
