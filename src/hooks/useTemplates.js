import { useRecoilState } from "recoil";
import { useState } from "react";
import { templateAtom, templateByIdAtom } from "../state/templateState";
import conf from "../config/index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useTemplate = () => {
  const [templateData, setTemplateData] = useRecoilState(templateAtom);
  const [templateById, setTemplateById] = useRecoilState(templateByIdAtom);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Helper function to get the access token from sessionStorae
  const getAccessToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  // Fetch all templates
  const fetchAllTemplates = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${conf.apiBaseUrl}api/templates`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }

      const data = await response.json();
      setTemplateData((prev) => ({
        ...prev,
        all: data,
      }));
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplateById = async (id) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${conf.apiBaseUrl}api/templateById/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch template by ID");
      }

      const data = await response.json();
      setTemplateById(data);

      toast.success("Template loaded successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        className: "custom-toast-success",
      });

      return data;
    } catch (error) {
      console.error("Error fetching template by ID:", error);
      toast.error("Failed to fetch template by ID.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        className: "custom-toast-error",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async (templateInput) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${conf.apiBaseUrl}api/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(templateInput),
      });

      if (!response.ok) {
        throw new Error("Failed to create template");
      }

      const newTemplate = await response.json();

      // Safely update the local state with the new template
      setTemplateData((prev) => {
        const allTemplates = Array.isArray(prev?.all) ? prev.all : []; // Ensure prev.all is an array
        return {
          ...prev,
          all: [...allTemplates, newTemplate], // Safely append newTemplate
        };
      });
      toast.success("Template created successfully!", {
        position: "bottom-center", // Display slightly above bottom center
        autoClose: 3000,
        hideProgressBar: true, // Hide progress bar for minimalism
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored", // Use colored theme for better contrast
        className: "custom-toast-success", // Add custom class for styling
      });
      navigate("/templates");

      return newTemplate;
    } catch (error) {
      console.error("Error creating template:", error);
      toast.error("Failed to create template.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        className: "custom-toast-error",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateTemplate = async (id, updatedTemplate) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${conf.apiBaseUrl}api/updateTemplate/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(updatedTemplate),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update template");
      }

      const updatedData = await response.json();
      if (templateById && templateById._id === id) {
        setTemplateById((prev) => ({
          ...prev,
          template: updatedData,
        }));
      }

      toast.success("Template updated successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        className: "custom-toast-success",
      });

      navigate("/templates");

      return updatedData;
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        className: "custom-toast-error",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteTemplate = async (id) => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${conf.apiBaseUrl}api/templates/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete template");
      }

      const result = await response.json();

      // Update local state with the new counts from the API response
      setTemplateData((prev) => ({
        ...prev,
        all: {
          ...prev.all,
          templates: {
            ...prev.all.templates,
            all: prev.all.templates.all.filter(
              (template) => template._id !== id
            ),
          },
          count: result.user,
        },
      }));

      // Clear templateById if it's the deleted template
      if (templateById?._id === id) {
        setTemplateById(null);
      }

      toast.success("Template deleted successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        className: "custom-toast-success",
      });
      await fetchAllTemplates();

      return true;
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("Failed to delete template.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
        className: "custom-toast-error",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchAllTemplates,
    loading,
    templateData,
    createTemplate,
    templateById,
    fetchTemplateById,
    updateTemplate,
    deleteTemplate,
  };
};
