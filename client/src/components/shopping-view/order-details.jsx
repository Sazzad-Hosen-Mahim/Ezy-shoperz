import { Separator } from "@radix-ui/react-select";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";

const statusColors = {
  delivered: "bg-green-500 hover:bg-green-600 text-black",
  confirmed: "bg-green-400 hover:bg-green-500",
  rejected: "bg-red-600 hover:bg-red-800",
  inShipping: "bg-violet-400 hover:bg-violet-500",
  shipped: "bg-blue-500 hover:bg-blue-600",
  packaging: "bg-purple-500 hover:bg-purple-600",
  inProcess: "bg-teal-500 hover:bg-teal-600",
  inPackaging: "bg-orange-400",
  pending: "bg-yellow-400 hover:bg-yellow-500 text-black",
};

function ShoppingOrderDetails({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  const badgeColor =
    statusColors[orderDetails?.orderStatus] || "bg-gray-400 text-black";
  // console.log(orderDetails, "mahim");
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium">Order ID</p>
            <Label>{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Date</p>
            <Label>{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Price</p>
            <Label>${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment method</p>
            <Label>{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Payment Status</p>
            <Label>{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium">Order Status</p>
            <Label>
              <Badge className={`py-1 px-3 ${badgeColor}`}>
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li
                      key={item?.productId}
                      className="flex items-center justify-between"
                    >
                      <span>Title: {item.title}</span>
                      <span>Quantity: {item.quantity}</span>
                      <span>Price: ${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>{user.userName}</span>
              <span>{user.email}</span>
              <span>{orderDetails?.addressInfo?.address}</span>
              <span>{orderDetails?.addressInfo?.city}</span>
              <span>{orderDetails?.addressInfo?.pincode}</span>
              <span>{orderDetails?.addressInfo?.phone}</span>
              <span>{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetails;
