import React, { useEffect } from "react";
import Slider from "../../components/slider/Slider";
import { AdminOnlyRoute } from "../../components/adminOnlyRoute/AdminOnlyRoute";
import Product from "../../components/product/Product";

const Home = () => {
  const url = window.location.href;
  console.log(url);

  const scrollToProducts = () => {
    if (url.includes("#products")) {
      window.scrollTo({
        top: 619,
        behavior: "smooth",
      });
    }

    return;
  };

  useEffect(() => {
    scrollToProducts();
  }, []);
  return (
    <div>
      <Slider />
      <Product />
    </div>
  );
};

export default Home;
