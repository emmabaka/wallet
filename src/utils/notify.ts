import { toast } from "react-toastify";

export const notifySuccess = (text: string) =>
  toast.success(text, {
    autoClose: 1500,
    closeOnClick: true,
  });
export const notifyError = () =>
  toast.error("Oops, something went wrong... Try again, please");
