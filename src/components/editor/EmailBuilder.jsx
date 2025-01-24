import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Sidebar from "../layout/Sidebar";
import { useSetRecoilState } from "recoil";
import { templatesAtom } from "../../store/atoms/templatesAtom";
import SaveTemplateDialog from "../templates/SaveTemplateDialog";
import { useTemplate } from "../../hooks/useTemplates";
import { useLocation } from "react-router-dom";

const EmailBuilderEditor = () => {
  const [blocks, setBlocks] = useState([
    {
      id: "1",
      type: "heading",
      content: "Elaina arrives Sunday, May 21.",
      style: {
        fontFamily: "Modern sans",
        fontWeight: "normal",
        textColor: "#0a1172",
        backgroundColor: "transparent",
      },
    },
    {
      id: "2",
      type: "paragraph",
      content:
        "If you haven't already, reach out to Elaina to send directions and coordinate check-in time.",
      style: {
        fontFamily: "Modern sans",
        fontWeight: "normal",
        textColor: "#0a1172",
        backgroundColor: "transparent",
      },
    },
    {
      id: "3",
      type: "member-card",
      content: {
        initials: "EL",
        name: "Elaina",
        status: "United States Member since 2013",
      },
      style: {
        fontFamily: "Modern sans",
        fontWeight: "normal",
        textColor: "#0a1172",
        backgroundColor: "#f8f9fa",
      },
    },
    {
      id: "4",
      type: "button",
      content: "Send Elaina a message",
      style: {
        fontFamily: "Modern sans",
        fontWeight: "500",
        textColor: "#ffffff",
        backgroundColor: "#0a1172",
      },
    },
  ]);

  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const selectedBlock = blocks.find((block) => block.id === selectedBlockId);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const setTemplates = useSetRecoilState(templatesAtom);
  const { createTemplate, updateTemplate } = useTemplate();

  const location = useLocation();
  const { id: templateId, templateData } = location.state || {}; // Safely destructure state

  useEffect(() => {
    console.log("Template ID in EmailBuilder:", templateId);
    console.log("Template Details in EmailBuilder:", templateData);
    if (templateData) {
      // Reset blocks with the template's content
      setBlocks(
        templateData.content.map((block, index) => ({
          ...block,
          id: String(index + 1), // Ensure unique IDs
        }))
      );

      // Update global styles if template has specific global settings
      if (templateData.globalStyles) {
        setGlobalStyles(templateData.globalStyles);
      }

      // Optional: Set template name if you want to pre-fill the save dialog
      setTemplateName(templateData.name || "");
      setIsFavorite(templateData.isFavorite || false);
    }

    // Use templateId and templateData for updating or displaying the template
  }, [templateId, templateData]);

  const [globalStyles, setGlobalStyles] = useState({
    backgroundColor: "#ffffff",
    canvasColor: "#ffffff",
    canvasBorderColor: "#e5e7eb",
    canvasBorderRadius: 0,
    fontFamily: "Modern sans",
    textColor: "#0a1172",
  });

  const blockTypes = [
    { type: "heading", label: "Heading Block" },
    { type: "paragraph", label: "Paragraph Block" },
    { type: "member-card", label: "Member Card Block" },
    { type: "button", label: "Button Block" },
    { type: "image", label: "Image Block" },
  ];

  const handleGlobalStyleChange = (key, value) => {
    setGlobalStyles((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateBlockContent = (content) => {
    setBlocks(
      blocks.map((block) =>
        block.id === selectedBlockId
          ? {
              ...block,
              content:
                typeof content === "object"
                  ? { ...block.content, ...content }
                  : content,
            }
          : block
      )
    );
  };

  const updateBlockStyle = (styleUpdate) => {
    setBlocks(
      blocks.map((block) =>
        block.id === selectedBlockId
          ? { ...block, style: { ...block.style, ...styleUpdate } }
          : block
      )
    );
  };

  const addNewBlock = (blockType) => {
    const newBlock = {
      id: String(blocks.length + 1),
      type: blockType,
      content:
        blockType === "member-card"
          ? { initials: "XX", name: "Name", status: "Status" }
          : blockType === "image"
          ? { url: "/api/placeholder/400/300", alt: "Image description" }
          : blockType === "heading"
          ? "New Heading"
          : blockType === "button"
          ? "New Button"
          : "New paragraph",
      style: {
        fontFamily: globalStyles.fontFamily,
        fontWeight: "normal",
        textColor: globalStyles.textColor,
        backgroundColor: "transparent",
        ...(blockType === "image" && { width: "100%" }),
      },
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    setShowBlockSelector(false);
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case "heading":
        return <h2 className="text-2xl">{block.content}</h2>;
      case "paragraph":
        return <p>{block.content}</p>;
      case "member-card":
        return (
          <div className="bg-gray-50 p-5 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xl">{block.content.initials}</span>
              </div>
              <div>
                <h3 className="font-medium">{block.content.name}</h3>
                <p className="text-sm text-gray-600">{block.content.status}</p>
              </div>
            </div>
          </div>
        );
      case "button":
        return (
          <button className="px-6 py-3 rounded-md text-white">
            {block.content}
          </button>
        );
      case "image":
        return (
          <img
            src={block.content.url}
            alt={block.content.alt}
            className="max-w-full h-auto rounded"
            style={{ width: block.style.width }}
          />
        );
      default:
        return <p>{block.content}</p>;
    }
  };

  const renderBlockEditor = () => {
    if (!selectedBlock) {
      return (
        <div className="text-center text-sm text-gray-500">
          Select a block to edit its properties
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">
            {selectedBlock.type.toUpperCase()} BLOCK
          </h3>
        </div>

        {/* Content Input */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Content</label>
          {selectedBlock.type === "member-card" ? (
            <>
              <input
                type="text"
                className="w-full rounded-md border p-2 text-sm mb-2"
                value={selectedBlock.content.name}
                onChange={(e) => updateBlockContent({ name: e.target.value })}
                placeholder="Name"
              />
              <input
                type="text"
                className="w-full rounded-md border p-2 text-sm mb-2"
                value={selectedBlock.content.initials}
                onChange={(e) =>
                  updateBlockContent({ initials: e.target.value })
                }
                placeholder="Initials"
              />
              <input
                type="text"
                className="w-full rounded-md border p-2 text-sm"
                value={selectedBlock.content.status}
                onChange={(e) => updateBlockContent({ status: e.target.value })}
                placeholder="Status"
              />
            </>
          ) : selectedBlock.type === "image" ? (
            <>
              <input
                type="text"
                className="w-full rounded-md border p-2 text-sm mb-2"
                value={selectedBlock.content.url}
                onChange={(e) => updateBlockContent({ url: e.target.value })}
                placeholder="Image URL"
              />
              <input
                type="text"
                className="w-full rounded-md border p-2 text-sm mb-2"
                value={selectedBlock.content.alt}
                onChange={(e) => updateBlockContent({ alt: e.target.value })}
                placeholder="Alt text"
              />
              <input
                type="range"
                min="20"
                max="100"
                value={parseInt(selectedBlock.style.width)}
                onChange={(e) =>
                  updateBlockStyle({ width: `${e.target.value}%` })
                }
                className="w-full"
              />
              <span className="text-sm text-gray-500">
                Width: {selectedBlock.style.width}
              </span>
            </>
          ) : (
            <input
              type="text"
              className="w-full rounded-md border p-2 text-sm"
              value={selectedBlock.content}
              onChange={(e) => updateBlockContent(e.target.value)}
            />
          )}
        </div>

        {/* Font Properties */}
        {selectedBlock.type !== "image" && (
          <>
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Font family</label>
              <select
                className="w-full rounded-md border p-1.5 text-sm"
                value={selectedBlock.style.fontFamily}
                onChange={(e) =>
                  updateBlockStyle({ fontFamily: e.target.value })
                }
              >
                <option value="Modern sans">Modern sans</option>
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Font weight</label>
              <div className="flex rounded-md border">
                <button
                  className={`flex-1 border-r px-3 py-1.5 text-sm ${
                    selectedBlock.style.fontWeight === "normal"
                      ? "bg-gray-100"
                      : ""
                  }`}
                  onClick={() => updateBlockStyle({ fontWeight: "normal" })}
                >
                  Regular
                </button>
                <button
                  className={`flex-1 px-3 py-1.5 text-sm ${
                    selectedBlock.style.fontWeight === "bold"
                      ? "bg-gray-100"
                      : ""
                  }`}
                  onClick={() => updateBlockStyle({ fontWeight: "bold" })}
                >
                  Bold
                </button>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <label className="block text-sm text-gray-600">Text color</label>
              <input
                type="color"
                className="w-full rounded border p-1"
                value={selectedBlock.style.textColor}
                onChange={(e) =>
                  updateBlockStyle({ textColor: e.target.value })
                }
              />
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="block text-sm text-gray-600">
            Background color
          </label>
          <input
            type="color"
            className="w-full rounded border p-1"
            value={
              selectedBlock.style.backgroundColor === "transparent"
                ? "#ffffff"
                : selectedBlock.style.backgroundColor
            }
            onChange={(e) =>
              updateBlockStyle({ backgroundColor: e.target.value })
            }
          />
          <button
            className="mt-1 text-sm text-blue-600"
            onClick={() => updateBlockStyle({ backgroundColor: "transparent" })}
          >
            Set transparent
          </button>
        </div>
      </div>
    );
  };

  const handleSaveTemplate = async () => {
    try {
      const templateData = {
        name: templateName,
        content: (blocks || []).map(({ id, ...block }) => ({
          ...block,
          style: Object.fromEntries(
            Object.entries(block.style).filter(
              ([_, value]) => value !== undefined
            )
          ),
        })),
        isFavorite: isFavorite,
      };

      // Check if templateId exists (from location.state)
      if (templateId) {
        // If templateId exists, update the existing template
        await updateTemplate(templateId, templateData);
      } else {
        // If no templateId, create a new template
        await createTemplate(templateData);
      }

      // Close the save dialog
      setIsSaveDialogOpen(false);
    } catch (error) {
      console.error("Failed to save template:", error);
    }
  };

  return (
    <>
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <div className="flex flex-1 flex-col">
          {/* Top Bar */}
          <div className="flex h-14 items-center justify-between border-b bg-white px-4">
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                ← Back
              </button>
              <h1 className="text-lg font-medium">Welcome email</h1>
            </div>

            <div className="flex items-center space-x-2">
              <button className="rounded px-3 py-1.5 hover:bg-gray-100">
                Discard
              </button>
              <button
                onClick={() => setIsSaveDialogOpen(true)}
                className="rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-1">
            {/* Email Builder Area */}
            <div
              className="flex-1 overflow-y-auto bg-gray-100 p-8"
              style={{ maxHeight: "calc(100vh - 56px)" }}
            >
              <div className="mx-auto max-w-4xl">
                <div
                  className="min-h-96 rounded-lg bg-white p-8 shadow-sm"
                  style={{
                    backgroundColor: globalStyles.canvasColor,
                    borderColor: globalStyles.canvasBorderColor,
                    borderRadius: `${globalStyles.canvasBorderRadius}px`,
                  }}
                >
                  {blocks.map((block) => (
                    <div
                      key={block.id}
                      className={`p-2 my-2 cursor-pointer rounded ${
                        selectedBlockId === block.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedBlockId(block.id)}
                      style={{
                        fontFamily: block.style.fontFamily,
                        fontWeight: block.style.fontWeight,
                        color: block.style.textColor,
                        backgroundColor:
                          block.style.backgroundColor === "transparent"
                            ? "transparent"
                            : block.style.backgroundColor,
                      }}
                    >
                      {renderBlock(block)}
                    </div>
                  ))}
                  {showBlockSelector ? (
                    <div className="mt-4 p-4 border rounded-lg bg-white shadow-sm">
                      <h4 className="text-sm font-medium mb-2">
                        Select Block Type
                      </h4>
                      {blockTypes.map((blockType) => (
                        <button
                          key={blockType.type}
                          onClick={() => addNewBlock(blockType.type)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-md text-sm"
                        >
                          {blockType.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowBlockSelector(true)}
                      className="mt-4 flex items-center text-gray-500 hover:text-gray-700"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add block
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar Controls */}
            <div
              className="w-80 border-l bg-white overflow-y-auto p-4"
              style={{ maxHeight: "calc(100vh - 56px)" }}
            >
              <div className="p-4">
                <div className="space-y-4">
                  {/* Block-specific controls */}
                  {renderBlockEditor()}
                  <hr />
                  <h3 className="text-sm font-medium">GLOBAL</h3>

                  {/* Global style controls */}
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      Backdrop color
                    </label>
                    <input
                      type="color"
                      className="w-full rounded border p-1"
                      value={globalStyles.backgroundColor}
                      onChange={(e) =>
                        handleGlobalStyleChange(
                          "backgroundColor",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      Canvas color
                    </label>
                    <input
                      type="color"
                      className="w-full rounded border p-1"
                      value={globalStyles.canvasColor}
                      onChange={(e) =>
                        handleGlobalStyleChange("canvasColor", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      Canvas border color
                    </label>
                    <input
                      type="color"
                      className="w-full rounded border p-1"
                      value={globalStyles.canvasBorderColor}
                      onChange={(e) =>
                        handleGlobalStyleChange(
                          "canvasBorderColor",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm text-gray-600">
                      Canvas border radius
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      className="w-full"
                      value={globalStyles.canvasBorderRadius}
                      onChange={(e) =>
                        handleGlobalStyleChange(
                          "canvasBorderRadius",
                          Number(e.target.value)
                        )
                      }
                    />
                    <span className="text-sm text-gray-500">
                      {globalStyles.canvasBorderRadius}px
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SaveTemplateDialog
        isOpen={isSaveDialogOpen}
        onClose={() => setIsSaveDialogOpen(false)}
        onSave={handleSaveTemplate}
        templateName={templateName}
        setTemplateName={setTemplateName}
        isFavorite={isFavorite}
        setIsFavorite={setIsFavorite}
        blocks={blocks}
        templateId={templateId}
      />
    </>
  );
};

export default EmailBuilderEditor;
