import { render } from "preact";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/home/home";
import { Quest } from "./components/quest/quest";
import { QuestList } from "./components/quest/questlist";
import "./index.css";

render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="quest">
        <Route path="list" element={<QuestList />} />
        <Route path=":questId" element={<Quest />} />
      </Route>
      <Route path="*" element={<>Not Found</>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("app")
);
