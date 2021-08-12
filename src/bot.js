export const BOT_NAME = "Alice";

export function getBotAnswer(msg) {
  const date = new Date();
  return {
    author: BOT_NAME,
    text: `Welcome, ${msg.author}!`,
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString(),
  };
}
