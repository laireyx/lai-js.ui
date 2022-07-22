import { Link } from "react-router-dom";
import "./home.css";

export function Home() {
  return (
    <>
      <Link to="/quest/list">Quest List</Link>
    </>
  );
}
