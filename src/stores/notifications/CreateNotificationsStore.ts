import type { NotificationState, NotificationStore } from './types'
import { createWithEqualityFn } from 'zustand/traditional'

export const CreateNotificationStore = (): NotificationStore =>
  createWithEqualityFn<NotificationState>(
    (set) => ({
      message: null,
      visible: false,

      show: (message) =>
        set(() => ({
          message,
          visible: true,
        })),

      hide: () =>
        set(() => ({
          visible: false,
        })),

      clear: () =>
        set(() => ({
          message: null,
          visible: false,
        })),
    }),
    Object.is,
  )