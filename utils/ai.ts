import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import {PromptTemplate} from "@langchain/core/prompts";
import { Document } from '@langchain/core/documents'
import {z} from 'zod'
import { loadQARefineChain } from "langchain/chains";
import { OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from "langchain/vectorstores/memory";




const parser = StructuredOutputParser.fromZodSchema(
    z.object({
        mood: z.string().describe('The mood of person that he shows in his journal entry if there is content "Default Entry" use default neutral'),
        summary: z.string().describe('The summary of the journal entry in max 20 words if there is content "Default Entry" use default Type to get results'),
        subject: z.string().describe('The subject of the journal entry in max 5 words if there is content "Default Entry" use default Type to get results'),
        negative: z.boolean().describe('Whether the journal entry is negative or not (i.e does it contain negative emotions)'),
        color: z.string().describe('The color representing the mood of the person must be in hexadecimal format skyblue for happiness, red for anger, etc'),
        SentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.')
    })
)


const getPrompt = async (content)=>{
    const format_instructions = parser.getFormatInstructions()

const prompt = new PromptTemplate({
    template: 'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n {format_instructions} \n {entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
});

const input = await prompt.format(
    {
        entry: content,
    }
)


return input;



}

export const analyze = async (content) => {
    const input = await getPrompt(content);
    const model = new ChatOpenAI({
        temperature: 0, 
        modelName: 'gpt-4o-mini', 
        apiKey: process.env.OPEN_AI_KEY // Replace with your actual API key
    });
    const result = await model.invoke(input);

    try {
        return parser.parse(result.content);
    } catch (error) {
        console.log(error);
    }
};


export const qa = async (question, entries) => {
    // Check if entries array is empty
    if (!entries || entries.length === 0) {
        
        const model = new ChatOpenAI({
            temperature: 0,
            modelName: 'gpt-4o-mini',
            apiKey: process.env.OPEN_AI_KEY
        });

        const chain = loadQARefineChain(model);
        const res = await chain.invoke({
            input_documents: 'Answer the question to the best of your ability.',
            question,
        });
    
        return res.output_text;
    }

    const docs = entries.map((entry) => {
        return new Document({
            pageContent: entry.content,
            metadata: { id: entry.id, createdAt: entry.createdAt }
        });
    });

    const model = new ChatOpenAI({
        temperature: 0,
        modelName: 'gpt-4o-mini',
        apiKey: process.env.OPEN_AI_KEY
    });

    const chain = loadQARefineChain(model);
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: process.env.OPEN_AI_KEY
    });

    const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
    const relevantDocs = await store.similaritySearch(question);
    
    // Proceed with chain invocation only if relevant documents exist
    if (relevantDocs.length === 0) {
        return "No relevant documents found to answer the question.";
    }

    const res = await chain.invoke({
        input_documents: relevantDocs,
        question,
    });

    return res.output_text;
};
