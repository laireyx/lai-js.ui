import { useEffect, useState } from "preact/hooks";

const abortController = new AbortController();

function useQuestList(page) {
  const [questList, setQuestList] = useState([]);

  useEffect(() => {
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
      {questList.map((quest) => (
        <>
          {quest.qid} : {quest.title}
        </>
      ))}
    </>
  );
}
