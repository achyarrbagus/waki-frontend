export function switchFlag(param) {
  switch (param) {
    case "en":
      return "/images/flags/united-states.png";
    case "id":
      return "/images/flags/indonesia.png";
    case "ph":
      return "/images/flags/philippines.png";
    case "vn":
      return "/images/flags/vietnam.png";
    case "th":
      return "/images/flags/thailand.png";
    case "kh":
      return "/images/flags/cambodia.png";
    case "pk":
      return "/images/flags/pakistan.png";
    default:
      return "";
  }
}
