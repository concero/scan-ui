import { useEffect, useRef } from 'react'
import type { AddressTxFilters } from '@/stores'
import { useParams } from 'react-router-dom'
import { isAddress } from 'viem'
import { useAddressStore } from '../useAddressStore'
import { useQuery } from '@tanstack/react-query'
import { useQueryParams } from '../useQueryParams'
import {
  parsePage,
  parseTime,
  parseStatus,
  parseType,
  validatePage,
  validateTime,
  validateStatus,
  validateType,
} from '@/utils'
import { getFilteredTransactions } from './mockAddress'

export const useLoadAddress = () => {
  const { address } = useParams<{ address: string }>()
  const { setTransactions, setFilters, setLoading } = useAddressStore()

  const [params] = useQueryParams<AddressTxFilters>({
    page: {
      defaultValue: 1,
      parse: (v) => parsePage({ page: v }),
      validate: (v) => validatePage({ page: v }),
    },
    fromTime: {
      defaultValue: undefined,
      parse: (v) => parseTime({ time: v }),
      validate: (v) => validateTime({ time: v }),
    },
    toTime: {
      defaultValue: undefined,
      parse: (v) => parseTime({ time: v }),
      validate: (v) => validateTime({ time: v }),
    },
    status: {
      defaultValue: undefined,
      parse: (v) => parseStatus({ status: v }),
      validate: (v) => validateStatus({ status: v }),
    },
    type: {
      defaultValue: undefined,
      parse: (v) => parseType({ type: v }),
      validate: (v) => validateType({ type: v }),
    },
  })

  const getData = async (): Promise<any[]> => {
    if (!address || !isAddress(address)) {
      return []
    }

    await new Promise((resolve) => setTimeout(resolve, 300))

    const { transactions } = getFilteredTransactions(params)
    console.log('Filtered transactions:', transactions)

    return transactions
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['addressTxs', address],
    queryFn: getData,
    staleTime: 30_000,
    retry: 2,
    refetchOnWindowFocus: false,
    enabled: !!address && isAddress(address),
  })

  const prevFiltersRef = useRef<AddressTxFilters | null>(null)

  useEffect(() => {
    if (address && isAddress(address)) {
      refetch()

      if ((prevFiltersRef.current === params)) {
        setFilters(params)
        prevFiltersRef.current = params
      }
    }
  }, [params, refetch, address, setFilters])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])


  useEffect(() => {
    if (error) {
      setTransactions([])
      return
    }
    if (data) {
      console.log('Fetched transactions:', data)
      setTransactions(data)
    }
  }, [data, error, setTransactions])

}
