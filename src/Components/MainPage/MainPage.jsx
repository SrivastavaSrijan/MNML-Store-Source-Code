import React from "react";
import { CardList } from "../../Layouts/CardList/CardList";
export function MainPage({ productList }) {
  return (
    <div>
      <CardList productList={productList} />
    </div>
  );
}
