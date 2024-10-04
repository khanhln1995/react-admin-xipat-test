import { LegacyCard, EmptyState } from "@shopify/polaris";
import React from "react";

function NoData() {
  return (
    <EmptyState
      heading="No data available"
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    ></EmptyState>
  );
}
export default NoData;
