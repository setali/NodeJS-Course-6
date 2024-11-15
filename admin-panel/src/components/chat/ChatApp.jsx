import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";
import "./chat.css";
import ChatEmpty from "./ChatEmpty";
import { useQuery } from "@tanstack/react-query";
import Loading from "../general/Loading";
import request from "../../utils/request";
import { getToken } from "../../utils/tools";
import { BASE_DOMAIN } from "../../utils/constants";

const socket = io(BASE_DOMAIN, {
  extraHeaders: {
    authorization: `bearer ${getToken()}`,
  },
});

export default function ChatApp() {
  const [channel, setChannel] = useState();

  const { isLoading, data: users } = useQuery({
    queryKey: ["people"],
    queryFn: () => request("/person").then(({ data }) => data),
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="chat-app">
        <div className="users">
          {users.map((user) => (
            <div
              className={`user ${user.id === channel?.id ? "active" : ""}`}
              key={user.id}
              onClick={() => setChannel(user)}
            >
              {user.username}
            </div>
          ))}
        </div>
        {channel ? (
          <Chat key={channel.id} socket={socket} channel={channel} />
        ) : (
          <ChatEmpty />
        )}
      </div>
    </div>
  );
}
