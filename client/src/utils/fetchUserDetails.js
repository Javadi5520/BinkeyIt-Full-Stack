import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

export default async function fetchUserDetails() {
  try {
    const response = await Axios({
      ...SummaryApi.userDetails,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}
