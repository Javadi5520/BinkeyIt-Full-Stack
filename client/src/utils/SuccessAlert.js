import Swal from "sweetalert2";

export default function successAlert(title) {
  const alert = Swal.fire({
    icon: "success",
    title: title,
    confirmButtonColor: "#00b050",
  });
}
