import { useEffect, useState } from "preact/hooks";
import { Link } from "react-router-dom";

function useQuestList(page) {
  const [questList, setQuestList] = useState([]);

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
    <table>
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
            <td>
              <Link to={`../${quest.qid}`}>{quest.title}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
