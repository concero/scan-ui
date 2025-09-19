import { Status } from '@/types'

type ParseStatusParameters = {
	status: string | null | undefined
}

export const parseStatus = ({ status }: ParseStatusParameters): Status | undefined => {
  if (!status) return undefined;
  const values = Object.values(Status);
  return values.includes(status as Status) ? (status as Status) : undefined;
};

type ValidateStatusParameters = {
	status: Status | undefined | null
}

export const validateStatus = ({ status }: ValidateStatusParameters): boolean =>
  status === undefined || status === null || Object.values(Status).includes(status)
