import type { UseBoundStoreWithEqualityFn } from 'zustand/traditional'
import type { StoreApi } from 'zustand'

export type Theme = 'light' | 'dark';

export type SettingsStateSlice = {
	theme: Theme;
}

export type SettingsActions = {
	setTheme: (theme: Theme) => void;
	resetSettings: () => void;
}

export type SettingsState = SettingsStateSlice & SettingsActions
export type SettingsStore = UseBoundStoreWithEqualityFn<StoreApi<SettingsState>>