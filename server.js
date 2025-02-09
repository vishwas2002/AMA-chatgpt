// import express from 'express'
// import * as dotenv from 'dotenv'
// import OpenAI from 'openai'
// import { Configuration, OpenAIApi } from 'openai'; 
// import cors from 'cors'



// dotenv.config();

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });

// const openai = new OpenAIApi(configuration);

// const app = express();
// app.use(cors());

// app.use(express.json());

// app.get("/" , async(req, res)=>{
//       res.status(200).send({
//         message : "hello to the world of AI in AMA",
//       })
// });

// app.post("/", async(req,res)=>{
//     try{
//          const prompt = req.body.prompt;
//          const response = await openai.createCompletion({
//             model: "text-davinci-003",
//       prompt: `${prompt}`,
//       temperature: 0, 
//       max_tokens: 3000, 
//       top_p: 1, 
//       frequency_penalty: 0.5, 
//       presence_penalty: 0, 
//          })

//          res.status(200).send({
//             bot : response.data.choices[0].text
//          })
//     }
//     catch(error){
// console.log(error);
// res.status(500).send({error})
//  }
// })
// app.listen(5000,()=> console.log("server is running on the port http://localhost:5000")
// )
// import express from 'express';
// import * as dotenv from 'dotenv';
// import cors from 'cors';
// import OpenAI from 'openai';  // Use OpenAI directly

// dotenv.config();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,  // Ensure 
// });

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", async (req, res) => {
//     res.status(200).send({
//         message: "hello to the world of AI in AMA",
//     });
// });

// app.post("/", async (req, res) => {
//     try {
//         const prompt = req.body.prompt;
//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",  // Use the correct model for chat
//             messages: [{ role: "user", content: prompt }],
//             temperature: 0,
//             max_tokens: 3000,
//             top_p: 1,
//             frequency_penalty: 0.5,
//             presence_penalty: 0,
//         });

//         res.status(200).send({
//             bot: response.choices[0].message.content
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ error });
//     }
// });

// app.listen(5000, () => console.log("Server is running on the port http://localhost:5000"));
import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import {OpenAI} from 'openai'

dotenv.config()

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_KEY
})


const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from AMA!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `${prompt}`,
      temperature: 0, // Higher values means the model will take more risks.
      max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
      top_p: 1, // alternative to sampling with temperature, called nucleus sampling
      frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
      presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
    });

    res.status(200).send({
      bot: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))