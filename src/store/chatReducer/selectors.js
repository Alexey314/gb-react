const selectChatMessages = ({ chatList: { currentChatId }, chat }) => {
  if (
    currentChatId === "undefined" ||
    chat === "undefined" ||
    !chat.hasOwnProperty(currentChatId)
  ) {
    return [];
  } else {
    return chat[currentChatId];
  }
};

export { selectChatMessages };
