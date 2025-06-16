import CategoryItem from "./CategoryItem";
import { categories } from "../../data";

const Categories = () => {
  return (
    <section className="flex justify-between p-1 flex-col gap-1 md:flex-row md:p-5">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </section>
  );
};

export default Categories;

