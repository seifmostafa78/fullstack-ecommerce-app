import {
  ShoppingCartOutlined,
  SearchOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "../../redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { formattedProducts } from "@/lib/cart";
import { getUser } from "@/redux/features/user/userSlice";
import { useUpdateCartMutation } from "@/redux/features/cart/cartApiSlice";
import { toast } from "sonner";
import Cookies from "js-cookie";

const Product = ({ product }) => {
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  const cart = useSelector(getCart);
  const [updateCart, { isLoading }] = useUpdateCartMutation();

  const handleClick = async () => {
    if (accessToken) {
      dispatch(
        addToCart({
          ...product,
          color: product.color[0],
          size: product.size[0],
          quantity: 1,
        })
      );
      const cartPayload = formattedProducts(
        cart,
        product,
        {
          color: product.color[0],
          size: product.size[0],
          quantity: 1,
        },
        currentUser
      );
      const { data } = await updateCart({
        cartId: cart.cartId,
        cartData: cartPayload,
      });
      toast.success(data.message);
    }else{
      navigate("/auth/login")
    }
  };

  return (
    <div className="flex-1 min-w-[280px] h-[350px] flex items-center justify-center bg-[#f5fbfd] relative group">
      <div className="w-[200px] h-[200px] rounded-full bg-white absolute" />
      <img
        src={product.img}
        alt="product"
        loading="lazy"
        className="h-[75%] z-[2]"
      />
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full h-full bg-black/20 z-[3] absolute top-0 left-0 flex items-center justify-center gap-2">
        <Button
          size="icon"
          className="rounded-full w-10 h-10 bg-white text-gray-700 hover:scale-110 active:scale-90 transition"
          onClick={handleClick}
          disabled={isLoading}
        >
          <ShoppingCartOutlined fontSize="small" />
        </Button>

        <Link to={`/product/${product._id}`}>
          <Button
            size="icon"
            className="rounded-full w-10 h-10 bg-white text-gray-700 hover:scale-110 active:scale-90 transition"
          >
            <SearchOutlined fontSize="small" />
          </Button>
        </Link>

        <Button
          size="icon"
          className="rounded-full w-10 h-10 bg-white text-gray-700 hover:scale-110 active:scale-90 transition"
        >
          <FavoriteBorderOutlined fontSize="small" />
        </Button>
      </div>
    </div>
  );
};

export default Product;
