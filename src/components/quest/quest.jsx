import { Code } from "../code/code";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "preact/hooks";

import "./quest.css";

function useQuest(questId) {
  const [quest, setQuest] = useState({});

  useEffect(() => {
    const abortController = new AbortController();
    fetch(`http://api.laireyx.net/quest/${questId}`, {
      signal: abortController.signal,
    })
      .then((resp) => resp.json())
      .then((json) => setQuest(json));

    return () => {
      abortController.abort();
    };
  }, [questId]);

  return quest;
}

export function Quest() {
  const { questId } = useParams();
  const quest = useQuest(questId);
  const [code, setCode] = useState(quest.sample);

  useEffect(() => {
    setCode(quest.sample);
  }, [quest]);

  return (
    <div className="quest">
      <div>
        <h1>{quest.title || "Epic Quest"}</h1>
        <p className="questContent">
          {quest.content || "Stay awhile and listen"}
        </p>
      </div>
      <Code
        code={code}
        setCode={setCode}
        placeholder="console.log('Loading problem...');"
      />
      <button
        onClick={() => {
          fetch(`http://api.laireyx.net/quest/submit/${questId}`, {
            method: "POST",
            signal: abortController.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
          })
            .then((resp) => resp.text())
            .then((text) => alert(text));
        }}
      >
        Submit
      </button>
    </div>
  );
}
