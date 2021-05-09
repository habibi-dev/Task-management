export default (state = false, action) => {
    if (action.type === "persist/REHYDRATE") {
        return true;
    }

    return state;
};