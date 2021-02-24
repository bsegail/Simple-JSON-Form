import './Field.scss'
import React from 'react'
import {FieldType} from "./Form";
import Input, {InputProps} from "./Input";
import Checkbox, {CheckboxProps} from "./Checkbox";
import Select from "./Select";

export type DynamicComponentProps<T> = {
    id: string
    onChange: (value: unknown) => void
    onBlur: () => void
    type: string
} & T

const DynamicComponents: {
    // These types are a nightmare. Any for now, I know it's not right..
    [key: string]: React.FC<DynamicComponentProps<InputProps | CheckboxProps | any>>
} = {
    text: Input,
    date: Input,
    select: Select,
    telephone: Input,
    checkbox: Checkbox
}


type FieldProps = FieldType & {
    onChange: (value: unknown) => void
    onBlur: () => void
    value: unknown
    error?: string
}
const Field: React.FC<FieldProps> = ({ type, label, name  , onChange, value, props: fieldProps, onBlur, error }) => {
    const DynamicComponent = DynamicComponents[type]
    return (
        <div className={'Field'}>
            <label htmlFor={name}>{ label }</label>
            <DynamicComponent id={name} onChange={onChange} type={type} onBlur={onBlur} value={value as any} {...fieldProps as any} />

            <div className={'field-error'}>
                { error &&  <p>{ error }</p> }
            </div>
        </div>
    )
}

export default Field