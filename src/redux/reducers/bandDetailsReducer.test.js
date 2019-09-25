import bandDetailsReducer from './bandDetailsReducer';

describe('testing band details reducer states', () => {
    test("should have its initial state", () => {
        let action = {};
        let newState = bandDetailsReducer(undefined, action);
        expect(newState).toEqual([]);
    })
    test('should have test as state', () => {
        let action = {type: 'SET_BAND_DETAILS', payload: "test"};
        let newState = bandDetailsReducer(undefined, action);
        expect(newState).toEqual('test')
    })
    test('clear band details should return empty array', () => {
        let action = {type: 'CLEAR_BAND_DETAILS'};
        let newState = bandDetailsReducer(undefined, action);
        expect(newState).toEqual([])
    })
})