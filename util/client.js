export function checkIsMobileClient() {
  if (!global.window) return false;
  const ua = global.window.navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
    return true;
  }
  return false;
}

export function checkIsDesktopChrome() {
  if (!global.window) return false;
  const ua = global.window.navigator.userAgent;
  const uv = global.window.navigator.vendor;
  if (checkIsMobileClient()) return false;
  return (/Chrome/i.test(ua) && /Google/i.test(uv)) && !(/OPR/i.test(ua));
}
