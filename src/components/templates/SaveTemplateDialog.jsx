import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { Star, StarOff } from "lucide-react";
import { useTemplate } from "../../hooks/useTemplates";

const SaveTemplateDialog = ({
  isOpen,
  onClose,
  templateName,
  setTemplateName,
  isFavorite,
  setIsFavorite,
  blocks, // Add blocks as a prop
}) => {
  const { createTemplate } = useTemplate();
  console.log("Blocks:", blocks);

  const handleSaveTemplate = async () => {
    try {
      // Prepare the template data according to the schema
      const templateData = {
        name: templateName,
        content: blocks.map(({ id, ...block }) => ({
          ...block,
          style: Object.fromEntries(
            Object.entries(block.style).filter(
              ([_, value]) => value !== undefined
            )
          ),
        })),
        isFavorite: isFavorite,
      };

      // Call the createTemplate hook
      await createTemplate(templateData);

      // Close the dialog
      onClose();

      // Optional: Add toast or success notification
    } catch (error) {
      console.error("Failed to save template:", error);
      // Optional: Add error toast or notification
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="border-b border-gray-200 pb-3 pt-4 pl-2">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Save Template
          </DialogTitle>
        </div>
        <div className="space-y-6 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 px-2">
              Template Name
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary p-2"
              placeholder="Enter template name..."
            />
          </div>

          <div className="flex items-center justify-between p-2">
            <label className="text-sm font-medium text-gray-700">
              Add to favorites
            </label>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="text-gray-400 hover:text-yellow-400 transition-colors"
            >
              {isFavorite ? (
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ) : (
                <StarOff className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex justify-end space-x-4 px-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTemplate}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              disabled={!templateName} // Optionally disable if no name is entered
            >
              Save Template
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SaveTemplateDialog;
