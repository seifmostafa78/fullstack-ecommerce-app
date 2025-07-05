import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useOrdersQuery } from "../../redux/features/order/orderApiSlice";
import { formatAddress, formatDate } from "../../lib/formatters";

const List = () => {
  const { data: orders } = useOrdersQuery();
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">Products</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Address</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders &&
            orders.length > 0 &&
            [...orders]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((order) => (
                <TableRow key={order._id}>
                  <TableCell component="th" scope="row" className="tableCell">
                    {order._id.slice(-8)}
                  </TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">{order.products.length}</div>
                  </TableCell>
                  <TableCell className="tableCell">
                    {order.userId.slice(-8)}
                  </TableCell>
                  <TableCell className="tableCell">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="tableCell">${order.amount}</TableCell>
                  <TableCell className="tableCell">
                    {formatAddress(order.address)}
                  </TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${order.status}`}>
                      {order.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
