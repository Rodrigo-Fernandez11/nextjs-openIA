"use client"
import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

interface ApiResponse {
  joke: string;
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!configuration.apiKey)
  throw new Error("No OPENAI_API_KEY environment variable found");

const openai = new OpenAIApi(configuration);

function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const generateJoke = async (prompt: string) => {
    setLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Dame un chiste para programador enfocado en el tema: ${prompt}`,
        temperature: 0.8,
      });

      setResult(response.data.choices[0].text);
    } catch (error) {
      alert(error);
      return;
    }
    setLoading(false);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    generateJoke(prompt);
  };

  return (
    <div className="bg-zinc-950 h-screen flex justify-center items-center">
      <form onSubmit={onSubmit} className="bg-zinc-900 p-10 w-3/12">
        <h1 className="text-2xl font-bold text-slate-200 mb-5">
          Programmer Jokes Generator
        </h1>
        <input
          type="text"
          name="name"
          placeholder="Enter a programming language"
          onChange={(e) => setPrompt(e.target.value)}
          className="p-2 rounded-md block bg-neutral-700 text-white w-full"
          value={prompt}
          autoFocus
        />
        <button
          type="submit"
          className="bg-green-500 p-2 rounded-md block mt-2 disabled:opacity-50 text-white"
          disabled={!prompt || loading}
        >
          {loading ? "Thinking..." : "Generate"}
        </button>
        {result && (
          <p className="text-xl font-bold text-white max-w-xs my-10">
            {result}
          </p>
        )}
      </form>
    </div>
  );
}

export default HomePage;