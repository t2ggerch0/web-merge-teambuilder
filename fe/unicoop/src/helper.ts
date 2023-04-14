import { toast } from "react-toastify";

export const viewToastSuccess = (message: string) => {
  toast.success(message, { autoClose: 3000, toastId: "success-message" });
};

export const viewToastError = (message: string) => {
  toast.error(message, { autoClose: 3000, toastId: "error-message" });
};
