import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import AdminOrderDetails from "./order-details";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetAdminOrderDetails,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

const statusColors = {
  delivered: "bg-green-500 hover:bg-green-600 text-black",
  confirmed: "bg-green-400 hover:bg-green-500",
  rejected: "bg-red-600 hover:bg-red-800",
  inShipping: "bg-violet-400 hover:bg-violet-500",
  shipped: "bg-blue-500 hover:bg-blue-600",
  packaging: "bg-purple-500 hover:bg-purple-600",
  inProcess: "bg-teal-500 hover:bg-teal-600",
  "in packaging": "bg-orange-400",
  pending: "bg-yellow-400 hover:bg-yellow-500 text-black",
};

function AdminOrdersView() {
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  // console.log(orderDetails, "orderDetailsForAdmin");

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders:</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList && orderList.length > 0
              ? orderList.map((orderItem) => {
                  const itemBadgeColor =
                    statusColors[orderItem?.orderStatus] || "bg-gray-300";

                  return (
                    <TableRow key={orderItem._id}>
                      <TableCell>{orderItem?._id}</TableCell>
                      <TableCell>
                        {orderItem?.orderDate.split("T")[0]}
                      </TableCell>
                      <TableCell>
                        <Badge className={`py-2 px-2  ${itemBadgeColor} `}>
                          {orderItem?.orderStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>$ {orderItem?.totalAmount}</TableCell>
                      <TableCell>
                        <Dialog
                          open={openDetailsDialog}
                          onOpenChange={() => {
                            setOpenDetailsDialog(false);
                            dispatch(resetAdminOrderDetails());
                          }}
                        >
                          <Button
                            onClick={() =>
                              handleFetchOrderDetails(orderItem?._id)
                            }
                          >
                            View Details
                          </Button>
                          <AdminOrderDetails orderDetails={orderDetails} />
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  );
                })
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default AdminOrdersView;
