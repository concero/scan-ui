import { TxsDirection } from '@/types'

type ParseFn<T> = (val: string | null) => T
type ValidateFn<T> = (val: T) => boolean

export const parseDirection: ParseFn<TxsDirection> = (val) => {
  if (!val) return TxsDirection.Incoming
  const lowerVal = val.toLowerCase()
  if (lowerVal === TxsDirection.Incoming) return TxsDirection.Incoming
  if (lowerVal === TxsDirection.Outgoing) return TxsDirection.Outgoing
  return TxsDirection.Incoming
}

export const validateDirection: ValidateFn<TxsDirection> = (val) =>
  Object.values(TxsDirection).includes(val)

export const parsePage: ParseFn<number> = (val) => {
  if (!val) return 1
  const parsed = Number(val)
  if (Number.isInteger(parsed) && parsed > 0) {
    return parsed
  }
  return 1
}

export const validatePage: ValidateFn<number> = (val) =>
  Number.isInteger(val) && val > 0

export const paramConfig = {
  direction: {
    defaultValue: TxsDirection.Incoming,
    parse: parseDirection,
    validate: validateDirection,
  },
  page: {
    defaultValue: 1,
    parse: parsePage,
    validate: validatePage,
  },
} as const

export type ParamConfig = typeof paramConfig
