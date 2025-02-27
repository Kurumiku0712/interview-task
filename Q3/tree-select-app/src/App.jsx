// src/App.jsx
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesSaga } from './redux/saga';
import { useFetchCategories } from './hooks/useFetchCategories';
import CategoryTreeSelect from './components/CategoryTreeSelect';

function App() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const { fetchData: hookFetch } = useFetchCategories();

  const handleSelect = (categoryId) => {
    alert(`Selected Category ID: ${categoryId}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Category TreeSelect Demo</h2>

      {/* Button 1: Use Redux Saga */}
      <button
        onClick={() => {
          dispatch(fetchCategoriesSaga());
        }}
      >
        Fetch via Redux Saga
      </button>

      {/* Button 2: Use Custom Hook */}
      <button
        onClick={() => {
          hookFetch();
        }}
        style={{ marginLeft: '10px' }}
      >
        Fetch via Custom Hook
      </button>

      <div style={{ marginTop: '20px' }}>
        <CategoryTreeSelect
          categories={categories}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}

export default App;
