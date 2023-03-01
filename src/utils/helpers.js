export const formatPrice = (number) => {
  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "EUR",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let items = data.map((item) => item[type]);
  if (type === "colors") {
    items = items.flat();
  }
  return [...new Set(items)];
};
