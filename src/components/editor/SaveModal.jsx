import { useState } from "react";

const SaveModal = ({ onSave, onClose }) => {
  const [templateName, setTemplateName] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-semibold">Save Template</h2>

        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          className="mb-4 w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Enter template name..."
        />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(templateName)}
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
            disabled={!templateName.trim()}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
