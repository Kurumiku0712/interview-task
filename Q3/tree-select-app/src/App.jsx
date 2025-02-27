/**********************************************
 * App.jsx
 *
 * Main application component. Uses a button to trigger category fetch with Saga,
 * and displays the CategoryTreeSelect if data is available.
 **********************************************/

import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesRequest } from "./store/categoriesSlice";
import CategoryTreeSelect from "./components/CategoryTreeSelect";
import "antd/dist/reset.css"; // or "antd/dist/antd.css" if using older antd

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.categories);

  const handleFetchSaga = () => {
    dispatch(fetchCategoriesRequest());
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        textAlign: "center", 
        padding: "1rem",
      }}
    >
      <h2>Redux Toolkit + Saga</h2>

      <button onClick={handleFetchSaga} style={{ marginRight: "0.75rem" }}>
        Fetch with Saga
      </button>

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
