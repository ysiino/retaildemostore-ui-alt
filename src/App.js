import { useState, useEffect } from "react";
import "./styles.css";
import ItemsApi from "./ItemsApi";
import IsoTopeGrid from "react-isotope";

export default function App() {
  const [products, setProducts] = useState([]);
  const [filters, updateFilters] = useState([]);

  useEffect(() => {
    ItemsApi.fetchAll().then((items) => {
      const newItems = [...items];
      newItems.map((item) => (item.filter = [item.style]));
      setProducts(newItems);

      const styles = new Set(newItems.map((item) => item.style));

      const newStyles = Array.from(styles).map((style) => {
        return { label: style, isChecked: true };
      });

      updateFilters(newStyles);
    });
  }, []);

  const onFilter = (event) => {
    const {
      target: { value, checked },
    } = event;

    updateFilters((state) =>
      state.map((f) => {
        if (f.label === value) {
          return {
            ...f,
            isChecked: checked,
          };
        }

        return f;
      })
    );
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <div>
        {filters.map((f) => (
          <>
            <input
              key={`${f.label}_key`}
              type="checkbox"
              id={f.label}
              value={f.label}
              onChange={onFilter}
              checked={f.isChecked}
            />
            <label htmlFor={f.label}>{f.label}</label>
          </>
        ))}
      </div>

      <div>
        <IsoTopeGrid
          gridLayout={products}
          noOfCols={5}
          unitWidth={300}
          unitHeight={200}
          filters={filters}
        >
          {products.map((product) => (
            <div key={product.id} className={`product`}>
              <a
                href={`https://dxkzdyxzguxk9.cloudfront.net/product/${product.id}`}
                target="_blank"
              >
                <img
                  style={{ maxWidth: "100%", maxHeight: "90%" }}
                  src={product.image}
                ></img>
              </a>
            </div>
          ))}
        </IsoTopeGrid>
      </div>
    </div>
  );
}
