export default {
	setDrawer() {
		if(state.drawer) {
			state.drawer = false;
		} else {
			state.drawer = true;
		}
	}
}