import "./product.scss";
import Chart from "../../components/chart/Chart";
import { useParams } from "react-router-dom";
import { useProductQuery } from "../../redux/features/product/productApiSlice";
import ProductForm from "../../components/forms/ProductForm";

const Single = () => {
  const { productId } = useParams();
  const { data: product, refetch } = useProductQuery(productId);

  return (
    <main className="product-page">
      <div className="product-page__top">
        <article className="product-page__info-card">
          <button className="product-page__edit-btn">Edit</button>
          <h2 className="product-page__section-title">Information</h2>

          {product && (
            <div className="product-page__info">
              <img
                src={product.img}
                alt="product"
                className="product-page__image"
              />
              <div className="product-page__details">
                <h3 className="product-page__title">{product.title}</h3>
                <div className="product-page__attributes">
                  <div>
                    <div className="product-page__attribute-row">
                      <span className="product-page__attribute-key">id:</span>
                      <span className="product-page__attribute-value">
                        {product._id}
                      </span>
                    </div>
                    <div className="product-page__attribute-row">
                      <span className="product-page__attribute-key">
                        Price:
                      </span>
                      <span className="product-page__attribute-value">
                        ${product.price}
                      </span>
                    </div>
                    <div className="product-page__attribute-row">
                      <span className="product-page__attribute-key">
                        Categories:
                      </span>
                      {product.categories.map((category) => (
                        <span
                          className="product-page__attribute-value"
                          key={category}
                        >
                          {category},
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="product-page__attribute-row">
                      <span className="product-page__attribute-key">
                        Colors:
                      </span>
                      {product.color.map((color) => (
                        <span
                          className="product-page__attribute-value"
                          key={color}
                        >
                          {color},
                        </span>
                      ))}
                    </div>
                    <div className="product-page__attribute-row">
                      <span className="product-page__attribute-key">
                        Sizes:
                      </span>
                      {product.size.map((size) => (
                        <span
                          className="product-page__attribute-value"
                          key={size}
                        >
                          {size},
                        </span>
                      ))}
                    </div>
                    <div className="product-page__attribute-row">
                      <span className="product-page__attribute-key">
                        Stock:
                      </span>
                      <span className="product-page__attribute-value">
                        <input
                          type="checkbox"
                          checked={product.inStock}
                          readOnly
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
        <section className="product-page__chart-section">
          <Chart title="Product Spending (last 6 month)" aspect={3 / 1} />
        </section>
      </div>
      <section className="product-page__form-section">
        <h2 className="product-page__section-title">Update Product</h2>
        <ProductForm product={product} onUpdate={refetch} />
      </section>
    </main>
  );
};

export default Single;
