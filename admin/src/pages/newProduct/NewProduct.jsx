import "./newProduct.scss";
import ProductForm from "../../components/forms/ProductForm";

const NewProduct = () => {
  return (
    <main className="new-product">
      <header className="new-product__header">
        <h1 className="new-product__title">Add New Product</h1>
      </header>
      <section className="new-product__content">
        <ProductForm />
      </section>
    </main>
  );
};

export default NewProduct;
