import { TxType } from '@/types'
type LocalTxType = Exclude<TxType, TxType.All>
export const TxTypeLabels: Record<LocalTxType, string> = {
	[TxType.LBF]: 'LBF Bridge',
	[TxType.IOU]: 'IOU Bridge',
	[TxType.Canonical]: 'Canonical Bridge',
	[TxType.Message]: 'Message',
	[TxType.CCIP]: 'tCERO Bridge',
}
