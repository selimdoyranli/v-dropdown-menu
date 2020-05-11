export default {
  HIDE_PRELOADER(state) {
    state.isPreloading = !state.isPreloading;
    state.isAttached = true;
    document.querySelector('html').style.overflowY = 'auto'
    document.querySelector('html').style.overflowX = 'hidden'
  }
}
