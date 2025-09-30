import { useAddressStore } from './useAddressStore'
import { useQueryParams } from './useQueryParams'
import { paramConfig } from '@/configuration/params'
import { useRef, useEffect } from 'react'
import type { TxsDirection } from '@/types'

export const useSyncParams = (): void => {
	const [{ direction: urlDirection }, setQuery] = useQueryParams<{
		direction: TxsDirection
	}>(paramConfig)

	const { dataFilters, setDirection } = useAddressStore()

	const isURLUpdate = useRef<boolean>(false)
	const isStoreUpdate = useRef<boolean>(false)

	useEffect(() => {
		if (dataFilters.direction !== urlDirection) {
			isURLUpdate.current = true
			setDirection(urlDirection)
		}
	}, [urlDirection, dataFilters.direction, setDirection])

	useEffect(() => {
		if (isURLUpdate.current) {
			isURLUpdate.current = false
			return
		}

		if (dataFilters.direction !== urlDirection) {
			isStoreUpdate.current = true
			setQuery({ direction: dataFilters.direction })
		}
	}, [dataFilters.direction, urlDirection, setQuery])

	useEffect(() => {
		if (isStoreUpdate.current) {
			isStoreUpdate.current = false
		}
	}, [urlDirection])
}
