import React, { useEffect } from "react";
import { Space, Table, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Iproduct } from "../../interface/Iproduct";
import { Icategory } from "../../interface/Icategory";
import { Link } from "react-router-dom";
import { getAllProduct } from "../../api/ApiProduct";
interface ProductManager {
  product: Iproduct[];
  category: Icategory[];
  delete: (id: string) => void;
  setProduct: any;
}
const ProductManager = (props: ProductManager) => {
  // render lại
  useEffect(() => {
    getAllProduct().then(({ data }) => {
      const dataProduct = data.product;
      props.setProduct(dataProduct.docs);
    });
  });
  const columns: ColumnsType<Iproduct> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="Avatar" style={{ width: 50 }} />,
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    {
      title: "Link",
      dataIndex: "linkFilm",
      key: "linkFilm",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (categoryId) => {
        const cate = props.category.find((item) => item._id === categoryId);
        return cate ? cate.name : "--";
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" danger>
            <Link to={`update/${record._id}`}>EDIT</Link>
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => props.delete(record._id)}
          >
            REMOVE
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender: (record) => (
          <p style={{ margin: 0, textAlign: "justify" }}>
            {record.description}
          </p>
        ),
        // rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={props.product}
      pagination={{ pageSize: 4 }}
    />
  );
  //
};

export default ProductManager;
