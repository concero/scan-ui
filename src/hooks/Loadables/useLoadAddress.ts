import type { AddressTxFilters } from '@/stores'
import { useParams } from 'react-router-dom'
import { isAddress } from 'viem'
import { useAddressStore } from '../useAddressStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
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

  const getData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ['addressTxs', address, params],
    queryFn: getData,
    staleTime: 30_000,
    retry: 2,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    setLoading(isLoading)

    if (error) {
      setTransactions([])
      return
    }

    if (data) {
      setTransactions(data)
      setFilters(params)
    }
  }, [data, isLoading, error, setLoading, setTransactions, setFilters, params])
}
