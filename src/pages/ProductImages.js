import ProductImagesSlider from "../components/Productview/ProductImagesSlider";

const productImages = [
  "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
  "https://i.dummyjson.com/data/products/12/thumbnail.jpg",

  "https://i.dummyjson.com/data/products/14/thumbnail.jpg",
  "https://i.dummyjson.com/data/products/15/thumbnail.jpg",
  "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
  "https://i.dummyjson.com/data/products/17/thumbnail.jpg",
  "https://i.dummyjson.com/data/products/18/thumbnail.jpg",
];

function ProductOne() {
  return (
    <div
      style={{
        width: "700px",
        height: "500px",
        backgroundColor: "#fff",
        padding: "20px",
      }}
    >
      <ProductImagesSlider images={productImages} />
    </div>
  );
}

export default ProductOne;
