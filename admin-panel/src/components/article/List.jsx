import { useQuery } from "@tanstack/react-query";
import { Result, Table } from "antd";
import React, { useState } from "react";
import request from "../../utils/request";
import { EyeOutlined, EditOutlined, DeleteFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Author",
    dataIndex: "user",
    key: "user",
    render: (el) => el.username,
  },
  {
    key: "action",
    render: (_, r) => (
      <span style={{ display: "flex", gap: "8px" }}>
        <Link to={`/article/${r.id}`}>
          <EyeOutlined />
        </Link>
        <Link to={`/article/${r.id}/edit`}>
          <EditOutlined />
        </Link>
        <DeleteFilled style={{ color: "red" }} />
      </span>
    ),
  },
];

export default function List() {
  const [page, setPage] = useState(1);

  const { isFetching, error, data } = useQuery({
    queryKey: ["articles", page],
    queryFn: () =>
      request("/article", { params: { page } }).then(({ data }) => data),
    initialData: { items: [], totals: 0, page: 0, limit: 0 },
  });

  const handleTableChange = ({ current }) => setPage(current);

  if (error) {
    return (
      <Result
        status={error?.status}
        title={error?.status}
        subTitle="Sorry, something went wrong."
      />
    );
  }
  return (
    <Table
      dataSource={data.items}
      columns={columns}
      rowKey={"id"}
      loading={isFetching}
      onChange={handleTableChange}
      pagination={{
        total: data.totals,
        current: data.page,
        pageSize: data.limit,
      }}
    />
  );
}
