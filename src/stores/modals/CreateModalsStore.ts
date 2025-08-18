import type { ModalsState } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateModalsStore = () =>
  createWithEqualityFn<ModalsState>(
    set => ({
      modals: {},

      toggleModal: (id: string) => {
        set(state => {
          const isOpen = !!state.modals[id]
          return {
            modals: {
              ...state.modals,
              [id]: !isOpen,
            },
          }
        })
      },
    }),
    Object.is,
  )
