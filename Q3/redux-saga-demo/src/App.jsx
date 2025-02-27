import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./actions";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.myFirstReducer.users);
  const isLoading = useSelector((state) => state.myFirstReducer.isLoading);
  return (
    <div className="App">
      <button onClick={() => dispatch(fetchUsers())}>Fetch Users</button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          Users:{" "}
          {users && users.map((user) => <div key={user.id}>{user.name}</div>)}
        </div>
      )}
    </div>
  );
};

export default App;
