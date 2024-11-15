import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router";
import request from "../../utils/request";
import Uploader from "../utils/Uploader";

export default function Add() {
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (data) => {
      request.post("/article", data);
    },
  });

  const onFinish = (values) => {
    console.log("Success:", values);
    mutateAsync(values)
      .then(() => navigate("/article"))
      .catch((err) => message.error("Error!"));
  };

  return (
    <Form name="basic" onFinish={onFinish}>
      <Form.Item label="Title" name="title">
        <Input />
      </Form.Item>

      <Form.Item label="Text" name="text">
        <Input.TextArea />
      </Form.Item>

      <Uploader />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
