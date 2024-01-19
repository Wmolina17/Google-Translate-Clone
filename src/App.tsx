import "bootstrap/dist/css/bootstrap.min.css"
import { Container, Row, Col, Button, Form, Stack, Placeholder } from "react-bootstrap"
import './App.css'
import { useDebounce } from "./hooks/useDebounce"
import { initialState, reducer, useStore } from "./hooks/useStore"
import { AUTO_LANGUAGUE } from "./constants"
import { CopyText, Flechas, ListenText } from "./components/Icons"
import { LanguageSelector } from "./components/LanguageSelector"
import { SectionType } from "./types.d"
import { TextArea } from "./components/TextArea"
import { useEffect } from "react"
import { translate } from "./services/translate"



export function App() {

  const { fromLanguaje, toLanguaje, fromText, result, loading, interchangeLanguages, setFromLanguage, setToLanguage, setFromText, setResult } = useStore()

  const debounceFromText = useDebounce(fromText)
  
  console.log(fromLanguaje)
  
  useEffect(() => {
    if (debounceFromText === "") return

    translate({ fromLanguaje, toLanguaje, text: debounceFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult("Error") })

  }, [debounceFromText, fromLanguaje, toLanguaje])


  const handleCopy = () => {
    navigator.clipboard.writeText(result).catch(() => { })
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = toLanguaje
    utterance.rate = 0.75
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid className="d-flex flex-column gap-5 text-center">
      <h2>Google translate</h2>

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.From} value={fromLanguaje} onChange={setFromLanguage} ></LanguageSelector>
            <TextArea loading={loading} onChange={setFromText} value={fromText} type={SectionType.From}></TextArea>
          </Stack>
        </Col>

        <Col xs="auto">
          <Button variant="link" disabled={fromLanguaje === AUTO_LANGUAGUE} onClick={interchangeLanguages} >
            <Flechas></Flechas>
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.To} value={toLanguaje} onChange={setToLanguage} ></LanguageSelector>
            <div style={{ position: "relative" }}>
              <TextArea loading={loading} onChange={setResult} value={result} type={SectionType.To} ></TextArea>

              <div style={{ position: "absolute", left: "0", bottom: "5px", display: "flex" }} >
                  
                  <Button variant="link" onClick={handleCopy}>
                    <CopyText></CopyText>
                  </Button>
                  
                  <Button variant="link" onClick={handleSpeak} style={{ marginLeft: "-15px" }}>
                    <ListenText></ListenText>
                  </Button>

              </div>

            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}
