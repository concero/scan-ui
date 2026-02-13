import dayjs from 'dayjs'

export const isValidDateInput = (input: string): boolean => {
	const parts = input.split('/').map(p => p.trim())
	if (parts.length !== 3) return false

	const [ddStr, mmStr, yyyyStr] = parts
	const dd = Number(ddStr)
	const mm = Number(mmStr)
	const yyyy = Number(yyyyStr)

	if (!/^\d{1,2}$/.test(ddStr) || !/^\d{1,2}$/.test(mmStr) || !/^\d{4}$/.test(yyyyStr)) {
		return false
	}

	if (dd < 1 || dd > 31) return false
	if (mm < 1 || mm > 12) return false
	if (yyyy < 2000 || yyyy > dayjs().year() + 1) return false

	const date = dayjs(`${yyyy}-${mm}-${dd}`, 'YYYY-M-D', true)

	return date.isValid() && date.date() === Number(ddStr) && date.month() + 1 === Number(mmStr)
}

export const parseDateInput = (input: string): number | null => {
	const parts = input.split('/').map(p => p.trim())
	if (parts.length !== 3) return null
	const [dd, mm, yyyy] = parts
	const date = dayjs(`${yyyy}-${mm}-${dd}`, 'YYYY-MM-DD', true)
	return date.isValid() ? date.unix() : null
}
