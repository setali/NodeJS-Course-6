import { Result } from "antd";
import React from "react";

export default function Error({ status, title, subtitle }) {
  return <Result status={status} title={title} subTitle={subtitle} />;
}
