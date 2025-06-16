import { useLocation } from "react-router-dom";
import { useState } from "react";
import Products from "../components/product/Products";
import Newsletter from "../components/Newsletter";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilter = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="px-4 py-6">
      <h1 className="text-3xl font-semibold capitalize pb-6">{cat}</h1>
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <Label className="text-lg font-medium">Filter Products:</Label>
          <Select onValueChange={(val) => handleFilter("color", val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="White">White</SelectItem>
              <SelectItem value="Black">Black</SelectItem>
              <SelectItem value="Red">Red</SelectItem>
              <SelectItem value="Blue">Blue</SelectItem>
              <SelectItem value="Yellow">Yellow</SelectItem>
              <SelectItem value="Green">Green</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={(val) => handleFilter("size", val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="XS">XS</SelectItem>
              <SelectItem value="S">S</SelectItem>
              <SelectItem value="M">M</SelectItem>
              <SelectItem value="L">L</SelectItem>
              <SelectItem value="XL">XL</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
          <Label className="text-lg font-medium">Sort Products:</Label>
          <Select onValueChange={(val) => setSort(val)} defaultValue="newest">
            <SelectTrigger className="w-[200px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="asc">Price (asc)</SelectItem>
              <SelectItem value="desc">Price (desc)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
    </main>
  );
};

export default ProductList;
