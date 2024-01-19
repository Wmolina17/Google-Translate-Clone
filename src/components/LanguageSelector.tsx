import { Form } from "react-bootstrap"
import { AUTO_LANGUAGUE, SUPPORTED_LANGUAGES } from "../constants"
import React from "react"
import { FromLanguage, Languaje } from "../types"
import { SectionType } from "../types.d"

// interface Props {
//     onChange: (language : Languaje) => void
// }

type Props =
    | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
    | { type: SectionType.To, value: Languaje, onChange: (language: Languaje) => void }

export const LanguageSelector = ({ onChange, type, value } : Props) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Languaje)
    }

    return (
        <Form.Select aria-label="Selecciona El Idioma" value={value} onChange={handleChange}>
            {
                type === SectionType.From && <option value={AUTO_LANGUAGUE} > Detectar idioma</option>
            }
            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                    <option key={key} value={key}>{literal}</option>
                ))
            }
        </Form.Select>
    )
}