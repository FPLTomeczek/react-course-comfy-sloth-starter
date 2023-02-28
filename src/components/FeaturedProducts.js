import React from "react";
import { useProductsContext } from "../context/products_context";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const FeaturedProducts = () => {
  const { featured, isProductsLoading, isProductsError } = useProductsContext();

  if (isProductsLoading) {
    return <Loading />;
  }

  if (isProductsError) {
    return <Error />;
  }

  return (
    <Wrapper>
      <section className="section-center section">
        <div className="title">
          <h3>Featured Products</h3>
          <div className="underline"></div>
        </div>
        <div className="featured">
          {featured.slice(0, 3).map((feature) => {
            return <Product key={feature.id} {...feature} />;
          })}
        </div>
        <Link to="/products">
          <button className="btn">ALL PRODUCTS</button>
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`;

export default FeaturedProducts;
