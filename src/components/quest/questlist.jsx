import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";
import "./questlist.css";

function useQuestList(page) {
  const [questList, setQuestList] = useState([
    { qid: 0, title: "Now loading..." },
  ]);

  useEffect(() => {
    const abortController = new AbortController();
    fetch(`http://api.laireyx.net/quest/list?p=${page}`, {
      signal: abortController.signal,
    })
      .then((resp) => resp.json())
      .then((json) => setQuestList(json));

    return () => {
      abortController.abort();
    };
  }, [page]);

  return questList;
}

export function QuestList() {
  const questList = useQuestList();
  return (
    <>
      <h1>Quest List</h1>
      <table className="questList">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
          </tr>
        </thead>
        <tbody>
          {questList.map((quest) => (
            <tr key={quest.qid}>
              <td>{quest.qid}</td>
              <td className="questTitle">
                {quest.qid > 0 ? (
                  <Link to={`../${quest.qid}`}>{quest.title}</Link>
                ) : (
                  quest.title
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
