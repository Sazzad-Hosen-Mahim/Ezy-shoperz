import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const { featureImageList } = useSelector((state) => state.commonFeature);

  const dispatch = useDispatch();

  console.log(uploadedImageUrl);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        toast("Image uploaded successfully");
      }
      //  console.log(data);
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <h1 className="text-2xl text-center font-bold">Upload Banner Image</h1>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        //    isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col mt-5 gap-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((imageItem, index) => (
              <img
                className="w-full h-[300px] object-cover rounded-lg"
                key={index}
                src={imageItem.image}
                alt=""
              />
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
