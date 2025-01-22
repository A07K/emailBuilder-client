import { useRecoilState } from "recoil";
import { editorAtom } from "../../store/atoms/editorAtom";
import ColorControl from "./controls/ColorControl";

const EditPanel = () => {
  const [editorState, setEditorState] = useRecoilState(editorAtom);

  return (
    <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">Edit Email</h2>

      {/* Subject Line */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Subject Line
        </label>
        <input
          type="text"
          value={editorState.content.subject}
          onChange={(e) =>
            setEditorState({
              ...editorState,
              content: { ...editorState.content, subject: e.target.value },
            })
          }
          className="w-full rounded-lg border border-gray-200 p-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Enter email subject..."
        />
      </div>

      {/* Rich Text Editor */}
      <div className="flex-1">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email Content
        </label>
        <div className="min-h-[500px] rounded-lg border border-gray-200 p-4">
          <div
            contentEditable
            dangerouslySetInnerHTML={{ __html: editorState.content.body }}
            onBlur={(e) =>
              setEditorState({
                ...editorState,
                content: { ...editorState.content, body: e.target.innerHTML },
              })
            }
            className="h-full focus:outline-none"
          />
        </div>
      </div>

      {/* Style Controls */}
      <div className="mt-6 space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Styling</h3>
        <div className="grid grid-cols-2 gap-4">
          <ColorControl
            label="Background Color"
            value={editorState.style.backgroundColor}
            onChange={(color) =>
              setEditorState({
                ...editorState,
                style: { ...editorState.style, backgroundColor: color },
              })
            }
          />
          <ColorControl
            label="Text Color"
            value={editorState.style.textColor}
            onChange={(color) =>
              setEditorState({
                ...editorState,
                style: { ...editorState.style, textColor: color },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EditPanel;
