import { edit, get } from "../util/request";

export const getContact = async () => {
    const result = await get("contact");
    return result;
};
export const editContact = async (id, contactData) => {
    const result = await edit(`contact/${id}`, contactData);
    return result;
};
