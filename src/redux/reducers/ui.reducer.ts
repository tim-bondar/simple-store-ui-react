import {Reducer} from "redux";
import {clearErrors, loadingUI, setErrors} from "../actions/ui.actions";
import {AllActions} from "../store";

export interface UIState {
    loading: boolean,
    errors: any
}

const initialState: UIState = {
    loading: false,
    errors: null
}

export const UIReducer: Reducer<UIState, AllActions> =
    (state = initialState, action) => {
        switch (action.type) {
            case setErrors :
                return {errors: action.errors, loading: state.loading}

            case clearErrors :
                return {errors : null, loading: state.loading}

            case loadingUI :
                return {errors : state.errors, loading: action.loading}

            default:
                return state;
        }
    }
