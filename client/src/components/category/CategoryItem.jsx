import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CategoryItem = ({ item }) => {
  return (
    <div className="flex-1 md:p-1 h-[70vh] relative">
      <Link to={`/products/${item.cat}`}>
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-[30vh] sm:h-[50vh] object-cover md:h-[70vh]"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2">
          <h1 className="text-white text-2xl font-bold">{item.title}</h1>
          <Button variant="outline" className="bg-white text-gray-600 font-semibold hover:bg-gray-100">
            SHOP NOW
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
