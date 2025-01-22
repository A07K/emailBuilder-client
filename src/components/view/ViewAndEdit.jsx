import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Sidebar from "../layout/Sidebar";

const ViewAndEdit = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [globalStyles, setGlobalStyles] = useState({
    backgroundColor: "#ffffff",
    canvasColor: "#ffffff",
    canvasBorderColor: "#e5e7eb",
    canvasBorderRadius: 0,
    fontFamily: "Modern sans",
    textColor: "#0a1172",
  });

  // Sample template data
  const [blocks] = useState([
    {
      id: "1",
      type: "heading",
      content: "Welcome to our platform!",
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
        "We're excited to have you here. Let's get started with your journey.",
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
        initials: "JS",
        name: "John Smith",
        status: "Premium Member since 2023",
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
      content: "Get Started",
      style: {
        fontFamily: "Modern sans",
        fontWeight: "500",
        textColor: "#ffffff",
        backgroundColor: "#0a1172",
      },
    },
  ]);

  const handleBack = () => {
    if (isEditing) {
      setIsEditing(false);
      setSelectedBlockId(null);
    } else {
      navigate("/templates");
    }
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
      default:
        return <p>{block.content}</p>;
    }
  };

  const renderBlockEditor = () => {
    if (!selectedBlockId) return null;

    const selectedBlock = blocks.find((block) => block.id === selectedBlockId);
    if (!selectedBlock) return null;

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
                placeholder="Name"
              />
              <input
                type="text"
                className="w-full rounded-md border p-2 text-sm mb-2"
                value={selectedBlock.content.initials}
                placeholder="Initials"
              />
              <input
                type="text"
                className="w-full rounded-md border p-2 text-sm"
                value={selectedBlock.content.status}
                placeholder="Status"
              />
            </>
          ) : (
            <input
              type="text"
              className="w-full rounded-md border p-2 text-sm"
              value={
                typeof selectedBlock.content === "string"
                  ? selectedBlock.content
                  : ""
              }
            />
          )}
        </div>

        {/* Font Properties */}
        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Font family</label>
          <select
            className="w-full rounded-md border p-1.5 text-sm"
            value={selectedBlock.style.fontFamily}
          >
            <option value="Modern sans">Modern sans</option>
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm text-gray-600">Text color</label>
          <input
            type="color"
            className="w-full rounded border p-1"
            value={selectedBlock.style.textColor}
          />
        </div>

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
          />
          <button className="mt-1 text-sm text-blue-600">
            Set transparent
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col bg-gray-50">
        {/* Main Content Area - Dynamically adjusts width */}
        <div className="flex-1 flex flex-col w-full">
          {/* Header */}
          <header
            className={`bg-white shadow px-8 py-4 transition-all duration-300 ${
              isEditing ? "pr-6" : "pr-6"
            }`}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Edit your Template
              </h1>
              <div className="space-x-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  {isEditing ? "Cancel" : "Back"}
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex flex-1">
            <main
              className={`flex-1 p-8 transition-all duration-300 ${
                isEditing ? "pr-8" : ""
              }`}
            >
              <div>
                <div className="max-w-6xl mx-auto">
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6">
                      {blocks.map((block) => (
                        <div
                          key={block.id}
                          className={`p-2 my-2 cursor-pointer rounded ${
                            selectedBlockId === block.id && isEditing
                              ? "bg-blue-50"
                              : ""
                          }`}
                          onClick={() =>
                            isEditing && setSelectedBlockId(block.id)
                          }
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
                      {isEditing && (
                        <button className="mt-4 flex items-center text-gray-500 hover:text-gray-700">
                          <Plus className="w-4 h-4 mr-2" />
                          Add block
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Right Sidebar - Positioned under the header */}
            {isEditing && (
              <aside className="w-80 h-full bg-white border-l shadow-lg overflow-y-auto">
                <div className="p-6 space-y-6">
                  {/* Block-specific controls */}
                  {renderBlockEditor()}

                  <hr />

                  {/* Global style controls */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      GLOBAL
                    </h3>

                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600">
                        Backdrop color
                      </label>
                      <input
                        type="color"
                        className="w-full rounded border p-1"
                        value={globalStyles.backgroundColor}
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
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm text-gray-600">
                        Canvas border radius
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="20"
                          className="flex-1"
                          value={globalStyles.canvasBorderRadius}
                        />
                        <span className="text-sm text-gray-500 w-12">
                          {globalStyles.canvasBorderRadius}px
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewAndEdit;
