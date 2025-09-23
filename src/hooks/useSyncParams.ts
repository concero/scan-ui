import { useAddressStore } from './useAddressStore'
import { useQueryParams } from './useQueryParams'
import { paramConfig } from '@/configuration/params'
import { useRef, useEffect } from 'react'
import type { TxsDirection } from '@/types'

export const useSyncParams = (): void => {
  const [{ direction: urlDirection, page: urlPage }, setQuery] = useQueryParams<
    { direction: TxsDirection; page: number }
  >(paramConfig)

  const { direction, page, setDirection, setPage } = useAddressStore()

  const isURLUpdate = useRef<boolean>(false)
  const isStoreUpdate = useRef<boolean>(false)

  useEffect(() => {
    if (direction !== urlDirection || page !== urlPage) {
      isURLUpdate.current = true
      setDirection(urlDirection)
      setPage(urlPage)
    }
  }, [urlDirection, urlPage])

  useEffect(() => {
    if (isURLUpdate.current) {
      isURLUpdate.current = false
      return
    }

    if (direction !== urlDirection || page !== urlPage) {
      isStoreUpdate.current = true
      setQuery({ direction, page })
    }
  }, [direction, page])

  useEffect(() => {
    if (isStoreUpdate.current) {
      isStoreUpdate.current = false
    }
  }, [urlDirection, urlPage])
}
