import { TxType } from '@/types'

type ParseTypeParameters = {
	type: string | null | undefined
}

export const parseType = ({ type }: ParseTypeParameters): TxType | undefined => {
	if (!type) return undefined
	const values = Object.values(TxType)
	return values.includes(type as TxType) ? (type as TxType) : undefined
}

type ValidateTypeParameters = {
	type: TxType | undefined | null
}

export const validateType = ({ type }: ValidateTypeParameters): boolean =>
	type === undefined || type === null || Object.values(TxType).includes(type)
