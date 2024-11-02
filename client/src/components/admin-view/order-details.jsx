import { Separator } from "@radix-ui/react-select";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import CommonForm from "../common/form";
import { useState } from "react";

const initialFormData = {
  status: "",
};

function AdminOrderDetails() {
  const [formData, setFormData] = useState(initialFormData);

  function handleUpdateStatus(e) {
    e.preventDefault();
  }
  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-5">
            <p className="font-medium">Order ID</p>
            <Label>12345</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>12/34/2025</Label>
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="font-medium">Price</p>
            <Label>$ 12345</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>In Process</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product One</span>
                <span>$ 100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4 ">
          <div className="grid gap-2">
            <div className="font-medium">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>John Doe</span>
              <span>Address</span>
              <span>City</span>
              <span>Pin Code</span>
              <span>Phone</span>
              <span>Notes</span>
            </div>
          </div>
        </div>

        <section>
          <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "packaging", label: "In Packaging" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "shipped", label: "Shipped" },
                  { id: "rejected", label: "Rejected" },
                  { id: "delivered", label: "Delivered" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus}
          />
        </section>
      </div>
    </DialogContent>
  );
}

export default AdminOrderDetails;
