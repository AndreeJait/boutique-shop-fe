const reducers = {
    setVal:(state, action)=> {
        const {key, val} = action.payload;
        state[key] = val; 
    }
};
export default reducers;