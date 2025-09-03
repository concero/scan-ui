import type { AddressStore } from './types'
import { createContext } from 'react'

export const AddressContext = createContext<AddressStore | null>(null)
