import dayjs from 'dayjs'

export const usePresetRanges = () => {
	const now = dayjs().unix()

	return {
		'1d': { from: String(dayjs().subtract(1, 'day').unix()), to: String(now) },
		'1w': { from: String(dayjs().subtract(1, 'week').unix()), to: String(now) },
		'1m': { from: String(dayjs().subtract(1, 'month').unix()), to: String(now) },
		'3m': { from: String(dayjs().subtract(3, 'month').unix()), to: String(now) },
		'6m': { from: String(dayjs().subtract(6, 'month').unix()), to: String(now) },
		'1y': { from: String(dayjs().subtract(1, 'year').unix()), to: String(now) },
	} as const
}
