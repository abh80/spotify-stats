import * as Constants from "./Constants";
export const CheckIFLogged = (win) => {
  if (!win.localStorage.getItem(Constants.codes.Token)) return false;
  else if (
    win.localStorage.getItem(Constants.codes.Token) &&
    win.localStorage.getItem(Constants.codes.Refresher) &&
    win.localStorage.getItem(Constants.codes.User)
  )
    return true;
  else { //invalid login i.e modified storage
    win.localStorage.clear();
    return false;
  }
};
