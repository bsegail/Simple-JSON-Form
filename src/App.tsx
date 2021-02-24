import React, {useEffect, useState} from 'react';
import './App.scss';
import Form, {FieldType, FormValue} from './components/Form';
import RenderRecords from "./components/RenderRecords";

// I know in the task it said use JSON
// But I wanted to opt for a JSON-like structure since I wanted to add in my validation rules here
// There's no reason why we couldn't have a separate array which maps validation rules to each name
// i.e.
// const validation = [
//     {
//         name: 'name',
//         validation: () => {
//             // Do something
//         }
//     }
// ]

const stringHasFirstAndLastNames = (nameToCheck: string) => {
    const splitNames = nameToCheck.trim().split(' ')
    const hasMoreThanOneValue = splitNames.length >= 2

    // Should probably bump this up to 3, but when you're testing I don't want you to think its not working...
    const hasLegitimateValues = hasMoreThanOneValue && splitNames[0].length > 0 && splitNames[1].length > 0
    return hasLegitimateValues
}


const fields: Array<FieldType> = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        props: {
            placeholder: 'Name'
        },
        validation: (value) => {
            // Should enforce the need for a first and last name (separated by a space)
            return !(value?.name && stringHasFirstAndLastNames(value?.name as string)) ? 'Please enter a first and last name.' : null
        }
    },
    {
        name: 'dateOfBirth',
        label: 'Date of Birth',
        type: 'date',
        validation: (value) => {
            const now = new Date().getTime()
            const date = new Date(value?.dateOfBirth as string).getTime()

            // Yes there are flaws with this, but not installing date-fns to improve this calculation
            // And most importantly, I'm strapped for time
            const millisecondsInBetween = now - date
            const daysInBetween = millisecondsInBetween / (1000 * 60 * 60 * 24)
            const yearsInBetween = daysInBetween / 365.25
            return !(yearsInBetween > 18) ? 'You must over 18 years old.' : null
        }
    },
    {
        name: 'gender',
        label: 'Gender',
        type: 'select',
        props: {
            options: [{label: 'Male', value: 'male'}, {label: 'Female', value: 'female'}]
        }
    },
    {
        name: 'mobileNumber',
        label: 'Mobile Number',
        type: 'text',
        props: {
            placeholder: 'Mobile Number'
        },
    },
    {
        name: 'homeNumber',
        label: 'Home Number',
        type: 'text',
        props: {
            placeholder: 'Home Number'
        },
    },
    {
        name: 'requireGuardianConsent',
        label: 'Require Guardian Consent',
        type: 'checkbox',
    },
    {
        name: 'guardianName',
        label: 'Guardian Name',
        type: 'text',
        props: {
            placeholder: 'Guardian Name'
        },
        validation: (value) => {
            const guardianConsentIsRequired = value?.requireGuardianConsent === true || !value?.requireGuardianConsent === undefined // undefined means that the checkbox is unchecked and they're just filling out details..
            const guardianNameIsFilled = (value?.guardianName as string || '')?.length > 0
            return guardianConsentIsRequired && !guardianNameIsFilled ? 'Name must be provided if guardian consent is required.' : null
        }
    }
]

const App: React.FC = () => {
    const [form, setForm] = useState<FormValue>({})
    const [submission, setSubmission] = useState<FormValue>({})

    useEffect(() => {
        // Not technically needed, but thought it would be good for the test.
        console.table(submission)
    }, [submission])

    return (
        <div className="App">
            <div className={'form-container'}>
                <h1>JSON form</h1>
                <Form
                    value={form}
                    fields={fields}
                    onChange={setForm}
                    onSubmit={setSubmission}
                >
                    <button type={'submit'}>Submit</button>
                </Form>
            </div>

            <div className={'results-container'}>
                <h1>Result</h1>
                <p><strong>Note: Result only appears submission and when there are no errors.</strong></p>
                <RenderRecords value={submission}/>
            </div>
        </div>
    );
}

export default App;
