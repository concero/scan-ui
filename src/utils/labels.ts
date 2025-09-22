import { TxType } from '@/stores'

export const TxTypeLabels: Record<TxType, string> = {
	[TxType.LBF]: 'LBF Bridge',
	[TxType.IOU]: 'IOU Bridge',
	[TxType.Canonical]: 'Canonical Bridge',
	[TxType.Message]: 'Message',
	[TxType.CCIP]: 'CCIP Bridge',
}
