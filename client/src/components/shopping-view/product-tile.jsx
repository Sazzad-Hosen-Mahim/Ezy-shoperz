import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function ShoppingProductTile({ product, handleGetProductDetails }) {
  const capitalize = (str) => {
    if (str.includes("&")) {
      return str.toUpperCase();
    } else {
      return str[0].toUpperCase() + str.slice(1);
    }
  };

  const handleAddToCart = () => {
    console.log("add to cart from product tile");
  };
  // console.log(product);
  return (
    <Card className="w-full max-w-sm mx-auto hover:cursor-pointer">
      <div onClick={() => handleGetProductDetails(product?._id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {product?.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
          <CardContent className="p-4">
            <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[16px] text-muted-foreground">
                {capitalize(product?.category)}
              </span>
              <span className="text-[16px] text-muted-foreground">
                {capitalize(product?.brand)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span
                className={`${
                  product?.salePrice > 0 ? "line-through" : ""
                } text-lg font-semibold text-primary`}
              >
                {product?.price}
              </span>
              {product?.salePrice > 0 ? (
                <span className="text-lg font-semibold text-primary">
                  {product?.salePrice}
                </span>
              ) : null}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="w-full"
            >
              Add to cart
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}

export default ShoppingProductTile;
