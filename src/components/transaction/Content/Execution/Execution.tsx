import type { ReactElement } from 'react'
import { IconButton } from '@concero/ui-kit'
import { useTransactionsStore } from '@/hooks'
import { PointerUpIcon } from '@/assets'
import { GasLimit } from './GasLimit'
import { Payload } from './Payload'
import { Retry } from './Retry'
import { useState, useCallback } from 'react'
import { Transaction, TxType } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { Status } from '@/types'
import './styles.pcss'

export const Execution = (): ReactElement => {
	const [toggled, setToggled] = useState<boolean>(false)
	const { txs } = useTransactionsStore()
	const transaction: Transaction | null = txs && txs.length > 0 ? txs[0] : null
	const hasRetryData = transaction?.type === TxType.Message && transaction?.status === Status.Canceled
	// const canRetry =
	// 	hasRetryData &&
	// 	transaction.messageReceipt &&
	// 	transaction.dstValidatorLibs?.length &&
	// 	transaction.validations?.length &&
	// 	transaction.validationChecks?.length &&
	// 	transaction.dstRelayerLib &&
	// 	transaction.dstChainGasLimit

	const canRetry = hasRetryData
	const isMessage: boolean = transaction?.type === TxType.Message
	const toggleLabel: string = toggled ? 'Less Details' : 'More Details'
	const btnClass: string = `execution_toggle_icon ${toggled ? 'rotated' : ''}`
	const toggle = useCallback(() => setToggled(prev => !prev), [])

	return (
		<div className="execution">
			{!isMessage && (
				<div className="execution_toggle" onClick={toggle}>
					<span className="execution_toggle_label">{toggleLabel}</span>
					<IconButton size="l" variant="secondary" className={btnClass}>
						<PointerUpIcon />
					</IconButton>
				</div>
			)}

			<AnimatePresence initial={false}>
				{(isMessage || toggled) && (
					<motion.div
						key="execution_content"
						className="execution_content"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						style={{ overflow: 'hidden' }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<Payload />
						<GasLimit />
						{canRetry && <Retry />}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
