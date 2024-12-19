import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

export default async function uploadImage(image) {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await Axios({
      ...SummaryApi.uploadImage,
      data: formData,
    });

    return response;
  } catch (error) {
    return error;
  }
}
