const selectChatList = (state) => state.chatList.chats;
const selectCurrentChatId = (state) => state.chatList.currentChatId || null;

export { selectChatList, selectCurrentChatId };
