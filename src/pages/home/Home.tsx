import type { FC, ReactElement } from 'react'
import { MetaTags } from '@/components/common/MetaTags/MetaTags'
import { Home } from '@/components'

const META_TITLE = 'Concero | Scan'
const META_DESCRIPTION =
	'Track and verify Concero transactions effortlessly with Concero Scan. A fast, secure, and transparent tool designed exclusively for monitoring transactions routed through Concero’s cross-chain infrastructure'

export const HomePage: FC = (): ReactElement => {
	return (
		<>
			<MetaTags title={META_TITLE} description={META_DESCRIPTION} />
			<main>
				<Home />
			</main>
		</>
	)
}
