import { post } from "./services";

export const contact = async (contactData) => {
  const result = await post("contact", contactData);
  return result;
};