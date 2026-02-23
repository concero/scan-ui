import type { ReactElement, FC, ReactNode } from 'react'
import './styles.pcss'

type TableHeadingProps = {
	readonly headers: ReactNode[]
}

export const TableHeading: FC<TableHeadingProps> = ({ headers }): ReactElement => (
	<thead className="table_heading">
		<tr className="table_heading_container">
			{headers.map(header => (
				<th key={header?.toString()} className="table_head">
					{header}
				</th>
			))}
		</tr>
	</thead>
)
