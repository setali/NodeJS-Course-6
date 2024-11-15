import React from "react";
import { Button, Form, Input, message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import request from "../../utils/request";
import { useNavigate, useParams } from "react-router";
import Loading from "../general/Loading";
import Uploader from "../utils/Uploader";

export default function Edit() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["article", id],
    queryFn: () => request(`/article/${id}`).then(({ data }) => data),
  });

  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: (values) => {
      return request.put(`/article/${data.id}`, values);
    },
  });

  const onFinish = (values) => {
    console.log("Success:", values);
    mutateAsync(values)
      .then(() => navigate("/article"))
      .catch((err) => message.error("Error!"));
  };

  if (isLoading) return <Loading />;

  return (
    <Form name="basic" onFinish={onFinish} initialValues={data}>
      <Form.Item label="Title" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Text" name="text" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>

      <Uploader required defaultFile={data.image} />

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
