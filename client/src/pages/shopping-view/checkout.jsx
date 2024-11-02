import Address from "@/components/shopping-view/address";
import img from "../../assets/images/banner-image/lum3n--RBuQ2PK_L8-unsplash.jpg";
import { useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const totalCartAmount =
    cartItems && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;
  console.log(cartItems, "cartItems");
  return (
    <div className="flex flex-col">
      <div className="relative h-[500px] w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems &&
          cartItems.items &&
          cartItems.items &&
          cartItems.items.length > 0
            ? cartItems?.items?.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total amount</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div>
            <Button className="mt-4 w-full">Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
