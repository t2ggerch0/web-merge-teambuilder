import { toast } from "react-toastify";

export const viewToastError = (message: string) => {
  toast.error(message, { autoClose: 3000 });
};
