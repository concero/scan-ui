import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

type Config<T> = {
  [K in keyof T]: {
    defaultValue: T[K]
    parse?: (val: string | null) => T[K]
    validate?: (val: T[K]) => boolean
  }
}

export const useQueryParams = <T extends Record<string, any>>(cfg: Config<T>): [T, (p: Partial<T>) => void] => {
  const [search, setSearch] = useSearchParams()

  const params = Object.entries(cfg).reduce((acc, [key, { defaultValue, parse, validate }]) => {
    const raw = search.get(key)
    let val = parse ? parse(raw) : (raw as any)
    if (val === null || val === undefined || (validate && !validate(val))) {
      val = defaultValue
    }
    return { ...acc, [key]: val }
  }, {} as T)

  const setParams = (p: Partial<T>) => {
    const ns = new URLSearchParams(search)
    Object.entries(p).forEach(([k, v]) => {
      if (v === undefined || v === null || v === '') {
        ns.delete(k)
      } else {
        ns.set(k, String(v))
      }
    })
    setSearch(ns)
  }

  useEffect(() => {
    const toNormalize = Object.entries(params).reduce((acc, [k, v]) => {
      const current = search.get(k)
      if (current !== String(v)) {
        return { ...acc, [k]: v }
      }
      return acc
    }, {} as Partial<T>)

    if (Object.keys(toNormalize).length > 0) {
      setParams(toNormalize)
    }
  }, [params, search, setParams])

  return [params, setParams]
}
