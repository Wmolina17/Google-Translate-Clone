import Configuration from 'openai';
import ChatCompletionRequestMessageRoleEnum from 'openai';
import OpenAIApi from 'openai';
import { FromLanguaje, Languaje } from '../types.d';
import { SUPPORTED_LANGUAGES } from '../constants';

const apiKey = ""

const configuration = new Configuration({
    apiKey: apiKey,
});

const openai = new OpenAIApi({ configuration, dangerouslyAllowBrowser: true });


export async function translate({
    fromLanguage,
    toLanguage,
    text
}: {
    fromLanguage: FromLanguaje
    toLanguage: Languaje
    text: string
}) {

    if( fromLanguage === toLanguage ) return text

    const messages = [
        {
            role: ChatCompletionRequestMessageRoleEnum.System,
            content: "you are a IA that translates text. you receive a text from the user. do not answer, just translate the text. the original language is surrounded by '{{' and '}}'. you can also recibe {{auto}} which means that you have to detect. the language to is surrounded by '[[' and ']]' ",
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: "Hola mundo {{Español}} [[English]]"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: "Hello World"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: "how are you? {{auto}} [[Deutsch]]"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: "wie geht es dir ?"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.User,
            content: "Bon dia, com estas? {{auto}}  [[Español]]"
        },
        {
            role: ChatCompletionRequestMessageRoleEnum.Assistant,
            content: "buen dia, como estas ?"
        }
    ]

    const fromCode = fromLanguage === "auto" ? "auto" : SUPPORTED_LANGUAGES[fromLanguage]
    const toCode = SUPPORTED_LANGUAGES[toLanguage]
    
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            ...messages,
            {
                role: ChatCompletionRequestMessageRoleEnum.User,
                content: `${text} {{${fromCode}}} to [[${toCode}]]`
            }
        ]
    })

    return completion.data.choices[0]?.message?.content
}

