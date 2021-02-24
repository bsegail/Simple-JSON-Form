import './Form.scss'
import React, {useState} from "react";
import Field from "./Field";

export type FormValue = Record<string, unknown>
export type FieldType = {
    name: string
    label: string
    type: string
    props?: Record<string, unknown>
    validation?: (value: FormValue) => string | null
}


type FormProps = {
    fields: Array<FieldType>
    value: FormValue
    onChange: (value: FormValue) => void
    onSubmit: (value: FormValue) => void
}

const isEmpty = (object: object) => Object.values(object).filter(item => item !== undefined && item !== null).length === 0

const Form: React.FC<FormProps> = ({children, value, fields, onChange, onSubmit}) => {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const validateForm = (fieldsToValidate: Array<FieldType> = fields) => {
        const validationErrors = fieldsToValidate.reduce((accumulator, field) => {
            const errorMessage = field.validation?.(value)
            return {
                ...accumulator,
                [field.name]: errorMessage
            }
        }, {}) as any as Record<string, string>
        return validationErrors
    }
    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault()
        setErrors({})
        const formErrors = validateForm()
        setErrors(formErrors)
        const formIsValid = isEmpty(formErrors)
        if (formIsValid) {
            onSubmit(value)
        }
    }

    const handleChange = (fieldName: string, fieldValue: unknown) => {
        onChange({
            ...value,
            [fieldName]: fieldValue
        })
    }

    const handleBlur = (fieldName: string) => {
        const fieldToValidate: FieldType | undefined = fields.find(field => field.name === fieldName)
        const errorsForField = fieldToValidate ? validateForm([fieldToValidate]) : {}
        setErrors({
            ...errors,
            ...errorsForField
        })
    }


    return (
        <form
            onSubmit={handleSubmit}
            className={'Form'}
        >
            {
                fields.map(field => <Field
                    key={field.name}
                    onChange={(value) => handleChange(field.name, value)}
                    value={value[field.name]}
                    error={errors[field.name]}
                    // Yeah, probably not the most efficient, but it's 7:25pm and I want dinner
                    onBlur={() => handleBlur(field.name)}
                    {...field}
                />)
            }
            {children}
        </form>
    )
}

export default Form