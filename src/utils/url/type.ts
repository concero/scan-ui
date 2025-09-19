import { TransactionType } from '@/types'

type ParseTypeParameters = {
	type: string | null | undefined
}

export const parseType = ({ type }: ParseTypeParameters): TransactionType | undefined => {
  if (!type) return undefined;
  const values = Object.values(TransactionType);
  return values.includes(type as TransactionType) ? (type as TransactionType) : undefined;
};

type ValidateTypeParameters = {
	type: TransactionType | undefined | null
}

export const validateType = ({ type }: ValidateTypeParameters): boolean =>
  type === undefined || type === null || Object.values(TransactionType).includes(type);