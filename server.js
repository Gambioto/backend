import express from "express";
import dotenv from 'dotenv';
import cors from "cors";
import bodyParser from "body-parser";
import { OpenAI } from "openai";
import {AbortController} from "node-abort-controller";
dotenv.config()

global.AbortController = AbortController;

const openai = new OpenAI({
  apiKey: process.env.GPTAPIKEY // This is also the default, can be omitted
});

// Setup server

const app = express();
app.use(bodyParser.json());
app.use(cors());

// endpoint for ChatGPT

app.post("/chat", async (req, res) => {
  console.log(req)
  const completion = await openai.createCompletion.create({
    model: "text-davinci-003",
    max_tokens: 712,
    temperature: 0.7,
    prompt: `Eres un asistente virtual empresarial y respondes a las siguientes preguntas:
    Usuario: ¿Podrías proporcionarme una guía detallada sobre los pasos clave a seguir, junto con algunos consejos útiles para maximizar los resultados?
    Asistente: Define tus objetivos: Comienza por establecer objetivos claros y medibles para tu estrategia de marketing digital. ¿Deseas aumentar las ventas, generar leads, mejorar la visibilidad de tu marca o expandirte a nuevos mercados? Define metas específicas que te permitan evaluar el éxito de tus esfuerzos.

    Conoce a tu audiencia objetivo: Es esencial comprender a quién te diriges. Investiga y crea perfiles detallados de tu audiencia, incluyendo sus características demográficas, intereses, comportamientos en línea y necesidades. Esto te ayudará a adaptar tu estrategia y mensajes de manera más efectiva.
    
    Elige los canales adecuados: Identifica los canales de marketing digital más relevantes para tu audiencia y objetivos. Estos pueden incluir tu sitio web, blogs, redes sociales, correo electrónico, publicidad en línea, SEO (optimización de motores de búsqueda), marketing de contenidos, entre otros. Selecciona aquellos que te permitan alcanzar a tu audiencia de manera efectiva.
    Usuario:${req.body.prompt}
    Asistente: `,
  }); 
  res.send(completion.choices[0].message);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});