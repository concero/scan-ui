import type { SettingsState } from './types'
import type { StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createWithEqualityFn } from 'zustand/traditional'

export const defaultTheme = 'light';

export const CreateSettingsStore = () =>
   createWithEqualityFn<SettingsState>(
	   persist(
		   set => ({
			   theme: defaultTheme,
			   setTheme: (theme: 'light' | 'dark') => set({ theme }),
			   resetSettings: () => set({ theme: defaultTheme }),
		   }),
		   {
			   name: 'concero-scan-settings',
			   version: 1,
			   storage: createJSONStorage(() => localStorage),
			   partialize: state => ({
				   theme: state.theme,
			   }),
		   },
	   ) as StateCreator<SettingsState, [], [], SettingsState>,
	   Object.is,
   )