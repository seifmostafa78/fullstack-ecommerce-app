import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productsColumns, userColumns } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useUsersQuery } from "../../redux/features/user/userApiSlice";
import {
  useDeleteProductMutation,
  useProductsQuery,
} from "../../redux/features/product/productApiSlice";
import { toast } from "sonner";

const Datatable = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data: users } = useUsersQuery();
  const { data: products } = useProductsQuery();
  const [deleteProduct, { isLoading: loadingProduct }] =
    useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (path === "products") {
      try {
        const { data } = await deleteProduct(id);
        toast.success(data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 165,
      headerClassName: "header-style",
      renderCell: (params) => {
        return (
          <div className="data-table__cell-action">
            <Link
              to={`/${path === "users" ? "users" : "products"}/${
                params.row._id
              }`}
              style={{ textDecoration: "none" }}
            >
              <button className="data-table__btn data-table__btn--view">
                View
              </button>
            </Link>
            <button
              onClick={() => handleDelete(params.row._id)}
              disabled={loadingProduct}
              className="data-table__btn data-table__btn--delete"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <section className="data-table" aria-labelledby="table-title">
      <header className="data-table__header">
        <h2 id="table-title" className="data-table__title">
          {path === "users" ? "Users List" : "Products List"}
        </h2>
        <nav className="data-table__nav">
          <Link
            to={path === "users" ? "/users/new" : "/products/new"}
            className="link"
          >
            Add New {path === "users" ? "User" : "Product"}
          </Link>
        </nav>
      </header>

      <div className="data-table__content">
        <DataGrid
          className="dataGrid"
          rows={path === "users" ? users : products}
          columns={
            path === "users"
              ? userColumns.concat(actionColumn)
              : productsColumns.concat(actionColumn)
          }
          getRowId={(row) => row._id}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableColumnResize
        />
      </div>
    </section>
  );
};

export default Datatable;
