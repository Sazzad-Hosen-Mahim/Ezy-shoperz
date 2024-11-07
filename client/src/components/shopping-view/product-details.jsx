import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";
import { setProductDetails } from "@/store/shop/products-slice";
import { useNavigate } from "react-router-dom";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const dispatch = useDispatch();
  function handleAddToCart(getCurrentProductId, getTotalStock) {
    console.log(getCurrentProductId);
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem !== -1) {
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`Only ${getQuantity} can be added for this item`);
          return;
        }
      }
    }
    if (user) {
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload.success) {
          dispatch(fetchCartItems(user?.id));
          toast("Product is added to cart");
        }
      });
    } else {
      navigate("/auth/login");
    }
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
  }
  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className=" gap-6">
          <div>
            <h1 className="text-2xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-xl text-muted-foreground mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-lg font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
              <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
              <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
              <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
              <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <span className="text-muted-foreground">{4.5}</span>
          </div>
          <div>
            {productDetails?.totalStock === 0 ? (
              <Button className="mt-5 mb-5 w-full opacity-60 cursor-not-allowed">
                Out of Stock
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails?.totalStock
                  )
                }
                className="mt-5 mb-5 w-full"
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-lg font-bold mb-4">Reviews: </h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sazzad Mahim</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sazzad Mahim</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Sazzad Mahim</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <StarIcon className="w-5 h-5 text-amber-400 fill-amber-400" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex gap-2">
              <Input placeholder="Write a review..." />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
