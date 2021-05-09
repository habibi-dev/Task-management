const initialState = {
    loading: false,
};

export default (status = initialState, action = {}) => {

    if (action.type === 'SET_SETTING') {
        return {
            ...action.data
        };
    }

    return status;
};