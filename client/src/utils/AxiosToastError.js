import toast from "react-hot-toast";

export default function AxiosToastError(error) {
  toast.error(error?.response?.data?.message);
}
