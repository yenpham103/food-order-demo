import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Hàm tùy chỉnh toast
export const showToast = (
  message,
  type = "info",
  position = "bottom-right"
) => {
  toast(message, {
    type,
    position,
  });
};
