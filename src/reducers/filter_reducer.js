import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return {
      ...state,
      allProducts: [...action.payload],
      filteredProducts: [...action.payload],
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      gridView: true,
    };
  }
  if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      gridView: false,
    };
  }
  if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sort: action.payload,
    };
  }
  if (action.type === SORT_PRODUCTS) {
    const { filteredProducts, sort } = state;

    const tempProducts = [...filteredProducts];

    if (sort === "price-lowest") {
      tempProducts.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempProducts.sort((a, b) => b.price - a.price);
    }
    if (sort === "name-a") {
      tempProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sort === "name-z") {
      tempProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    return { ...state, filteredProducts: [...tempProducts] };
  }
  if (action.type === UPDATE_FILTERS) {
    const name = action.payload.name;
    const value = action.payload.value;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    const {
      allProducts,
      filters: { text, category, company, color, price, free_shipping },
    } = state;
    let tempProducts = [...allProducts];
    tempProducts = tempProducts
      .filter((product) => product.name.includes(text) === true)
      .filter((product) =>
        category === "all" ? product : product.category === category
      )
      .filter((product) =>
        company === "all" ? product : product.company === company
      )
      .filter((product) =>
        color === "all" ? product : product.colors.includes(color) === true
      )
      .filter((product) => product.price <= price)
      .filter((product) =>
        free_shipping
          ? product.shipping === true
          : product.shipping === undefined || product.shipping === true
      );

    return { ...state, filteredProducts: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
        min_price: 0,
        max_price: 400000,
        price: 400000,
        free_shipping: false,
      },
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
