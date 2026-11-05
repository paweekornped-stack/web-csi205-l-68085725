import { useEffect, useReducer } from "react";

const initial = { state: "first", display: "0", first: 0, second: 0, operator: "?", replace: false };

function insertSeparator(str, separator = ",", groupSize = 3) {
  let result = "", counter = 0;
  for (let i = str.length - 1; i >= 0; i--) {
    result = str[i] + result;
    counter++;
    if (i !== 0 && counter % groupSize === 0) result = separator + result;
  }
  return result;
}

function reducer(s, a) {
  switch (a.type) {
    case "number": {
      const n = String(a.value);
      if (s.state === "operator") return { ...s, display: n, state: "second" };
      const base = s.state === "first" && s.replace ? "0" : s.display;
      const replace = s.state === "first" ? false : s.replace;
      if (base.length >= 9) return { ...s, display: base, replace };
      return { ...s, display: base === "0" ? n : base + n, replace };
    }
    case "operator": {
      if (s.state === "first") return { ...s, first: Number(s.display), operator: a.op, state: "operator" };
      if (s.state === "operator") return { ...s, operator: a.op };
      const second = Number(s.display);
      const first = s.operator === "+" ? s.first + second : s.first - second;
      return { ...s, second, first, operator: a.op, display: String(first), state: "operator" };
    }
    case "eq": {
      if (s.state !== "second") return s;
      const second = Number(s.display);
      const result = s.operator === "+" ? s.first + second : s.first - second;
      return { ...s, second, display: String(result), replace: true, state: "first" };
    }
    case "ce":
      return { ...s, display: "0" };
    default:
      return s;
  }
}

export default function Calculator() {
  const [s, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === "=") { e.preventDefault(); dispatch({ type: "eq" }); }
      else if (e.key === "Escape") dispatch({ type: "ce" });
      else if (e.key >= "0" && e.key <= "9" && e.key.length === 1) dispatch({ type: "number", value: e.key });
      else if (e.key === "-" || e.key === "+") dispatch({ type: "operator", op: e.key });
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const num = (n, cls = "purple") => <button className={cls} onClick={() => dispatch({ type: "number", value: n })}>{n}</button>;
  const off = (label, cls = "green") => <button className={cls} disabled>{label}</button>;

  return (
    <div className="oldCal">
      <div className="calcOuter">
        <div className="calcInner">
          <div className="calcScreen">{insertSeparator(s.display)}</div>
          <div className="calcRow">{off("MC")}{off("MR")}{off("M+")}{off("M-")}<button className="red" onClick={() => dispatch({ type: "ce" })}>CE</button></div>
          <div className="calcRow">{num(7)}{num(8)}{num(9)}{off("÷")}{off("√")}</div>
          <div className="calcRow">{num(4)}{num(5)}{num(6)}{off("x")}{off("%")}</div>
          <div className="calcRow">{num(1)}{num(2)}{num(3)}<button className="green" onClick={() => dispatch({ type: "operator", op: "-" })}>-</button>{off("1/x")}</div>
          <div className="calcRow">{num(0)}{off(".", "purple")}{off("±", "purple")}<button className="green" onClick={() => dispatch({ type: "operator", op: "+" })}>+</button><button className="green" onClick={() => dispatch({ type: "eq" })}>=</button></div>
        </div>
        <div className="calcStudent">68085725 ปวีณ์กร เป็ดแก้ว</div>
      </div>
    </div>
  );
}
