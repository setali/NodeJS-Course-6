import React from "react";
import { Button, Form, Input, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import request from "../../utils/request";
import { useNavigate } from "react-router";

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
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Text"
        name="text"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
