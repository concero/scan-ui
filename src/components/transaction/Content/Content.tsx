import type { ReactElement } from 'react'
import { Title } from './Title/Title'
import { Details } from './Details'
import { Message } from './Message'
import { Finality } from './Finality'
import { Summary } from './Summary'
import { Timestamp } from './Timestamp'
import { Execution } from './Execution'
import { useMemo } from 'react'
import './styles.pcss'

export const Content = (): ReactElement => {
	const executionSection = useMemo(() => <Execution />, [])

	return (
		<div className="tx_content">
			<Title />
			<Message />
			<Summary />
			<Finality />
			<Timestamp />
			<Details />
			{executionSection}
		</div>
	)
}
