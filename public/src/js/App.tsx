import {useState} from "react";

export default function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <div>count: {counter}</div>
      <button onClick={() => setCounter((prev) => prev + 1)}>Add</button>
    </div>
  );
}
