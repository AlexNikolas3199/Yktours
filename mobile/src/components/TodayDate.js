import I18n from '../languages/i18n';
import months from '../utils/months';
const TodayDate = (today, noTime = false) => {
  const yyyy = today.getFullYear();
  let mm = I18n.t(months[today.getMonth()]);
  let dd = today.getDate();
  let hh = today.getHours();
  let m = today.getMinutes();
  let time = '';

  if (dd < 10) dd = '0' + dd;
  if (hh < 10) hh = '0' + hh;
  if (m < 10) m = '0' + m;
  if (!noTime) time = hh + ':' + m;
  const nowDate = dd + ' ' + mm + ' ' + yyyy + ' ' + time;
  return nowDate;
};
export default TodayDate;
