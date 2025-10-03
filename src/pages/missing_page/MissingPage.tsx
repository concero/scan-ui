import type { FC, ReactElement } from 'react'
import { MetaTags } from '@/components/common/MetaTags/MetaTags'
import { MissingPage as Missing } from '@/components'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

export const MissingPage: FC = (): ReactElement => {
	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>
				<Missing
					resource="Page"
					description="The page you’re looking for doesn’t exist. It may have been removed, renamed, or never existed at all."
				/>
			</main>
		</>
	)
}
