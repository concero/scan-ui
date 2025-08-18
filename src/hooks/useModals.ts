import type { ModalsState } from '@/stores' 
import { useContext } from 'react'
import { ModalsContext } from '@/stores' 

export type UseModalsStoreResult = {
  toggleModal: ModalsState['toggleModal']
  isModalOpen: (id: string) => boolean
}

export const useModalsStore = (): UseModalsStoreResult => {
  const useStore = useContext(ModalsContext)

  if (!useStore) {
    throw new Error('useModalsStore must be used inside <ModalsStoreProvider>.')
  }

  return {
    toggleModal: useStore(state => state.toggleModal),
    isModalOpen: useStore(state => (id: string) => !!state.modals[id]),
  }
}
