import type { FC, ReactElement } from 'react'
import { IconButton } from '@concero/ui-kit'
import { ArrowLeftIcon, ArrowRightIcon } from '@/assets'
import './styles.pcss'

type TablePaginationProps = {
	current: number
	total: number
	onChange: (page: number) => void
}

const PaginationButton: FC<{ page: number; active: boolean; onClick: () => void }> = ({ page, active, onClick }) => (
	<IconButton
		size="m"
		variant={active ? 'secondary_color' : 'tetrary'}
		aria-current={active ? 'page' : undefined}
		onClick={onClick}
		className={`pagination_button ${active ? 'active' : ''}`}
	>
		{page}
	</IconButton>
)

const EllipsisButton: FC<{ key: string | number }> = ({ key }) => (
	<IconButton key={key} size="m" variant="secondary" disabled className="pagination_ellipsis">
		&hellip;
	</IconButton>
)

const getPageList = (current: number, total: number): (number | string)[] => {
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

export const TablePagination: FC<TablePaginationProps> = ({ current, total, onChange }): ReactElement | null => {
	if (total <= 1) return null

	const pages = getPageList(current, total)

	return (
		<div className="table_pagination">
			<div className="table_pagination_controls">
				<IconButton
					size="m"
					variant="secondary"
					disabled={current === 1}
					onClick={() => onChange(current - 1)}
					aria-label="Previous page"
				>
					<ArrowLeftIcon />
				</IconButton>
				<div className="pagination_buttons">
					{pages.map((page, idx) =>
						page === '...' ? (
							<EllipsisButton key={`ellipsis-${idx}`} />
						) : (
							<PaginationButton
								key={page}
								page={page as number}
								active={page === current}
								onClick={() => onChange(page as number)}
							/>
						),
					)}
				</div>
				<IconButton
					size="m"
					variant="secondary"
					disabled={current === total}
					onClick={() => onChange(current + 1)}
					aria-label="Next page"
				>
					<ArrowRightIcon />
				</IconButton>
			</div>
		</div>
	)
}
