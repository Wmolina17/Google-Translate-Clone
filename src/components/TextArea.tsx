import { Form } from "react-bootstrap"
import { SectionType } from "../types.d"

interface Props { 
    type: SectionType, 
    loading?: boolean, 
    onChange: ( value : string ) => void, 
    value: string 
}

const commonStyles = { height: "200px", resize: "none" }

const getPlaceholder = ({ type, loading } : { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return "Introducir Texto"
    if (loading === true) return "Cargando..."
    return "Traduccion"
}

export function TextArea({ type, loading, value, onChange }: Props) {

    const styles = type === SectionType.From
        ?  commonStyles
        : { ...commonStyles, backgroundColor: "#e5e5e5", border: "none" }

    const handleChange = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }
    
    return (
        <>
            <Form.Control
                as="textarea"
                placeholder={getPlaceholder( { type, loading  } )}
                style={styles}
                autoFocus={type === SectionType.From}
                onChange={handleChange}
                disabled={type === SectionType.To}
            >
                {value}
            </Form.Control>
        </>
    )
}