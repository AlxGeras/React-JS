export const CLICK_CHECKBOX = 'CLICK_CHECKBOX'
export const UPDATE_NAME = 'UPDATE_NAME'

export const selectCheckBox = {
    type: CLICK_CHECKBOX
}

export const updateName = (name) =>({
    type : UPDATE_NAME,
    payload: name
})
