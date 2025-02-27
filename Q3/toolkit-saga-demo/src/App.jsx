// import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCats } from "./catState";

const App = () => {
  const dispatch = useDispatch();
  const cats = useSelector((state) => state.catsReducerRename.cats);
  const isLoading = useSelector((state) => state.catsReducerRename.isLoading);

  //   useEffect(() => {
  //     dispatch(fetchCats());
  //   }, [dispatch]);
  //   console.log(cats);

  return (
    <div className="App">
      <button onClick={() => dispatch(fetchCats())}>FetchCats</button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          Cats: {cats && cats.map((cat) => <div key={cat.id}>{cat.name}</div>)}
        </div>
      )}
    </div>
  );
};

export default App;
