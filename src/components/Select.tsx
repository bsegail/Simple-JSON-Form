import React from 'react'
import {DynamicComponentProps} from "./Field";

type SelectProps = DynamicComponentProps<{
    options: { label: string, value: string }[]
    value: string
}>

const Select: React.FC<SelectProps> = ({ options , onBlur, onChange, id, value }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value)
    }

    return (
        <select onBlur={onBlur} value={value} id={id} onChange={handleChange} defaultValue={'default'}>
            <option disabled value={'default'}>Select</option>
            { options.map(option => <option key={option.value} value={option.value}>{ option.label }</option>)}
        </select>
    )
}

export default Select
