import ModalAddProduct from "../components/products/ModalAddProduct";
import ProductTable from "../components/products/ProductTable";

function ProductPage() {
  return (
    <>
      <div className="text-end mb-5">
        <ModalAddProduct />
      </div>
      <ProductTable />
    </>
  );
}

export default ProductPage;
