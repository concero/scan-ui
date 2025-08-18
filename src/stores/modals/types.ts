import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'

export type ModalId = string

export type ModalsStateSlice = {
	modals: Record<ModalId, boolean>
}

export type ModalsActions = {
	toggleModal: (id: ModalId) => void
}

export type ModalsState = ModalsStateSlice & ModalsActions
export type ModalsStore = UseBoundStoreWithEqualityFn<StoreApi<ModalsState>>
