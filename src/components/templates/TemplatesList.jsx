import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { templatesAtom } from "../../store/atoms/templatesAtom";
import { editorAtom } from "../../store/atoms/editorAtom";
import { formatDistanceToNow } from "date-fns";
import {
  Search,
  Star,
  StarOff,
  Clock,
  Archive,
  ChevronRight,
} from "lucide-react";
import Sidebar from "../layout/Sidebar";

const TemplatesList = () => {
  const navigate = useNavigate();
  const templates = useRecoilValue(templatesAtom);
  const setTemplates = useSetRecoilState(templatesAtom);
  const setEditorState = useSetRecoilState(editorAtom);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const loadTemplate = (template) => {
    setEditorState({
      content: template.content,
      style: template.style,
    });
    navigate(`/view/${template.id}`, { state: { template } });
  };

  const filteredTemplates = templates
    .filter((template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((template) => {
      if (activeTab === "favorites") return template.isFavorite;
      if (activeTab === "recent") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(template.createdAt) > thirtyDaysAgo;
      }
      return true;
    });

  const TabButton = ({ icon: Icon, label, value }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
        activeTab === value
          ? "bg-primary/10 text-primary"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );

  const toggleFavorite = (templateId) => {
    setTemplates((prevTemplates) =>
      prevTemplates.map((template) =>
        template.id === templateId
          ? { ...template, isFavorite: !template.isFavorite }
          : template
      )
    );
  };

  return (
    <>
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto p-8">
          {/* Header Section */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Templates</h1>
            <p className="text-lg text-gray-600">
              Browse and manage your email templates
            </p>
          </div>

          {/* Search and Tabs */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="flex space-x-4">
              <TabButton icon={Archive} label="All Templates" value="all" />
              <TabButton icon={Star} label="Favorites" value="favorites" />
              <TabButton icon={Clock} label="Recent" value="recent" />
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:border-primary hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    {template.name}
                  </h3>
                  <button
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(template.id);
                    }}
                  >
                    {template.isFavorite ? (
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ) : (
                      <StarOff className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                  Created {formatDistanceToNow(new Date(template.createdAt))}{" "}
                  ago
                </p>

                <button
                  onClick={() => loadTemplate(template)}
                  className="flex items-center text-primary hover:text-primary/90 font-medium text-sm"
                >
                  View Template
                  <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            ))}

            {filteredTemplates.length === 0 && (
              <div className="col-span-full">
                <div className="rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
                  <p className="text-gray-500 mb-2">No templates found</p>
                  <p className="text-sm text-gray-400">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : "Start creating templates to see them here"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplatesList;
