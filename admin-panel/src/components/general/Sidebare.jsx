import React from "react";
import {
  SettingOutlined,
  DashboardOutlined,
  EditOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const items = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <Link to="/">
        <DashboardOutlined />
      </Link>
    ),
  },
  {
    key: "chat",
    label: "Chat",
    icon: (
      <Link to="/chat">
        <PaperClipOutlined />
      </Link>
    ),
  },
  {
    key: "articles",
    label: "Articles",
    icon: <EditOutlined />,
    children: [
      {
        key: "article-list",
        label: <Link to={"/article"}>List</Link>,
      },
      {
        key: "article-add",
        label: <Link to={"/article/add"}>Create Article</Link>,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    key: "sub4",
    label: "Navigation Three",
    icon: <SettingOutlined />,
    children: [
      {
        key: "9",
        label: "Option 9",
      },
      {
        key: "10",
        label: "Option 10",
      },
      {
        key: "11",
        label: "Option 11",
      },
      {
        key: "12",
        label: "Option 12",
      },
    ],
  },
];
export default function Sidebar() {
  const onClick = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: "100%",
      }}
      defaultSelectedKeys={["dashboard"]}
      defaultOpenKeys={["articles"]}
      mode="inline"
      theme="dark"
      items={items}
    />
  );
}
