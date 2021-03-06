import { useCallback, useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  chatListAddChat,
  chatListRemoveChat,
  // chatListRenameChat,
  chatListSelectChat,
} from "../chatList/state/chatListActions";
import { chatSendMessage } from "../chat/state/chatActions";
import { selectChatMessages } from "../store/chatReducer/selectors";
import { selectChatList } from "../store/chatListReducer/selectors";
import { selectProfile } from "../store/profileReducer/selectors";
import ChatsView from "./ChatsView";

const getChatUrlById = (id) => {
  return id != null ? `/chats/${id}` : "/chats";
};

export default function ChatsViewContainer() {
  const { chatId: urlChatId } = useParams();
  const history = useHistory();
  const goToChatUrlById = useCallback(
    (id) => {
      history.replace(getChatUrlById(id));
    },
    [history]
  );
  const dispatch = useDispatch();
  const { chats: chatList, currentChatId } = useSelector(selectChatList);
  const messageList = useSelector(selectChatMessages);
  const { name } = useSelector(selectProfile);

  const urlChatIdProvided = useMemo(
    () => typeof urlChatId !== "undefined" && String(urlChatId) !== "",
    [urlChatId]
  );
  const safeUrlChatId = useMemo(
    () => (urlChatIdProvided ? String(urlChatId) : null),
    [urlChatIdProvided, urlChatId]
  );

  // initial chat selection
  useEffect(() => {
    // console.log({ urlChatIdProvided, safeUrlChatId, currentChatId });
    if (urlChatIdProvided) {
      const referredChatExist = chatList.some(
        (chat) => chat.id === safeUrlChatId
      );
      if (referredChatExist) {
        if (safeUrlChatId !== currentChatId) {
          // console.log("111");
          dispatch(chatListSelectChat(safeUrlChatId));
        }
      } else {
        // console.log("222");
        history.replace(getChatUrlById(currentChatId));
      }
    } else if (currentChatId != null) {
      // console.log("333");
      history.replace(getChatUrlById(currentChatId));
    }
  });

  const onSendUserMessage = useCallback(
    (text) => {
      const date = new Date();
      const newMsg = {
        author: String(name),
        text,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };
      dispatch(chatSendMessage(currentChatId, newMsg));
    },
    [dispatch, currentChatId, name]
  );

  const handleChatSelect = useCallback(
    (id) => {
      dispatch(chatListSelectChat(id));
      goToChatUrlById(id);
    },
    [dispatch, goToChatUrlById]
  );

  const onAddNewChat = useCallback(() => {
    dispatch(chatListAddChat(`Chat ${chatList.length + 1}`));
  }, [dispatch, chatList.length]);

  const onDelCurrentChat = useCallback(() => {
    dispatch(chatListRemoveChat(currentChatId));
  }, [dispatch, currentChatId]);

  return ChatsView({
    chatList,
    currentChatId,
    handleChatSelect,
    onAddNewChat,
    onDelCurrentChat,
    messageList,
    onSendUserMessage,
  });
}
