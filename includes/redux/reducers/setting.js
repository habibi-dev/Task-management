const initialState = {
    loading: false,
    language: 'fa',
};

export default (status = initialState, action = {}) => {

    if (action.type === 'SET_SETTING') {
        return {
            ...action.data
        };
    }

    return status;
};
