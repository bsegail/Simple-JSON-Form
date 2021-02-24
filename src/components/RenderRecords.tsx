import './RenderRecords.scss'
import React from "react";

type Props = {
    value: Record<string, unknown>
}
const RenderRecords: React.FC<Props> = ({value}) => {
    return (

        <code className={'RenderRecords'}>
            {
                Object.keys(value).map((key, i) => (
                    <p key={key}>
                        <span>{`${key}: ${value[key]}`}</span>
                    </p>
                ))
            }
        </code>
    )
}

export default RenderRecords
