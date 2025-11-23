import os
import pandas as pd
from dotenv import load_dotenv

# Novos imports Gemini
from llama_index.llms.google import Gemini
from llama_index.embeddings.google import GoogleGenAIEmbedding 
from llama_index.readers.schema import Document as LlamaIndexDocument
from llama_index.core.settings import Settings

# -- ARQUIVO .ENV (GEMINI_API_KEY) --
load_dotenv()

# -- VARIÁVEL DO LLAMAINDEX --
CAMINHO_BASE = "base_conhecimento_ifood_genai-exemplo.csv"

# -- CONFIGURAÇÃO DO LLAMAINDEX --
def configurar_settings():
    """Define o LLM e o modelo de Embedding para o LlamaIndex."""
#LLM para geração de resposta
Setting.llm = Gemini(model="gemini-2.5-flash")

# Modelo de Embedding (text-embedding-004) para a busca semântica
Settings.embed_model = GoogleGenAIEmbedding(model="text-embedding-004")

print("Configuração do Agente: LLM e Embedding definidos para Gemini.")

