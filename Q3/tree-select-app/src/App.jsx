/**********************************************
 * App.jsx
 *
 * Main application component with two buttons:
 * 1) Saga approach
 * 2) Custom hook approach
 **********************************************/

import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesRequest } from "./store/categoriesSlice";
import CategoryTreeSelect from "./components/CategoryTreeSelect";
import "antd/dist/reset.css";
import { useFetchCategories } from "./hooks/useFetchCategories";

function App() {
  // Redux states
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.categories);

  // Button 1 (Saga) handler
  const handleFetchSaga = () => {
    dispatch(fetchCategoriesRequest());
  };

  // Button 2 (Custom Hook) handler
  // Destruct the function from hook
  const { fetchDataViaHook } = useFetchCategories();
  const handleFetchHook = () => {
    fetchDataViaHook(); // triggers axios call inside the hook
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        marginTop: "10rem",
        alignItems: "center",
      }}
    >
      <h2>Saga & Custom Hook</h2>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleFetchSaga} style={{ marginRight: "0.75rem" }}>
          Fetch with Saga
        </button>

        <button onClick={handleFetchHook} style={{ marginLeft: "0.75rem" }}>
          Fetch with Custom Hook
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && data.categoryId === "root" && (
        <div style={{ marginTop: "1rem" }}>
          <CategoryTreeSelect categoryTree={data} />
        </div>
      )}
    </div>
  );
}

export default App;
