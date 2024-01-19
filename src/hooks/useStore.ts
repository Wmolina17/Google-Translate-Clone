import { AUTO_LANGUAGUE } from "../constants"
import { Action, FromLanguaje, Languaje, type State } from "../types"
import { useReducer } from "react"

// paso 1
export const initialState: State = {
    fromLanguaje: "auto",
    toLanguaje: "en",
    fromText: "",
    result: "",
    loading: false
}

// paso 2
export function reducer(state: State, action: Action) {
    const { type } = action

    if (type === "INTERCHANGE_LANGUAGES") {

        if(state.fromLanguaje === AUTO_LANGUAGUE) return state

        return {
            ...state,
            result: "",
            fromLanguaje: state.toLanguaje,
            toLanguaje: state.fromLanguaje,
            // loading
        }
    }

    if (type === "SET_FROM_LANGUAGE") {

        if(state.fromLanguaje === action.payload) return state

        const loading = state.fromText != ""
        
        return {
            ...state,
            fromLanguaje: action.payload,
            result: "",
            loading
        }
    }

    if (type === "SET_TO_LANGUAGE") {

        if(state.toLanguaje === action.payload) return state

        const loading = state.fromText != ""

        return {
            ...state,
            toLanguaje: action.payload,
            result: "",
            loading
        }
    }

    if (type === "SET_FROM_TEXT") {
        const loading = action.payload != ""
        return {
            ...state,
            loading: loading,
            fromText: action.payload,
            result: ""
        }
    }

    if (type === "SET_RESULT") {
        return {
            ...state,
            loading: false,
            result: action.payload,
        }
    }

    return state
}

export function useStore () {
    // paso 3
    const [{ fromLanguaje, toLanguaje, fromText, result, loading }, dispatch] = useReducer(reducer, initialState)

    // paso 4
    const interchangeLanguages = () => {
        dispatch({ type: "INTERCHANGE_LANGUAGES" })
    }

    const setFromLanguage = (payload : FromLanguaje) => {
        dispatch({ type: "SET_FROM_LANGUAGE", payload })
    }

    const setToLanguage = (payload : Languaje) => {
        dispatch({ type: "SET_TO_LANGUAGE", payload })
    }

    const setFromText = (payload : string) => { 
        dispatch({ type: "SET_FROM_TEXT", payload })
    }

    const setResult = (payload : string) => {
        dispatch({ type: "SET_RESULT", payload })
    }

    return { fromLanguaje, toLanguaje, fromText, result, loading, interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult }
}

