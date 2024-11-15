import Message from "./models/message";

const map = new Map();

export default function chat(socket, io) {
  const { user } = socket.request;

  setSocketId();

  socket.on("message", (data) => {
    console.log(data);

    const message = new Message(data);
    message.save();

    socket.to(getSocketId(data.to)).emit("message", message);
    socket.emit("message", message);
  });

  socket.on("disconnect", () => {
    removeSocketId();
  });
  console.log(map);

  function getSocketId(id) {
    return map.get(id);
  }

  function setSocketId() {
    map.set(user?.id, socket.id);
  }

  function removeSocketId() {
    map.delete(user.id);
  }
}
