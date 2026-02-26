import { useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAddressStore } from './useAddressStore'
import { TxType, Status } from '@/types'

export const useParamsSync = (address: string | undefined): void => {
  const [searchParams, setSearchParams] = useSearchParams()
  const store = useAddressStore()
  const isMountedRef = useRef(false)

  const syncFromUrl = useCallback(() => {
    const urlType = searchParams.get('type')
    const parsedType = urlType === 'message' 
      ? TxType.Message 
      : [TxType.LBF, TxType.Canonical].includes(urlType as TxType)
        ? urlType as TxType 
        : undefined
    store.setType(parsedType)

    const urlStatus = searchParams.get('status') as Status | null
    store.setStatus(urlStatus && urlStatus !== Status.All ? urlStatus : undefined)

    const fromChainIdsStr = searchParams.get('fromChainId')
    store.setFromChainIds(fromChainIdsStr?.split(',').map(id => id.trim()).filter(Boolean) || undefined)

    const toChainIdsStr = searchParams.get('toChainId')
    store.setToChainIds(toChainIdsStr?.split(',').map(id => id.trim()).filter(Boolean) || undefined)
  }, [searchParams, store])

  const syncToUrl = useCallback(() => {
    const newParams = new URLSearchParams(searchParams)
    let changed = false

    const expectedType = store.dataFilters.type && store.dataFilters.type !== TxType.All
      ? store.dataFilters.type === TxType.Message ? 'message' : store.dataFilters.type
      : null
    const currentType = searchParams.get('type')
    if (expectedType && currentType !== expectedType) {
      newParams.set('type', expectedType)
      changed = true
    } else if (!expectedType && currentType) {
      newParams.delete('type')
      changed = true
    }

    const expectedStatus = store.dataFilters.status && store.dataFilters.status !== Status.All 
      ? store.dataFilters.status 
      : null
    const currentStatus = searchParams.get('status')
    if (expectedStatus && currentStatus !== expectedStatus) {
      newParams.set('status', expectedStatus)
      changed = true
    } else if (!expectedStatus && currentStatus) {
      newParams.delete('status')
      changed = true
    }

    const expectedFromChain = store.dataFilters.fromChainIds?.length 
      ? store.dataFilters.fromChainIds.join(',') 
      : null
    const currentFromChain = searchParams.get('fromChainId')
    if (expectedFromChain && currentFromChain !== expectedFromChain) {
      newParams.set('fromChainId', expectedFromChain)
      changed = true
    } else if (!expectedFromChain && currentFromChain) {
      newParams.delete('fromChainId')
      changed = true
    }

    const expectedToChain = store.dataFilters.toChainIds?.length 
      ? store.dataFilters.toChainIds.join(',') 
      : null
    const currentToChain = searchParams.get('toChainId')
    if (expectedToChain && currentToChain !== expectedToChain) {
      newParams.set('toChainId', expectedToChain)
      changed = true
    } else if (!expectedToChain && currentToChain) {
      newParams.delete('toChainId')
      changed = true
    }

    if (changed) {
      setSearchParams(newParams)
    }
  }, [searchParams, setSearchParams, store.dataFilters])

  useEffect(() => {
    if (!address) return
    
    if (!isMountedRef.current) {
      isMountedRef.current = true
      syncFromUrl()
    }
  }, [address, syncFromUrl])

  useEffect(() => {
    if (!isMountedRef.current || !address) return
    syncToUrl()
  }, [syncToUrl, address])
}
