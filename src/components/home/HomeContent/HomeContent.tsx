import { ReactElement, memo } from 'react'
import { SearchBar } from '@/components/common'
import './styles.pcss'

export const HomeContent = memo(
	(): ReactElement => (
		<div className="home_content">
			<div className="home_description">
				<span className="home_subtitle">Welcome to</span>
				<span className="home_title">Concero Scan</span>
			</div>
			<div className="home_search">
				<SearchBar />
			</div>
		</div>
	),
)
