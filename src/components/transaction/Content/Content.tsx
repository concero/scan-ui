import type { ReactElement } from 'react'
import { Details } from './Details'
import { Message } from './Message'
import { Finality } from './Finality'
import { Summary } from './Summary'
import { Timestamp } from './Timestamp'
import { Execution } from './Execution'
import { useMemo } from 'react'
import { TxTypeLabels } from '@/utils/labels'
import { useTransactionStore } from '@/hooks'
import './styles.pcss'

export const Content = (): ReactElement => {
	const { transaction } = useTransactionStore()

	const type: string = transaction?.type ? TxTypeLabels[transaction.type] : ''

	const titleSection = useMemo(() => <span className="tx_title">{type}</span>, [type])

	const messageSection = useMemo(() => <Message />, [transaction?.id, transaction?.status])

	const detailsSection = useMemo(() => <Details />, [transaction?.from?.address, transaction?.to?.address])

	const timestampSection = useMemo(() => <Timestamp />, [transaction?.from?.timestamp])

	const summarySection = useMemo(() => <Summary />, [transaction?.from, transaction?.to])

	const finalitySection = useMemo(() => <Finality />, [transaction?.isFinalityRequired])

	const divider = useMemo(() => <span className="divider" />, [])

	const executionSection = useMemo(() => <Execution />, [transaction?.dstChainGasLimit, transaction?.to?.token.symbol, transaction?.messagePayload])

	return (
		<div className="tx_content">
			{titleSection}
			{messageSection}
			{divider}
			{summarySection}
			{divider}
			{finalitySection}
			{divider}
			{timestampSection}
			{divider}
			{detailsSection}
			{divider}
			{executionSection}
		</div>
	)
}
