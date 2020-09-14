export const setErrors = 'setErrors'

export interface SetErrors {
    type: typeof setErrors
    errors: any
}

export const loadingUI = 'loadingUI'

export interface LoadingUI {
    type: typeof loadingUI
    loading: boolean
}

export const clearErrors = 'clearErrors'

export interface ClearErrors {
    type: typeof clearErrors
}

export type UIActions =
    | SetErrors
    | LoadingUI
    | ClearErrors
