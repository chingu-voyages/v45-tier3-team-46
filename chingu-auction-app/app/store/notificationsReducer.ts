import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Notification {
  id: string
  message: string
}

interface NotificationsState {
  notifications: Notification[]
}

const initialState: NotificationsState = {
  notifications: []
}

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    resetNotifications: (state) => {
      state.notifications = []
    },
    addNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = [...state.notifications, ...action.payload]
      console.log(state.notifications)
    },
  },
})

export const { resetNotifications, addNotifications } = notificationsSlice.actions
export default notificationsSlice.reducer