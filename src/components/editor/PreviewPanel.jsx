import { useRecoilValue } from "recoil";
import { editorAtom } from "../../store/atoms/editorAtom";

const PreviewPanel = () => {
  const editorState = useRecoilValue(editorAtom);

  return (
    <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">Preview</h2>

      <div className="flex-1 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="mx-auto max-w-xl">
          {/* Email Preview */}
          <div
            style={{
              backgroundColor: editorState.style.backgroundColor,
              color: editorState.style.textColor,
              fontFamily: editorState.style.fontFamily,
              padding: editorState.style.spacing,
            }}
            className="min-h-[500px] rounded-lg bg-white p-6 shadow-sm"
          >
            <div
              dangerouslySetInnerHTML={{ __html: editorState.content.body }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
