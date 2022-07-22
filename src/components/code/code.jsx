import "./code.css";
import CodeEditor from "@uiw/react-textarea-code-editor";

export function Code({ code, setCode, placeholder }) {
  return (
    <CodeEditor
      value={code}
      language="js"
      placeholder={placeholder}
      onChange={({ target }) => {
        setCode(target.value);
      }}
      padding={15}
      style={{
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        fontFamily: "ui-monospace, 'Cascadia Code', Consolas",
      }}
    />
  );
}
