"use client";
import { FormElementType } from "@/app/(admin)/(others-pages)/createForm/page";
import apiClient from "../apiClient";

export const getProjectsData = async () => {
    try {
        const response = await apiClient.get("/project");
        return response.data;
    } catch (error) {
        console.error("Error fetching projects data:", error);
        throw error;
        
    }
};
export const getSingleProject = async (id : string) => {
    try {
        const response = await apiClient.get(`/project/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching project data:", error);
        throw error;
    }
};
export const postProject = async (projectData : {name: string}) => {
    try {
        const response = await apiClient.post("/project/add", {
            ...projectData
        });
        return response.data;
    } catch (error) {
        console.error("Error posting project data:", error);
        throw error;
    }
};

export const updateFormElement = async (formData : FormElementType) => {
    try {
        const response = await apiClient.put(`/form/updateForm/${formData.id}`, {
            ...formData
        });
        return response.data;
    } catch (error) {
        console.error("Error updating form data:", error);
        throw error;
    }
};

export const deleteFormElement = async (elementId : string) => {
    try {
        const response = await apiClient.delete(`/form/formElement/${elementId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting form element:", error);
        throw error;
    }
};