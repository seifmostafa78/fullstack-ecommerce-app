import { formatDate } from "./lib/formatters";

export const userColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 230,
    headerClassName: "header-style",
  },
  {
    field: "email",
    headerName: "Email",
    width: 210,
    headerClassName: "header-style",
  },
  {
    field: "first_name",
    headerName: "First Name",
    width: 120,
    headerClassName: "header-style",
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 120,
    headerClassName: "header-style",
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    headerClassName: "header-style",
    renderCell: (params) => {
      return <span>{formatDate(params.row.createdAt)}</span>;
    },
  },
];

export const productsColumns = [
  {
    field: "_id",
    headerName: "ID",
    width: 290,
    headerClassName: "header-style",
  },
  {
    field: "product",
    headerName: "Product",
    width: 290,
    headerClassName: "header-style",
    renderCell: (params) => {
      return (
        <div className="cellImgContainer">
          <img src={params.row.img} alt="avatar" className="cellImg" />
          {params.row.title}
        </div>
      );
    },
  },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    headerClassName: "header-style",
    renderCell: (params) => {
      return <span>${params.row.price}</span>;
    },
  },
  {
    field: "inStock",
    headerName: "Stock",
    width: 150,
    headerClassName: "header-style",
  },
];
