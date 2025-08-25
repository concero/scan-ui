import type { ReactElement } from 'react'
import { HomeContent } from './HomeContent'
import { HomeVisuals } from './HomeVisuals'
import './styles.pcss'

export const Home = (): ReactElement => (
	<section className="home">
		<HomeContent />
		<HomeVisuals />
		<div className="home_blur" />
	</section>
)
