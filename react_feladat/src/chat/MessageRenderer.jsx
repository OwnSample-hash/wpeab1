export default function MsgRender({ raw }) {
  let data = JSON.parse(raw);
  let time = new Date(data.time).toLocaleTimeString();
  if (data.isSelf) {
    return (
      <div className="justify-end text-right ml-auto">
        <span className="text-gray-400 mr-2 justify-end text-right">
          {time}
        </span>
        <span className=" msg-box">{data.msg}</span>
      </div>
    );
  } else {
    return (
      <div className="">
        <span className=" msg-box">{data.msg}</span>
        <span className="text-gray-400 ml-2 justify-end text-right">
          {time}
        </span>
      </div>
    );
  }
}
