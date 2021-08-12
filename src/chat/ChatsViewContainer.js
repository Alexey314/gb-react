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
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";

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

  const [chatList, setChatList] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const [messageList, setMessageList] = useState([]);
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
          setCurrentChatId(() => safeUrlChatId);
        }
      } else {
        // console.log("222");
        history.replace(getChatUrlById(currentChatId));
      }
    } else if (currentChatId != null) {
      // console.log("333");
      history.replace(getChatUrlById(currentChatId));
    }
  }, [urlChatIdProvided, safeUrlChatId, currentChatId, chatList, history]);

  const onSendUserMessage = useCallback(
    (text) => {
      const date = new Date();
      const newMsg = {
        author: String(name),
        text,
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString(),
      };
      firebase.database().ref("chat").child(currentChatId).push(newMsg);
    },
    [currentChatId, name]
  );

  const handleChatSelect = useCallback(
    (id) => {
      setCurrentChatId(() => id);
      goToChatUrlById(id);
    },
    [goToChatUrlById]
  );

  useEffect(() => {
    firebase
      .database()
      .ref("chatList")
      .on("value", (snapshot) => {
        const newChatList = [];
        snapshot.forEach((entry) => {
          newChatList.push({ id: entry.key, ...entry.val() });
        });
        setChatList(newChatList);
        setCurrentChatId(() => (newChatList.length ? newChatList[0].id : null));
      });
  }, []);

  useEffect(() => {
    if (currentChatId) {
      firebase
        .database()
        .ref("chat")
        .child(currentChatId)
        .on("value", (snapshot) => {
          const newMsgList = [];
          snapshot.forEach((entry) => {
            newMsgList.push({ id: entry.key, ...entry.val() });
          });
          setMessageList(() => newMsgList);
        });
    }
  }, [currentChatId]);

  const onAddNewChat = useCallback(() => {
    firebase
      .database()
      .ref("chatList")
      .child(`Chat_${Date.now()}_${chatList.length + 1}`)
      .child("name")
      .set(`Chat ${chatList.length + 1}`);
  }, [chatList.length]);

  const onDelCurrentChat = useCallback(() => {
    firebase.database().ref("chatList").child(currentChatId).remove();
  }, [currentChatId]);

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
