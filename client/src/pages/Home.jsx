import Slider from "../components/Slider";
import Categories from "../components/category/Categories";
import Products from "../components/product/Products";
import Newsletter from "../components/Newsletter";
import Announcement from "../components/Announcement";

const Home = () => {
  return (
    <main>
      <Announcement />
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
    </main>
  );
};

export default Home;
