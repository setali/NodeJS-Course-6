import { Button, Form, Input, message, Space } from "antd";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getUserInfo } from "../../utils/tools";
import request from "../../utils/request";

const { useForm } = Form;

export default function Chat({ socket, channel }) {
  const [form] = useForm();
  const [messages, setMessages] = useState([]);
  const user = useMemo(() => getUserInfo(), []);
  const listRef = useRef();
  const wrapperRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMessages();
    socket.on("message", (data) => {
      setMessages((s) => [...s, data]);
    });
  }, []);

  useLayoutEffect(() => {
    listRef.current.scrollIntoView();
  }, [messages[messages.length - 1]]);

  console.log(messages);

  function loadMessages() {
    if (loading) return;

    const prevScrollHeight = wrapperRef.current.scrollHeight;

    setLoading(true);
    request("/message", {
      params: { channel: channel.id, lastMessage: messages[0]?.id },
    }).then(({ data }) => {
      setMessages((s) => [...data.reverse(), ...s]);

      setTimeout(() => {
        wrapperRef.current.scrollTop =
          wrapperRef.current.scrollHeight - prevScrollHeight;
        setLoading(false);
      }, 0);
    });
  }

  function handleSubmit({ message }) {
    socket.emit("message", { message, from: user.id, to: channel.id });
    form.resetFields();
  }

  function handleScroll(e) {
    if (e.target.scrollTop === 0) {
      loadMessages();
    }
  }

  return (
    <div className="chat-box">
      <div className="message-wrapper" ref={wrapperRef} onScroll={handleScroll}>
        <ul className="messages-list">
          {messages.map((message) => (
            <li
              key={message.id}
              className={`message ${message.from === user.id ? "owner" : ""}`}
            >
              <div className="text">{message.message}</div>
              <div className="time">{message.createdAt}</div>
            </li>
          ))}
          <li ref={listRef}></li>
        </ul>
      </div>
      <Form onFinish={handleSubmit} form={form}>
        <Space.Compact className="chat-form">
          <Form.Item
            name="message"
            className="chat-input"
            rules={[{ required: true }]}
          >
            <Input autoFocus />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Send
            </Button>
          </Form.Item>
        </Space.Compact>
      </Form>
    </div>
  );
}
