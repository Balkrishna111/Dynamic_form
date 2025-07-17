"use client";
import apiClient from "../apiClient";

export const getFormData = async () => {
    try {
        const response = await apiClient.get("/form");
        return response.data;
    } catch (error) {
        console.error("Error fetching form data:", error);
        throw error;
    }
};
export const postFormElement = async (formData : any) => {
    try {
        const response = await apiClient.post("/form/addForm", {
            ...formData
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching form data:", error);
        throw error;
    }
};

export const updateFormElement = async (formData : any) => {
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