import "./form.scss";
import ImageUpload from "../../components/forms/ImageUpload";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useMemo, useState } from "react";
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from "../../redux/features/product/productApiSlice";
import { toast } from "sonner";
import { useLocation, useNavigate } from "react-router-dom";
import { uploadImage } from "../../lib/uploadImage";
import useFormFields from "../../hooks/useFormFields";
import FormFields from "../form-fields/FormFields";

const ProductForm = ({ product, onUpdate }) => {
  const location = useLocation();
  const slug = location.pathname.split("/")[1];
  const [file, setFile] = useState(null);
  const [formValues, setFormValues] = useState({
    title: "",
    desc: "",
    price: "",
    categories: [],
    color: [],
    size: [],
    inStock: "true",
  });
  const [tempInput, setTempInput] = useState({
    categories: "",
    color: "",
    size: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const navigate = useNavigate();
  const actionType = useMemo(() => (product ? "update" : "create"), [product]);
  const { getFormFields } = useFormFields(slug);

  useEffect(() => {
    if (product) {
      setFormValues(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleArrayInputKeyDown = (e, field) => {
    if (
      (e.key === "Enter" || e.key === ",") &&
      tempInput[field].trim() !== ""
    ) {
      e.preventDefault();
      setFormValues((prev) => ({
        ...prev,
        [field]: [...prev[field], tempInput[field].trim()],
      }));
      setTempInput((prev) => ({ ...prev, [field]: "" }));
    }
  };
  const removeItem = (field, index) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (actionType === "create" && !file) {
      alert("Please choose an image.");
      return;
    }

    setIsUploading(true);
    try {
      let imageUrl = product?.img;
      if (file) imageUrl = await uploadImage(file);

      const productData = {
        ...formValues,
        img: imageUrl,
      };

      const { data } =
        actionType === "update"
          ? await updateProduct({ id: product._id, productData })
          : await createProduct(productData);

      actionType === "update" && onUpdate();
      toast.success(data.message);
      navigate("/products");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <main className="formBody">
        <ImageUpload file={file} fallback={product?.img} />
        <section className="formFields">
          <fieldset className="formGroup">
            <legend>Product Image</legend>
            <label htmlFor="file">
              Upload Image: <DriveFolderUploadOutlinedIcon className="icon" />
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
            />
          </fieldset>
          {getFormFields().map((field) => {
            const fieldValue = formValues[field.name];
            return (
              <fieldset key={field.name} className="formGroup">
                <FormFields
                  {...field}
                  defaultValue={fieldValue}
                  handleChange={handleChange}
                />
              </fieldset>
            );
          })}
          <fieldset className="formGroup">
            <label htmlFor="categories">Categories</label>
            <div className="tagsInputContainer">
              {formValues.categories.map((item, index) => (
                <span key={index} className="tag">
                  {item}
                  <button
                    type="button"
                    onClick={() => removeItem("categories", index)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add category and press Enter"
                value={tempInput.categories}
                onChange={(e) =>
                  setTempInput((prev) => ({
                    ...prev,
                    categories: e.target.value,
                  }))
                }
                onKeyDown={(e) => handleArrayInputKeyDown(e, "categories")}
              />
            </div>
          </fieldset>
          <fieldset className="formGroup">
            <label htmlFor="color">Colors</label>
            <div className="tagsInputContainer">
              {formValues.color.map((item, index) => (
                <span key={index} className="tag">
                  {item}
                  <button
                    type="button"
                    onClick={() => removeItem("color", index)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add color and press Enter"
                value={tempInput.color}
                onChange={(e) =>
                  setTempInput((prev) => ({ ...prev, color: e.target.value }))
                }
                onKeyDown={(e) => handleArrayInputKeyDown(e, "color")}
              />
            </div>
          </fieldset>
          <fieldset className="formGroup">
            <label htmlFor="size">Sizes</label>
            <div className="tagsInputContainer">
              {formValues.size.map((item, index) => (
                <span key={index} className="tag">
                  {item}
                  <button
                    type="button"
                    onClick={() => removeItem("size", index)}
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add size and press Enter"
                value={tempInput.size}
                onChange={(e) =>
                  setTempInput((prev) => ({
                    ...prev,
                    size: e.target.value.toUpperCase(),
                  }))
                }
                onKeyDown={(e) => handleArrayInputKeyDown(e, "size")}
              />
            </div>
          </fieldset>
          <button
            type="submit"
            className="formSubmitBtn"
            disabled={isUploading}
          >
            {isUploading && <CircularProgress size={20} color="inherit" />}
            {actionType === "update" ? "Update" : "Create"}
          </button>
        </section>
      </main>
    </form>
  );
};

export default ProductForm;
