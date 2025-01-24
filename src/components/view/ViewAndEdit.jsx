import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plus, Image } from "lucide-react";
import Sidebar from "../layout/Sidebar";
import { useTemplate } from "../../hooks/useTemplates";

const ViewAndEdit = () => {
  const navigate = useNavigate();
  const { id: templateId } = useParams();
  const { templateById, fetchTemplateById } = useTemplate();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [templateData, setTemplateData] = useState(null);

  const memoizedFetchTemplateById = useCallback(fetchTemplateById, []);

  useEffect(() => {
    if (templateId) {
      memoizedFetchTemplateById(templateId); // Use memoized version
    }
  }, [templateId, memoizedFetchTemplateById]);

  useEffect(() => {
    if (templateById) {
      setTemplateData(templateById.template);
    }
  }, [templateById]);

  const handleBack = () => {
    if (isEditing) {
      setIsEditing(false);
      setSelectedBlockId(null);
    } else {
      navigate("/templates");
    }
  };

  const handleSaveChanges = () => {
    if (!templateId) {
      console.error("Template ID is undefined or invalid!");
      return;
    }
    navigate(`/builder/${templateId}`);
  };

  console.log("Template ID in ViewAndEdit:", templateId);

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
          <button
            className="px-6 py-3 rounded-md text-white"
            style={{
              backgroundColor: block.style.backgroundColor,
              color: block.style.textColor,
            }}
          >
            {block.content}
          </button>
        );
      case "image":
        return (
          <div className="w-full">
            <img
              src={block.content.url}
              alt={block.content.alt}
              className="w-full object-cover rounded-lg"
              style={{ maxWidth: block.style.width }}
            />
          </div>
        );
      default:
        return <p>{block.content}</p>;
    }
  };

  if (!templateData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading template...</p>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col bg-gray-50">
        <div className="flex-1 flex flex-col w-full">
          <header className="bg-white shadow px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {templateData.name}
              </h1>
              <div className="space-x-4">
                <button
                  onClick={handleBack}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                >
                  {isEditing ? "Cancel" : "Back"}
                </button>
                <button
                  onClick={() => {
                    if (isEditing) {
                      // Save changes (optional: validate before redirect)
                      handleSaveChanges();
                    } else {
                      navigate(`/builder`, {
                        state: {
                          id: templateId, // Pass the templateId
                          templateData, // Pass the template details
                        },
                      });
                    }
                    setIsEditing(!isEditing);
                  }}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </header>

          <div className="flex flex-1 justify-center items-center p-8">
            {/* Centered and Styled Container */}
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-4xl">
              <div>
                {templateData.content.map((block) => (
                  <div
                    key={block._id}
                    className={`p-2 my-2 cursor-pointer rounded ${
                      selectedBlockId === block._id && isEditing
                        ? "bg-blue-50"
                        : ""
                    }`}
                    onClick={() => isEditing && setSelectedBlockId(block._id)}
                    style={{
                      fontFamily: block.style.fontFamily,
                      fontWeight: block.style.fontWeight,
                      color: block.style.textColor,
                      backgroundColor: block.style.backgroundColor,
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

          {isEditing && (
            <aside className="w-80 h-full bg-white border-l shadow-lg overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Block Editor Code Here */}
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewAndEdit;
