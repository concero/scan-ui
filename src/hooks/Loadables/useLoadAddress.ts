import { useParams } from "react-router-dom"
import { isAddress } from "viem"
import { useAddressStore } from "../useAddressStore"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { useQueryParams } from "../useQueryParams"
import { Status, TransactionType } from "@/types"
import type { AddressTxFilters } from "@/stores"

export const useLoadAddress = () => {
  const { address } = useParams<{ address: string }>()
  const { setTransactions, setFilters, setLoading } = useAddressStore()

  const [params] = useQueryParams<AddressTxFilters>({
    page: {
      defaultValue: 1,
      parse: (v) => (v ? parseInt(v, 10) : 1),
      validate: (v) => v !== undefined && Number.isInteger(v) && v > 0,
    },
    fromTime: {
      defaultValue: undefined,
      parse: (v) => (v ? parseInt(v, 10) : undefined),
      validate: (v) => v === undefined || Number.isInteger(v),
    },
    toTime: {
      defaultValue: undefined,
      parse: (v) => (v ? parseInt(v, 10) : undefined),
      validate: (v) => v === undefined || Number.isInteger(v),
    },
    status: {
      defaultValue: undefined,
      parse: (v) => (v && v in Status ? (Status as any)[v] : undefined),
      validate: (v) => v === undefined || Object.values(Status).includes(v),
    },
    type: {
      defaultValue: undefined,
      parse: (v) => (v && v in TransactionType ? (TransactionType as any)[v] : undefined),
      validate: (v) => v === undefined || Object.values(TransactionType).includes(v),
    },
  })

  const page = params.page

  const getData = async () => {
    if (!address || !isAddress(address)) {
      return []
    }
    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["addressTxs", address, params],
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
