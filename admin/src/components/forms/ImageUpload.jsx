import "./imageUpload.scss";

const ImageUpload = ({ file, fallback }) => {
  const imageSrc = file
    ? URL.createObjectURL(file)
    : fallback ||
      "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg";

  return (
    <div className="imageContainer">
      <img src={imageSrc} alt="preview" />
    </div>
  );
};

export default ImageUpload;
