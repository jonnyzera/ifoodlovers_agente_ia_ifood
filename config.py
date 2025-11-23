import os
import pandas as pd
from dotenv import load_dotenv

# IMPORTS EXPLICITOS que correspondem aos nomes de pacotes acima
from llama_index.llms.google_genai import GoogleGenAI
from llama_index.embeddings.google_genai import GoogleGenAIEmbedding 
from llama_index.readers.schema import Document as LlamaIndexDocument
from llama_index.core.settings import Settings

# -- ARQUIVO .ENV (GEMINI_API_KEY) --
load_dotenv()

# -- VARIÁVEL DO LLAMAINDEX --
CAMINHO_BASE = "base_conhecimento_ifood_genai-exemplo.csv"

# -- CONFIGURAÇÃO DO LLAMAINDEX --
def configurar_settings():
    """Define o LLM e o modelo de Embedding para o LlamaIndex."""
    # CORREÇÃO: Settings (com S) e usando a classe GoogleGenAI
    Settings.llm = GoogleGenAI(model="gemini-2.5-flash")

    # Modelo de Embedding (text-embedding-004)
    Settings.embed_model = GoogleGenAIEmbedding(model="text-embedding-004")

    print("Configuração do Agente: LLM e Embedding definidos para Gemini.")