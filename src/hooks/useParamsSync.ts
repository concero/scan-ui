import { useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAddressStore } from './useAddressStore'
import { TxType, Status } from '@/types'

export const useParamsSync = (address: string | undefined): void => {
	const [params, setParams] = useSearchParams()
	const store = useAddressStore()
	const mounted = useRef(false)

	const syncFromUrl = useCallback(() => {
		const type = params.get('type')
		store.setType(
			type === 'message'
				? TxType.Message
				: [TxType.LBF, TxType.Canonical].includes(type as TxType)
					? (type as TxType)
					: undefined,
		)

		const status = params.get('status') as Status | null
		store.setStatus(status && status !== Status.All ? status : undefined)

		const fromChains = params
			.get('fromChainId')
			?.split(',')
			.map(id => id.trim())
			.filter(Boolean)
		store.setFromChainIds(fromChains || undefined)

		const toChains = params
			.get('toChainId')
			?.split(',')
			.map(id => id.trim())
			.filter(Boolean)
		store.setToChainIds(toChains || undefined)
	}, [params, store])

	const syncToUrl = useCallback(() => {
		const newParams = new URLSearchParams(params)
		let changed = false

		const type =
			store.dataFilters.type && store.dataFilters.type !== TxType.All
				? store.dataFilters.type === TxType.Message
					? 'message'
					: store.dataFilters.type
				: null
		if (type !== params.get('type')) {
			type ? newParams.set('type', type) : newParams.delete('type')
			changed = true
		}

		const status =
			store.dataFilters.status && store.dataFilters.status !== Status.All ? store.dataFilters.status : null
		if (status !== params.get('status')) {
			status ? newParams.set('status', status) : newParams.delete('status')
			changed = true
		}

		const from = store.dataFilters.fromChainIds?.length ? store.dataFilters.fromChainIds.join(',') : null
		if (from !== params.get('fromChainId')) {
			from ? newParams.set('fromChainId', from) : newParams.delete('fromChainId')
			changed = true
		}

		const to = store.dataFilters.toChainIds?.length ? store.dataFilters.toChainIds.join(',') : null
		if (to !== params.get('toChainId')) {
			to ? newParams.set('toChainId', to) : newParams.delete('toChainId')
			changed = true
		}

		if (changed) setParams(newParams)
	}, [params, setParams, store.dataFilters])

	useEffect(() => {
		if (!address) return
		if (!mounted.current) {
			mounted.current = true
			syncFromUrl()
		}
	}, [address, syncFromUrl])

	useEffect(() => {
		if (!mounted.current || !address) return
		syncToUrl()
	}, [syncToUrl, address])
}
