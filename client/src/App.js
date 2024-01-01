import "./App.css";
import { useRepositories } from "./api";


function App() {
  const {data: repos} = useRepositories();


  console.log(repos);

  return (
    <div className="App">
      <h1>Projet federateur</h1>
      {repos.map((repo) => (
        <div key={repo.id}>
          <h3>List of repositories</h3>
          <div
            style={{
              border: "1px solid #76453B",
              borderRadius: "1rem",
              backgroundColor: "#B19470",
              color: "#F8FAE5",
              textAlign: "left",
              paddingLeft: "3rem",
            }}
          >
            <p>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Name:
              </span>{" "}
              {repo?.name}
            </p>
            <p>
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Private:
              </span>{" "}
              {repo?.private ? "yes" : "no"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
