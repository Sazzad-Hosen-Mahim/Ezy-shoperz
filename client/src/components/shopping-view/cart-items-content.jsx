import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCart } from "@/store/shop/cart-slice";
import { toast } from "react-toastify";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart item is deleted successfully");
      }
    });
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    dispatch(
      updateCart({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "increase"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem.image}
        alt={cartItem.title}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.title}</h3>
        <div className="flex gap-3 items-center mt-1">
          <Button
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{cartItem.quantity}</span>
          <Button
            className="h-8 w-8 rounded-full"
            variant="outline"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "increase")}
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
            cartItem?.quantity
          ).toFixed(2)}
        </p>
        <Trash2
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1 fill-red-500"
          size={20}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
