type ParseTimeParameter = {
	time: string | null | undefined
}

export const parseTime = ({ time }: ParseTimeParameter): number | undefined => (time ? parseInt(time, 10) : undefined)

type ValidateTimeParameter = {
	time: number | undefined | null
}

export const validateTime = ({ time }: ValidateTimeParameter): boolean => !time || Number.isInteger(time)
