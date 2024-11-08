import { StarIcon } from "lucide-react";
import { Button } from "../ui/button";

function StarRatingComponent({ rating, handleRatingChange }) {
  return [1, 2, 3, 4, 5].map((star, index) => (
    <Button
      className={`p-2 border-none rounded-full transition-colors ${
        star <= rating
          ? "text-amber-500 hover:bg-black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
      key={index}
      variant="outline"
      size="icon"
      onClick={handleRatingChange ? () => handleRatingChange(star) : null}
    >
      <StarIcon
        className={`w-6 h-6 ${
          star <= rating ? "fill-amber-500" : "fill-black"
        }`}
      />
    </Button>
  ));
}

export default StarRatingComponent;
