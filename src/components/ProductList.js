import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filteredProducts: products, gridView } = useFilterContext();

  if (products < 1) {
    return (
      <h4 style={{ textTransform: "none" }}>Sorry, no matched products</h4>
    );
  }

  if (gridView === false) {
    return <ListView products={products}></ListView>;
  }

  return <GridView products={products}></GridView>;
};

export default ProductList;
