/*
 * Returns true if navigator has xr with 'immersive-ar' capabilities
 * Returns false otherwise.
 */
export async function browserHasImmersiveArCompatibility(): Promise<boolean> {
  if (window.navigator.xr) {
    const isSupported: boolean = await navigator.xr.isSessionSupported(
      "immersive-ar"
    );
    console.info(
      `[DEBUG] ${
        isSupported
          ? "Browser supports immersive-ar"
          : "Browser does not support immersive-ar"
      }`
    );
    return isSupported;
  }
  return false;
}

export default {
  browserHasImmersiveArCompatibility,
};
