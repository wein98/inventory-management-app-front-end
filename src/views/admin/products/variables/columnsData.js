export const columnsDataDevelopment = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "TECH",
    accessor: "tech",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
];

export const columnsDataCheck = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "PROGRESS",
    accessor: "progress",
  },
  {
    Header: "QUANTITY",
    accessor: "quantity",
  },
  {
    Header: "DATE",
    accessor: "date",
  },
];

export const parentProductsColumnsDataColumns = [
  {
    Header: "SKU",
    accessor: "SKU",
  },
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "CATEGORY",
    accessor: "category",
  },
  {
    Header: "PRODUCT_ID",
    accessor: "product_code",
  },
  {
    Header: "WORKMANSHIP",
    accessor: "workmanship",
  },
  {
    Header: "UPDATED_AT",
    accessor: "createdAt",
  },
];

export const variationProductsDataColumns = [
  {
    Header: "PRODUCT_ID",
    accessor: "product_code",
  },
  {
    Header: "SKU",
    accessor: "SKU",
  },
  {
    Header: "PARENT SKU",
    accessor: "parent.SKU",
  },
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "WEIGHT (g)",
    accessor: "weight",
  },
  {
    Header: "LENGTH (cm)",
    accessor: "length",
  },
  {
    Header: "SIZE",
    accessor: "size",
  },
  {
    Header: "NAME",
    accessor: "parent.name",
  },
  {
    Header: "CATEGORY",
    accessor: "parent.category",
  },
  {
    Header: "WORKMANSHIP",
    accessor: "parent.workmanship",
  },
  {
    Header: "PURCHASE DATE",
    accessor: "purchase_date",
  },
];

export const variationByParentProductsDataColumns = [
  {
    Header: "PRODUCT_ID",
    accessor: "product_code",
  },
  {
    Header: "SKU",
    accessor: "SKU",
  },
  {
    Header: "WEIGHT (g)",
    accessor: "weight",
  },
  {
    Header: "LENGTH (cm)",
    accessor: "length",
  },
  {
    Header: "SIZE",
    accessor: "size",
  },
  {
    Header: "PURCHASE DATE",
    accessor: "purchase_date",
  },
];