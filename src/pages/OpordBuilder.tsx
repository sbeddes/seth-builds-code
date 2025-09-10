import { useEffect, useState } from "react";

// Types
export type LLABRow = { activity: string; location: string; pocic: string; minutes: number };
export type Attachment = { name: string; imageDataUrl?: string };

export interface State {
  meta: {
    title: string;
    unit: string;
    opordNumber: string;
    dtgLocal: string;
    location: string;
    classification: string;
  };
  llabWindow: { start: string; end: string };
  llabRows: LLABRow[];
  attachments: Attachment[];
}

const defaultState: State = {
  meta: {
    title: "",
    unit: "",
    opordNumber: "",
    dtgLocal: "",
    location: "",
    classification: "",
  },
  llabWindow: { start: "", end: "" },
  llabRows: [{ activity: "", location: "", pocic: "", minutes: 0 }],
  attachments: [],
};

export default function OpordBuilder() {
  const [state, setState] = useState<State>(() => {
    const saved = localStorage.getItem("opord-state");
    return saved ? { ...defaultState, ...JSON.parse(saved) } : defaultState;
  });

  useEffect(() => {
    localStorage.setItem("opord-state", JSON.stringify(state));
  }, [state]);

  const handleMetaChange = (key: keyof State["meta"], value: string) => {
    setState((s) => ({ ...s, meta: { ...s.meta, [key]: value } }));
  };

  const handleWindowChange = (key: keyof State["llabWindow"], value: string) => {
    setState((s) => ({ ...s, llabWindow: { ...s.llabWindow, [key]: value } }));
  };

  const handleRowChange = (idx: number, key: keyof LLABRow, value: string) => {
    setState((s) => {
      const rows = [...s.llabRows];
      rows[idx] = { ...rows[idx], [key]: key === "minutes" ? Number(value) : value } as LLABRow;
      return { ...s, llabRows: rows };
    });
  };

  const addRow = () => {
    setState((s) => ({ ...s, llabRows: [...s.llabRows, { activity: "", location: "", pocic: "", minutes: 0 }] }));
  };

  const removeRow = (idx: number) => {
    setState((s) => ({ ...s, llabRows: s.llabRows.filter((_, i) => i !== idx) }));
  };

  const addAttachment = () => {
    setState((s) => ({ ...s, attachments: [...s.attachments, { name: "" }] }));
  };

  const handleAttachmentChange = (idx: number, name: string) => {
    setState((s) => {
      const atts = [...s.attachments];
      atts[idx] = { ...atts[idx], name };
      return { ...s, attachments: atts };
    });
  };

  const handleAttachmentFile = (idx: number, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setState((s) => {
        const atts = [...s.attachments];
        atts[idx] = { ...atts[idx], imageDataUrl: e.target?.result as string };
        return { ...s, attachments: atts };
      });
    };
    reader.readAsDataURL(file);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "opord.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        setState({ ...defaultState, ...data });
      } catch {
        console.error("Invalid JSON");
      }
    };
    reader.readAsText(file);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }).replace(":", "");

  const computeSchedule = () => {
    const { start, end } = state.llabWindow;
    if (!start || !end) {
      return { rows: state.llabRows, gap: 0, overflow: false };
    }
    const startDate = new Date(start);
    const endDate = new Date(end);
    const rows: (LLABRow & { time: string })[] = [];
    let current = new Date(startDate);
    let overflow = false;
    for (const r of state.llabRows) {
      const next = new Date(current.getTime() + (r.minutes || 0) * 60000);
      if (next > endDate) {
        overflow = true;
        break;
      }
      rows.push({ ...r, time: formatTime(current) });
      current = next;
    }
    const used = (current.getTime() - startDate.getTime()) / 60000;
    const total = (endDate.getTime() - startDate.getTime()) / 60000;
    const gap = Math.max(total - used, 0);
    return { rows, gap, overflow };
  };

  const { rows: scheduleRows, gap, overflow } = computeSchedule();

  const handlePrint = () => {
    const content = document.getElementById("opord-preview")?.innerHTML;
    if (!content) return;
    const w = window.open("", "", "width=800,height=600");
    if (!w) return;
    w.document.write("<html><head><title>OPORD</title>");
    w.document.write(
      `<style>@page{margin:15mm;} table{font-family:'Times New Roman';font-size:10pt;border-collapse:collapse;width:100%;} th{font-size:14pt;font-weight:bold;} td,th{border:1px solid #000;padding:2px;} footer{position:fixed;bottom:0;width:100%;text-align:center;font-size:10pt;font-family:'Times New Roman';} footer:after{content:'Page ' counter(page) ' of ' counter(pages);}</style>`
    );
    w.document.write("</head><body>" + content + "<footer></footer></body></html>");
    w.document.close();
    w.focus();
    w.print();
  };

  const handleExportDocx = () => {
    // Placeholder: docx export requires additional dependencies not available in this environment.
    alert("DOCX export not available in this environment.");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">OPORD Table Builder</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <form className="space-y-2 md:w-1/2" onSubmit={(e) => e.preventDefault()}>
          <h2 className="text-lg font-semibold">Metadata</h2>
          {Object.entries(state.meta).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium" htmlFor={key}>
                {key}
              </label>
              <input
                id={key}
                className="border p-1"
                value={value}
                onChange={(e) => handleMetaChange(key as keyof State["meta"], e.target.value)}
              />
            </div>
          ))}
          <h2 className="text-lg font-semibold mt-4">LLAB Window</h2>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              className="border p-1 flex-1"
              value={state.llabWindow.start}
              onChange={(e) => handleWindowChange("start", e.target.value)}
            />
            <input
              type="datetime-local"
              className="border p-1 flex-1"
              value={state.llabWindow.end}
              onChange={(e) => handleWindowChange("end", e.target.value)}
            />
          </div>
          <h2 className="text-lg font-semibold mt-4">LLAB Schedule</h2>
          {state.llabRows.map((r, idx) => (
            <div key={idx} className="grid grid-cols-5 gap-1 items-end">
              <input
                className="border p-1 col-span-2"
                placeholder="Activity"
                value={r.activity}
                onChange={(e) => handleRowChange(idx, "activity", e.target.value)}
              />
              <input
                className="border p-1"
                placeholder="Location"
                value={r.location}
                onChange={(e) => handleRowChange(idx, "location", e.target.value)}
              />
              <input
                className="border p-1"
                placeholder="POCIC"
                value={r.pocic}
                onChange={(e) => handleRowChange(idx, "pocic", e.target.value)}
              />
              <input
                className="border p-1"
                type="number"
                placeholder="Min"
                value={r.minutes}
                onChange={(e) => handleRowChange(idx, "minutes", e.target.value)}
              />
              <button type="button" className="text-sm text-red-600" onClick={() => removeRow(idx)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="mt-2 text-sm" onClick={addRow}>
            Add Row
          </button>
          <h2 className="text-lg font-semibold mt-4">Attachments</h2>
          {state.attachments.map((a, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                className="border p-1 flex-1"
                placeholder="Name"
                value={a.name}
                onChange={(e) => handleAttachmentChange(idx, e.target.value)}
              />
              <input type="file" accept="image/*" onChange={(e) => handleAttachmentFile(idx, e.target.files?.[0] || null)} />
            </div>
          ))}
          <button type="button" className="mt-2 text-sm" onClick={addAttachment}>
            Add Attachment
          </button>
        </form>
        <div className="md:w-1/2">
          <div id="opord-preview">
            <table style={{ fontFamily: "Times New Roman", fontSize: "10pt", width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th colSpan={4} style={{ fontSize: "14pt", fontWeight: "bold", border: "1px solid #000" }}>
                    {state.meta.title || "OPORD"}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #000", width: "20%" }}>Unit</td>
                  <td style={{ border: "1px solid #000" }} colSpan={3}>
                    {state.meta.unit}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #000" }}>OPORD #</td>
                  <td style={{ border: "1px solid #000" }} colSpan={3}>
                    {state.meta.opordNumber}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #000" }}>DTG</td>
                  <td style={{ border: "1px solid #000" }} colSpan={3}>
                    {state.meta.dtgLocal}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #000" }}>Location</td>
                  <td style={{ border: "1px solid #000" }} colSpan={3}>
                    {state.meta.location}
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "1px solid #000" }}>Classification</td>
                  <td style={{ border: "1px solid #000" }} colSpan={3}>
                    {state.meta.classification}
                  </td>
                </tr>
                <tr>
                  <th style={{ border: "1px solid #000" }}>Time</th>
                  <th style={{ border: "1px solid #000" }}>Activity</th>
                  <th style={{ border: "1px solid #000" }}>Location</th>
                  <th style={{ border: "1px solid #000" }}>POCIC</th>
                </tr>
                {scheduleRows.map((r, idx) => (
                  <tr key={idx}>
                    <td style={{ border: "1px solid #000" }}>{r.time}</td>
                    <td style={{ border: "1px solid #000" }}>{r.activity}</td>
                    <td style={{ border: "1px solid #000" }}>{r.location}</td>
                    <td style={{ border: "1px solid #000" }}>{r.pocic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {state.attachments.length > 0 && (
              <div style={{ fontFamily: "Times New Roman", fontSize: "10pt", marginTop: "8px" }}>
                <div style={{ fontWeight: "bold", fontSize: "14pt" }}>Attachments</div>
                <ol>
                  {state.attachments.map((a, idx) => (
                    <li key={idx}>
                      Attachment {idx + 1} - {a.name}
                      {a.imageDataUrl && <div><img src={a.imageDataUrl} alt="attachment" style={{ maxWidth: "200px" }} /></div>}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <button type="button" className="border px-2 py-1" onClick={handlePrint}>
              Print
            </button>
            <button type="button" className="border px-2 py-1" onClick={handleExportDocx}>
              Export DOCX
            </button>
            <button type="button" className="border px-2 py-1" onClick={exportJson}>
              Export JSON
            </button>
            <input type="file" accept="application/json" onChange={(e) => importJson(e.target.files?.[0] || null)} />
          </div>
          {gap > 0 && <p className="text-sm text-yellow-700 mt-2">Gap of {gap} minutes remaining.</p>}
          {overflow && <p className="text-sm text-red-700">Overflow: activity exceeds window end.</p>}
        </div>
      </div>
    </div>
  );
}

