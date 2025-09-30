export const getPaginationPageList = (current: number, total: number): (number | string)[] => {
	const pages: (number | string)[] = []

	if (total <= 6) {
		for (let i = 1; i <= total; i++) pages.push(i)
		return pages
	}

	pages.push(1)

	if (current <= 4) {
		pages.push(2, 3, 4)
		pages.push('...')
	} else if (current >= total - 3) {
		pages.push('...')
		pages.push(total - 3, total - 2, total - 1)
	} else {
		pages.push('...')
		pages.push(current - 1, current, current + 1)
		pages.push('...')
	}

	pages.push(total)

	return pages
}
