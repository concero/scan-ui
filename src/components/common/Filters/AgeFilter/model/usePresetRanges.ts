import dayjs from 'dayjs'

export const usePresetRanges = () => {
	const now = dayjs().unix()

	return {
		'1d': { from: String(now), to: String(dayjs().add(1, 'day').unix()) },
		'1w': { from: String(now), to: String(dayjs().add(1, 'week').unix()) },
		'1m': { from: String(now), to: String(dayjs().add(1, 'month').unix()) },
		'3m': { from: String(now), to: String(dayjs().add(3, 'month').unix()) },
		'6m': { from: String(now), to: String(dayjs().add(6, 'month').unix()) },
		'1y': { from: String(now), to: String(dayjs().add(1, 'year').unix()) },
	} as const
}
