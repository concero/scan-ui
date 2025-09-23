export const getRelativeTime = (timestamp: number): string => {
	const now = Date.now()
	const tsMillis = timestamp * 1000
	const diff = now - tsMillis

	if (diff < 0) return 'just now'

	const seconds = Math.floor(diff / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)

	switch (true) {
		case seconds < 60:
			return `${seconds === 1 ? '1 sec' : `${seconds} secs`} ago`
		case minutes < 60:
			return `${minutes === 1 ? '1 min' : `${minutes} mins`} ago`
		case hours < 24:
			return `${hours === 1 ? '1 hr' : `${hours} hrs`} ago`
		default:
			return `${days === 1 ? '1 day' : `${days} days`} ago`
	}
}
