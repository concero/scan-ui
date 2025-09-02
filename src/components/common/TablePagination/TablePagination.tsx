import type { FC, ReactElement } from 'react'
import { IconButton } from '@concero/ui-kit'
import { ArrowLeftIcon, ArrowRightIcon } from '@/assets'
import './styles.pcss'

type TablePaginationProps = {
	current: number
	total: number
	onChange: (page: number) => void
}

export const TablePagination: FC<TablePaginationProps> = ({ current, total, onChange }): ReactElement => {
	return (
		<div className="table_pagination">
			<div className="table_pagination_controls">
				<IconButton size="m" variant="secondary">
					<ArrowLeftIcon />
				</IconButton>
				<IconButton size="m" variant="secondary">
                    <ArrowRightIcon/>
                </IconButton>
			</div>
		</div>
	)
}
