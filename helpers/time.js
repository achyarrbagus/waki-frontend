import TimeAgo from "javascript-time-ago";
import timeAgoLocale from "javascript-time-ago/locale/en";

TimeAgo.addLocale(timeAgoLocale);

export const parseTimeAgo = (unix) => {
  const timeAgo = new TimeAgo("id-ID");
  return timeAgo.format(unix);
};
