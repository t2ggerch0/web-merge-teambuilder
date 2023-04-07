import { toast } from "react-toastify";

export const viewToastError = (message: string) => {
  toast.error(message, { autoClose: 3000, toastId: "error-message" });
};

export const viewToastInfo = (message: string) => {
  toast.info(message, { autoClose: 3000, toastId: "inform-message" });
};
