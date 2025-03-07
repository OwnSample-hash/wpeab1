import { useEffect, useState } from "react";
import Nav from "../nav";
import useWebSocket, { ReadyState } from "react-use-websocket";
import MsgRender from "./MessageRenderer";

function Chat() {
  const URL = "ws://127.0.0.1:8080/echo";
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState("");
  const { sendMessage, lastMessage, readyState } = useWebSocket(URL);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => {
        if (lastMessage.data.includes("Request served by")) {
          return prev;
        }
        console.log("LastMsg: ", lastMessage.data);
        return prev.concat(lastMessage.data);
      });
    }
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
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
        <span>The WebSocket is currently {connectionStatus}</span>
        <div className="flex flex-col w-11/12 md:w-1/2 bg-gray-700 p-2 overflow-y-auto h-[75vh]">
          {messageHistory.map((data, idx) => (
            <div className="flex" key={idx}>
              <MsgRender raw={data} key={idx} />
            </div>
          ))}
        </div>
        <div>
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
      </div>
    </div>
  );
}

export default Chat;
