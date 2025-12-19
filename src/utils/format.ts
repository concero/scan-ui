export const truncate = (
	str: string | undefined,
	front: number = 6,
	back: number = 4,
	separator: string = '...',
): string => {
	if (!str) return ''
	const minLen = front + back
	if (minLen <= 0 || str.length <= minLen) return str
	return `${str.slice(0, front)}${separator}${str.slice(-back)}`
}
