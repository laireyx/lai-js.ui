import { Link } from "react-router-dom";
import "./home.css";

export function Home() {
  return (
    <>
      <h1>{location.host}</h1>
      <Link to="/quest/list">
        <button>Quest List</button>
      </Link>
    </>
  );
}
