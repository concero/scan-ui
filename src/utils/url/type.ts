import { TransactionType } from '@/types'

type ParseTypeParameters = {
	type: string | null | undefined
}

export const parseType = ({ type }: ParseTypeParameters): TransactionType | undefined => {
	if (!type) return undefined
	return type in TransactionType ? (TransactionType as any)[type] : undefined
}

type ValidateTypeParameters = {
	type: TransactionType | undefined | null
}

export const validateType = ({ type }: ValidateTypeParameters): boolean =>
	!type || Object.values(TransactionType).includes(type)
