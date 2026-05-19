import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  rooms: [],
  activeRoom: null,
  messages: [],
};
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.activeRoom = null;
      localStorage.removeItem("token");
    },
    addRoom: (state, action) => {
  const exists = state.rooms.find(
    (room) =>
      room.id === action.payload.id
  );
  if (!exists) {
    state.rooms.push(
      action.payload
    );
  }
},
    setActiveRoom: (state, action) => {
      state.activeRoom = action.payload;
    },
    sendMessage: (state, action) => {
      const exists = state.messages.find(
        (msg) => msg.id === action.payload.id
      );
      if (!exists) {
        state.messages.push(action.payload);
      }
    },

    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setRooms: (state, action) => {
      state.rooms = action.payload;
    },
    deleteMessage: (state, action) => {
  state.messages = state.messages.filter(
    (msg) => msg.id !== action.payload
  );
},
  },

});
export const {
  setUser,
  logout,
  addRoom,
  setActiveRoom,
  sendMessage,
  setMessages,
  setRooms,
  deleteMessage,
} = chatSlice.actions;
export default chatSlice.reducer;