import './Input.scss'
import React from "react";
import {DynamicComponentProps} from "./Field";

export type InputProps = DynamicComponentProps<{
    type?: string
    value: string
    onChange: (value: string) => void
    id: string
    placeholder: string
}>

const Input: React.FC<InputProps> = (
    {
        type,
        value = '',
        onChange,
        id,
        placeholder,
        onBlur
    }
) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value)
    }

    return (
        <div className={'Input'}>
            <input id={id} type={type} value={value} onChange={handleChange} placeholder={placeholder} onBlur={onBlur} />
        </div>
    )
}

export default Input
