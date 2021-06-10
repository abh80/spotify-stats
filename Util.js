import * as Constants from "./Constants";
export const CheckIFLogged = (win) => {
  if (!win.localStorage.getItem(Constants.codes.Token)) return false;
  else if (
    win.localStorage.getItem(Constants.codes.Token) &&
    win.localStorage.getItem(Constants.codes.Refresher) &&
    win.localStorage.getItem(Constants.codes.User)
  )
    return true;
  else {
    //invalid login i.e modified storage
    win.localStorage.clear();
    return false;
  }
};
export const truncate = (str) => {
  if (str.length > 43) {
    return str.substr(0, 43) + "...";
  } else return str;
};
