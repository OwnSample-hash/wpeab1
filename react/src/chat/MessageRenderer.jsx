export default function MsgRender({ raw }) {
  console.log(raw);
  let data = JSON.parse(raw);
  if (data.isSelf) {
    return (
      <div className="justify-end ml-auto text-right msg-box">{data.msg}</div>
    );
  } else {
    return <div className="text-white msg-box">{data.msg}</div>;
  }
}
