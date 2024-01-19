import { type AUTO_LANGUAGUE, type SUPPORTED_LANGUAGES } from "./constants"

export type Languaje = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGUE
export type FromLanguaje = Languaje | AutoLanguage

export interface State {
    fromLanguaje: FromLanguage
    toLanguaje: Languaje
    fromText: string
    result: string
    loading: boolean
} 

export type Action =
    | { type: "INTERCHANGE_LANGUAGES" }
    | { type: "SET_FROM_LANGUAGE", payload: FromLanguaje }
    | { type: "SET_TO_LANGUAGE", payload: Languaje }
    | { type: "SET_RESULT", payload: string }
    | { type: "SET_FROM_TEXT", payload: string }

export enum SectionType {
    From = "from",
    To = "to"
}