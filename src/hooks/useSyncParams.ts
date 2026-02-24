import { useAddressStore } from './useAddressStore'
import { useQueryParams } from './useQueryParams'
import { paramConfig } from '@/configuration/params'
import { useRef, useEffect } from 'react'
import { Status, TxsDirection, TxType } from '@/types'

type QueryParams = {
	direction: TxsDirection
	status?: string
	type?: string
	fromChainId?: string
	toChainId?: string
	fromTimestamp?: string
	toTimestamp?: string
}

const queryParamToStatus = (param: string | undefined): Status => {
	if (!param) return Status.All
	return Object.values(Status).includes(param as Status) ? (param as Status) : Status.All
}

const queryParamToType = (param: string | undefined): TxType => {
	if (!param) return TxType.All
	return Object.values(TxType).includes(param as TxType) ? (param as TxType) : TxType.All
}

const stringToChains = (str: string | undefined): string[] | undefined => {
	return str
		? str
				.split(',')
				.filter(id => /^\d+$/.test(id.trim()))
				.map(id => id.trim())
		: undefined
}

const chainsToString = (ids: string[] | undefined): string | undefined => {
	return ids?.length ? ids.join(',') : undefined
}

export const useSyncParams = (): void => {
	const [urlParams, setQuery] = useQueryParams<QueryParams>(paramConfig)

	const {
		dataFilters,
		setDirection,
		setStatus,
		setType,
		setFromChainIds,
		setToChainIds,
		setFromTimestamp,
		setToTimestamp,
	} = useAddressStore()

	const isURLUpdate = useRef<boolean>(false)
	const isStoreUpdate = useRef<boolean>(false)
	useEffect(() => {
		console.log({
			urlParams,
			dataFilters,
		})
	}, [dataFilters, urlParams])

	// Url to store
	useEffect(() => {
		isURLUpdate.current = true

		if (urlParams.direction !== dataFilters.direction) {
			setDirection(urlParams.direction)
		}
		if (queryParamToStatus(urlParams.status) !== dataFilters.status) {
			setStatus(queryParamToStatus(urlParams.status))
		}
		if (queryParamToType(urlParams.type) !== dataFilters.type) {
			console.log(`useSyncParams | URL to store`, {
				dataFilterType: dataFilters.type,
				urlType: urlParams.type,
			})

			setType(queryParamToType(urlParams.type))
		}
		if (stringToChains(urlParams.fromChainId) !== dataFilters.fromChainIds) {
			setFromChainIds(stringToChains(urlParams.fromChainId))
		}
		if (stringToChains(urlParams.toChainId) !== dataFilters.toChainIds) {
			setToChainIds(stringToChains(urlParams.toChainId))
		}
		if (urlParams.fromTimestamp !== dataFilters.fromTimestamp) {
			setFromTimestamp(urlParams.fromTimestamp)
		}
		if (urlParams.toTimestamp !== dataFilters.toTimestamp) {
			setToTimestamp(urlParams.toTimestamp)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		urlParams.direction,
		urlParams.status,
		urlParams.type,
		urlParams.fromChainId,
		urlParams.toChainId,
		urlParams.fromTimestamp,
		urlParams.toTimestamp,
	])

	// Store to Url
	useEffect(() => {
		if (isURLUpdate.current) {
			isURLUpdate.current = false
			return
		}

		const nextStatus = dataFilters.status === Status.All ? undefined : dataFilters.status

		const nextType = dataFilters.type === TxType.All ? undefined : dataFilters.type

		const nextFromChainId = chainsToString(dataFilters.fromChainIds)
		const nextToChainId = chainsToString(dataFilters.toChainIds)

		const hasDiff =
			dataFilters.direction !== urlParams.direction ||
			nextStatus !== urlParams.status ||
			nextType !== urlParams.type ||
			nextFromChainId !== urlParams.fromChainId ||
			nextToChainId !== urlParams.toChainId ||
			dataFilters.fromTimestamp !== urlParams.fromTimestamp ||
			dataFilters.toTimestamp !== urlParams.toTimestamp

		if (hasDiff) {
			isStoreUpdate.current = true
			setQuery({
				direction: dataFilters.direction,
				status: nextStatus,
				type: nextType,
				fromChainId: nextFromChainId,
				toChainId: nextToChainId,
				fromTimestamp: dataFilters.fromTimestamp,
				toTimestamp: dataFilters.toTimestamp,
			})
		}
	}, [
		dataFilters.direction,
		dataFilters.status,
		dataFilters.type,
		dataFilters.fromChainIds,
		dataFilters.toChainIds,
		dataFilters.fromTimestamp,
		dataFilters.toTimestamp,
		urlParams.direction,
		urlParams.status,
		urlParams.type,
		urlParams.fromChainId,
		urlParams.toChainId,
		urlParams.fromTimestamp,
		urlParams.toTimestamp,
		setQuery,
	])

	useEffect(() => {
		if (isStoreUpdate.current) {
			isStoreUpdate.current = false
		}
	}, [urlParams])
}
