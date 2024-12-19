export function validURLConvert(name) {
  const url = name?.toString().replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-");
  return url;
}
