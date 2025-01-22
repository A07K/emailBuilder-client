import { useRecoilState } from "recoil";
import { useState } from "react";
import { templateAtom } from "../state/templateState";
import conf from "../config/index";

export const useTemplate = () => {
  const [templateData, setTemplateData] = useRecoilState(templateAtom);
  const [loading, setLoading] = useState(false);

  // Helper function to get the access token from sessionStorage
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

      // Update the local state with the new template
      setTemplateData((prev) => ({
        ...prev,
        all: [...(prev.all || []), newTemplate],
      }));

      return newTemplate;
    } catch (error) {
      console.error("Error creating template:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /*const fetchFavoriteTemplates = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${conf.apiBaseUrl}api/templates/favorites`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch favorite templates");
      }

      const data = await response.json();
      setTemplateData((prev) => ({
        ...prev,
        favorites: data,
      }));
    } catch (error) {
      console.error("Error fetching favorite templates:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch recent templates
  const fetchRecentTemplates = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) {
      console.error("Access token not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${conf.apiBaseUrl}api/templates/recent`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recent templates");
      }

      const data = await response.json();
      setTemplateData((prev) => ({
        ...prev,
        recent: data,
      }));
    } catch (error) {
      console.error("Error fetching recent templates:", error);
    } finally {
      setLoading(false);
    }
  };*/

  return {
    fetchAllTemplates,
    //fetchFavoriteTemplates,
    //fetchRecentTemplates,
    loading,
    templateData,
    createTemplate,
  };
};
