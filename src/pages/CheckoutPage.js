import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <section>
      <PageHero page="Checkout" />
      <Wrapper>
        <h3>Checkout Here</h3>
      </Wrapper>
    </section>
  );
};
const Wrapper = styled.div``;
export default CheckoutPage;
