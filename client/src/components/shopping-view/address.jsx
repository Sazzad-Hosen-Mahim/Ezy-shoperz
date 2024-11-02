import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  fetchAddress,
  updateAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { toast } from "react-toastify";

const initialAddressFormData = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

function Address() {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const handleManageAddress = (e) => {
    e.preventDefault();

    if (addressList.length >= 3 && currentEditedId === null) {
      toast.error("You can't add more than 3 addresses");
      setFormData(initialAddressFormData);
      return;
    }

    currentEditedId !== null
      ? dispatch(
          updateAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData,
          })
        ).then((data) => {
          if (data.payload.success) {
            dispatch(fetchAddress(user?.id));
            setCurrentEditedId(null);
            setFormData(initialAddressFormData);
            toast("Address updated successfully!");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          //  console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAddress(user?.id));
            setFormData(initialAddressFormData);
            toast("Address added successfully!");
          }
        });
  };

  function handleDeleteAddress(getCurrentAddress) {
    //     console.log(getCurrentAddress);
    dispatch(
      deleteAddress({ userId: user?.id, addressId: getCurrentAddress?._id })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAddress(user?.id));
        toast("Address deleted successfully!");
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditedId(getCurrentAddress._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      phone: getCurrentAddress?.phone,
      pincode: getCurrentAddress?.pincode,
      notes: getCurrentAddress?.notes,
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAddress(user?.id));
  }, [dispatch]);

  console.log(addressList, "addressList");

  return (
    <Card className="p-4">
      <div className="mb-5 p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAddress) => (
              <AddressCard
                handleDeleteAddress={handleDeleteAddress}
                key={singleAddress.id}
                addressInfo={singleAddress}
                handleEditAddress={handleEditAddress}
              ></AddressCard>
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditedId !== null ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3"></CardContent>
      <CommonForm
        formControls={addressFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={currentEditedId !== null ? "Edit" : "Add"}
        onSubmit={handleManageAddress}
        isBtnDisabled={!isFormValid()}
      />
    </Card>
  );
}

export default Address;
