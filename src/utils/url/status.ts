import { Status } from '@/types'

type ParseStatusParameters = {
	status: string | null | undefined
}

export const parseStatus = ({ status }: ParseStatusParameters): Status | undefined => {
	if (!status) return undefined
	return status in Status ? (Status as any)[status] : undefined
}

type ValidateStatusParameters = {
	status: Status | undefined | null
}

export const validateStatus = ({ status }: ValidateStatusParameters): boolean =>
	!status || Object.values(Status).includes(status)
