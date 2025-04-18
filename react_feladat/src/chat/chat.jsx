import { useEffect, useState, useCallback } from "react";
import Nav from "../nav";
import useWebSocket, { ReadyState } from "react-use-websocket";
import MsgRender from "./MessageRenderer";

function Chat() {
  const [URL, SetURL] = useState("ws://127.0.0.1:8080/echo");
  const [socketUrl, setSocketUrl] = useState("ws://127.0.0.1:8080/echo");
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState("");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: console.log,
    onClose: console.log,
    shouldReconnect: (_) => true,
  });

  const handleClickChangeSocketUrl = useCallback(() => setSocketUrl(URL), []);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => {
        if (lastMessage.data.includes("Request served by")) {
          return prev;
        }
        console.log("LastMsg: ", lastMessage.data);
        let data = JSON.parse(lastMessage.data);
        data.time = new Date().getTime();
        return prev.concat(JSON.stringify(data));
      });
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Csatlakozás",
    [ReadyState.OPEN]: "Kapcsolódva",
    [ReadyState.CLOSING]: "Zárás",
    [ReadyState.CLOSED]: "Zárva",
    [ReadyState.UNINSTANTIATED]: "Nincs kapcsolat",
  }[readyState];

  function send() {
    if (message === "") {
      return;
    }
    sendMessage(
      JSON.stringify({
        msg: message,
        time: new Date().getTime(),
        isSelf: false,
      })
    );
    setMessageHistory((prev) =>
      prev.concat(
        JSON.stringify({
          msg: message,
          time: new Date().getTime(),
          isSelf: true,
        })
      )
    );
    setMessage("");
    document.getElementById("prompt").value = "";
  }

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-center ">
        <span>A WebSocket állapota: {connectionStatus}</span>
        <div className="flex flex-col w-11/12 md:w-1/2 bg-gray-700 p-2 overflow-y-auto h-[75vh]">
          {messageHistory.map((data, idx) => (
            <div className="flex my-2" key={idx}>
              <MsgRender raw={data} />
            </div>
          ))}
        </div>
        <div className="my-2">
          <input
            type="text"
            id="prompt"
            className="bg-gray-500 rounded p-0.5 mx-2"
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                send();
              }
            }}
          />
          <button
            className="bg-gray-500 rounded p-0.5"
            disabled={readyState !== ReadyState.OPEN}
            onClick={() => send()}
          >
            Send
          </button>
        </div>
        <div>
          <input
            type="text"
            className="bg-gray-500 rounded p-0.5 mx-2"
            value={URL}
            onChange={(e) =>
              e.key === "Enter"
                ? handleClickChangeSocketUrl()
                : SetURL(e.target.value)
            }
          />
          <button
            className="bg-gray-900 rounded p-0.5 hover:bg-gray-500"
            onClick={handleClickChangeSocketUrl}
          >
            Change Socket URL
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
