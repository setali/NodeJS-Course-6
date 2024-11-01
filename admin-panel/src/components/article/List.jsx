import { useMutation, useQuery } from "@tanstack/react-query";
import { message, Popconfirm, Result, Table } from "antd";
import React, { useState } from "react";
import request from "../../utils/request";
import { EyeOutlined, EditOutlined, DeleteFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function List() {
  const [page, setPage] = useState(1);

  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ["articles", page],
    queryFn: () =>
      request("/article", { params: { page } }).then(({ data }) => data),
    initialData: { items: [], totals: 0, page: 0, limit: 0 },
  });

  const { mutateAsync: removeArticle } = useMutation({
    mutationFn: (id) => {
      return request.delete(`/article/${id}`);
    },
  });

  function remove(id) {
    removeArticle(id)
      .then(({ data: article }) => {
        refetch();
        message.success(`Article "${article.title}" deleted`);
      })
      .catch((err) => message.error("Error"));
  }

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
          <Popconfirm
            title="Delete the article"
            description="Are you sure to delete this article?"
            onConfirm={() => remove(r.id)}
          >
            <DeleteFilled style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </span>
      ),
    },
  ];

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
