import React from "react";
import {DynamicComponentProps} from "./Field";

export type CheckboxProps = DynamicComponentProps<{
    value: boolean
    onChange: (value: boolean) => void
    id: string
    onBlur: () => void
}>

const Checkbox: React.FC<CheckboxProps> = ({ id, value = false, onChange, onBlur }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked)
    }
    return (
        <div className={'Checkbox'}>
            <input id={id} type={'checkbox'} checked={value} onChange={handleChange} onBlur={onBlur}/>
        </div>
    )
}

export default Checkbox