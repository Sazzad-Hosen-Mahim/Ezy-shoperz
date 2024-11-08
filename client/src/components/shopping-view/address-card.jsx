import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

function AddressCard({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId,
}) {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`${
        selectedId?._id === addressInfo?._id
          ? "border-blue-500 shadow-xl border-[2px]"
          : ""
      }  flex flex-col justify-between h-full`}
    >
      <CardContent
        className={`${
          selectedId === addressInfo?._id ? "" : ""
        } grid gap-4 p-3 `}
      >
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pin Code: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>

      <CardFooter className="p-1 flex justify-start gap-3 mt-auto">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
}

export default AddressCard;
