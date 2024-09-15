import ProductList from "./products/page";
import "./globals.css";
import Contact from "@/app/contact/page";

export default function Home() {
  const bannerWrapperStyle = {
    position: "relative",
    width: "100%",
    height: "90vh",
    overflow: "hidden",
  };

  const bannerImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  };

  return (
    <>
      <div style={bannerWrapperStyle}>
        <img
          src="https://img.freepik.com/free-psd/horizontal-banner-online-fashion-sale_23-2148585404.jpg?w=1380&t=st=1726322983~exp=1726323583~hmac=6567ea89ec00f1c23be07a047a47431c45bd716cff76bc63a8ea664c7b469d61"
          alt="Banner"
          style={bannerImageStyle}
        />
      </div>
      <ProductList />
      <Contact />
    </>
  );
}
