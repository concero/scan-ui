import { useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAddressStore } from './useAddressStore'
import { TxType, Status } from '@/types'

const syncFilterFromUrl = <T>(
    address: string | undefined,
    searchParams: URLSearchParams,
    setter: (value: T | undefined) => void,
    paramName: string,
    allValue: T
): void => {
    if (!address) return
    
    const urlValue = searchParams.get(paramName) as T | null
    const newValue = urlValue && urlValue !== allValue ? urlValue : undefined

    setter(newValue)
}

const syncFilterToUrl = <T>(
    searchParams: URLSearchParams,
    setSearchParams: (params: URLSearchParams) => void,
    paramName: string,
    value: T | undefined,
    allValue: T,
    skipSync: boolean
): void => {
    if (skipSync) return
    
    const newParams = new URLSearchParams(searchParams)
    
    if (value && value !== allValue) {
        newParams.set(paramName, String(value))
    } else {
        newParams.delete(paramName)
    }
    
    setSearchParams(newParams)
}

const useTypeSync = (address: string | undefined) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const store = useAddressStore()
    const skipToUrlRef = useRef(false)

    const syncFromUrl = useCallback(() => {
        skipToUrlRef.current = true
        syncFilterFromUrl(address, searchParams, store.setType, 'type', TxType.All)
        Promise.resolve().then(() => skipToUrlRef.current = false)
    }, [address, searchParams, store.setType])

    const syncToUrl = useCallback(() => {
        syncFilterToUrl(searchParams, setSearchParams, 'type', store.dataFilters.type, TxType.All, skipToUrlRef.current)
    }, [store.dataFilters.type, searchParams, setSearchParams])

    useEffect(() => {
        syncFromUrl()
    }, [syncFromUrl])

    useEffect(() => {
        syncToUrl()
    }, [syncToUrl])
}

const useStatusSync = (address: string | undefined) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { dataFilters, setStatus } = useAddressStore()
    const skipToUrlRef = useRef(false)

    const syncFromUrl = useCallback(() => {
        skipToUrlRef.current = true
        syncFilterFromUrl(address, searchParams, setStatus, 'status', Status.All)
        Promise.resolve().then(() => skipToUrlRef.current = false)
    }, [address, searchParams, setStatus])

    const syncToUrl = useCallback(() => {
        syncFilterToUrl(searchParams, setSearchParams, 'status', dataFilters.status, Status.All, skipToUrlRef.current)
    }, [dataFilters.status, searchParams, setSearchParams])

    useEffect(() => {
        syncFromUrl()
    }, [syncFromUrl])

    useEffect(() => {
        syncToUrl()
    }, [syncToUrl])
}

export const useParamsSync = (address: string | undefined): void => {
    useTypeSync(address)
    useStatusSync(address)
}
