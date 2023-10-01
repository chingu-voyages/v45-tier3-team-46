import { configureStore } from "@reduxjs/toolkit"
import NotificationsReducer from "./notificationsReducer"

const store = configureStore({
  reducer: {
    notifications: NotificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store