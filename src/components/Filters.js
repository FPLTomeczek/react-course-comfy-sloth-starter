import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      min_price,
      max_price,
      price,
      free_shipping,
    },
    updateFilters,
    allProducts,
    clearFilters,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const allColors = getUniqueValues(allProducts, "colors");

  return (
    <Wrapper>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-control">
          <input
            type="text"
            name="text"
            className="search-input"
            placeholder="Search"
            value={text}
            onChange={updateFilters}
          />
        </div>
        <div className="form-control">
          <h5>Categories</h5>
          <div>
            {categories.map((c, index) => {
              return (
                <button
                  onClick={updateFilters}
                  name="category"
                  key={index}
                  className={`${c === category ? "active" : null}`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>Company</h5>
          <select
            name="company"
            id="company"
            onClick={updateFilters}
            className="company"
          >
            {companies.map((comp, index) => {
              return (
                <option value={comp} key={index}>
                  {comp}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-control">
          <h5>Colors</h5>
          <div className="colors">
            {allColors.map((c, index) => {
              if (c === "all") {
                return (
                  <button
                    className={`all-btn ${c === color ? "active" : null}`}
                    key={index}
                    name="color"
                    data-color="all"
                    onClick={updateFilters}
                  >
                    {c}
                  </button>
                );
              }
              return (
                <button
                  className={`color-btn ${c === color ? "active" : null}`}
                  style={{ background: c }}
                  name="color"
                  key={index}
                  onClick={updateFilters}
                  data-color={c}
                >
                  {c === color && <FaCheck />}
                </button>
              );
            })}
          </div>
        </div>
        <div className="form-control">
          <h5>Price</h5>
          <div className="price">{formatPrice(price)}</div>
          <input
            type="range"
            onChange={updateFilters}
            min={min_price}
            max={max_price}
            value={price}
            name="price"
          />
        </div>
        <div className="form-control">
          <div className="shipping">
            <label htmlFor="shipping">Free shipping</label>
            <input
              type="checkbox"
              name="free_shipping"
              id="shipping"
              checked={free_shipping}
              onChange={updateFilters}
            />
          </div>
        </div>
      </form>
      <button className="clear-btn" onClick={clearFilters}>
        clear filters
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
