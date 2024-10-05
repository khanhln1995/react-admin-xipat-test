import {
  IndexTable,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  Badge,
  useBreakpoints,
  Pagination,
} from "@shopify/polaris";
import { useState, useCallback, useEffect } from "react";
import ModalAddRule from "./ModalAddRule";
import { getRandomDayString } from "../../util/getRandomDayString";
import { getRandomColor } from "../../util/getRandomColor";

function ProductTable() {
  const [selected, setSelected] = useState(0);
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Adjust the number of items per page
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      let productsInit = data.map((item) => {
        const randomRule = Math.floor(Math.random() * 3);
        return {
          id: item.id,
          name: item.title,
          rule: randomRule,
          status: randomRule !== 0 ? "Active" : "No Rule",
          lastUpdate: getRandomDayString(),
          image: `https://via.placeholder.com/150/${getRandomColor()}`,
        };
      });

      setProducts(productsInit);
      setOriginalProducts(productsInit); // Save original products
    } catch (error) {
      console.error(error);
      // Optionally, set an error state to show in the UI
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const itemStrings = ["All", "Active", "No Rule"];
  const [queryValue, setQueryValue] = useState("");
  const [sortSelected, setSortSelected] = useState(["order asc"]);
  const { mode, setMode } = useSetIndexFiltersMode();

  const tabs = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {
      setSelected(index);
      if (index === 0) {
        setProducts(originalProducts); // Reset to original products
      } else {
        setProducts(
          originalProducts.filter((product) => product.status === item)
        );
      }
      setCurrentPage(1); // Reset to the first page
    },
    id: `${item}-${index}`,
    isLocked: index === 0,
  }));

  const handleFiltersQueryChange = useCallback(
    (value) => {
      setQueryValue(value);
      setProducts(
        originalProducts.filter((product) =>
          product.name.toLowerCase().includes(value.toLowerCase())
        )
      );
      setCurrentPage(1); // Reset to the first page
    },
    [originalProducts]
  );

  const handleQueryValueRemove = useCallback(() => {
    setQueryValue("");
    setProducts(originalProducts);
    setCurrentPage(1); // Reset to the first page
  }, [originalProducts]);

  const appliedFilters = [];

  const resourceName = {
    singular: "product",
    plural: "products",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  // Slice products for the current page
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const rowMarkup = paginatedProducts.map(
    ({ id, image, name, rule, lastUpdate, status }, index) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell className="w-[150px]">
          <img src={image} alt={image} width="150px" />
        </IndexTable.Cell>
        <IndexTable.Cell>{name}</IndexTable.Cell>
        <IndexTable.Cell>{rule}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text>{lastUpdate}</Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          {status === "Active" ? (
            <Badge tone="success">{status}</Badge>
          ) : (
            <Badge>{status}</Badge>
          )}
        </IndexTable.Cell>
        <IndexTable.Cell>
          <ModalAddRule id={id} />
        </IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <>
      <IndexFilters
        // sortOptions={[]} // You can add sort options as needed
        // sortSelected={sortSelected}
        // queryValue={queryValue}
        // queryPlaceholder="Searching in all"
        // onQueryChange={handleFiltersQueryChange}
        // onQueryClear={handleQueryValueRemove}
        // onSort={setSortSelected}
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        // appliedFilters={appliedFilters}
        mode="DEFAULT"
        setMode={setMode}
      />
      <IndexTable
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={products.length}
        selectedItemsCount={
          allResourcesSelected ? "All" : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: "Image" },
          { title: "Product" },
          { title: "Rule(s)" },
          { title: "Last update" },
          { title: "Status" },
          { title: "Action" },
        ]}
        pagination={{
          hasNext: currentPage < totalPages,
          hasPrevious: currentPage > 1,
          onNext: () =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages)),
          onPrevious: () => setCurrentPage((prev) => Math.max(prev - 1, 1)),
          onPerPageSelect: () => {},
          label: `Page ${currentPage} of ${totalPages}`,
        }}
      >
        {rowMarkup}
      </IndexTable>
    </>
  );
}

export default ProductTable;
