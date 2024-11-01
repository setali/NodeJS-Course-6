import { Button, Form, Input, message } from "antd";
import { requestWithoutToken } from "../../utils/request";
import { setRefreshToken, setToken } from "../../utils/tools";

export default function Login({ getUser }) {
  const onFinish = (values) => {
    requestWithoutToken
      .post("/login", values)
      .then(({ data }) => {
        setToken(data.accessToken);
        setRefreshToken(data.refreshToken);
        getUser();
      })
      .catch(({ response }) => {
        message.error(response.data.message);
      });
  };

  return (
    <div style={{ width: "480px", margin: "auto" }}>
      <Form name="basic" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
