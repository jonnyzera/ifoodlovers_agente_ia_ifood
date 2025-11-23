import os
import pandas as pd
from dotenv import load_dotenv

# Usando os caminhos 'google_genai' para as classes GoogleGenAI
from llama_index.llms.google_genai import GoogleGenAI            
from llama_index.embeddings.google_genai import GoogleGenAIEmbedding 
from llama_index.core.schema import Document as LlamaIndexDocument 
from llama_index.core.settings import Settings

# -- ARQUIVO .ENV (GEMINI_API_KEY) --
load_dotenv()

# -- VARIÁVEL DO LLAMAINDEX --
CAMINHO_BASE = "base_conhecimento_ifood_genai-exemplo.csv"

# -- CONFIGURAÇÃO DO LLAMAINDEX --
def configurar_settings():
    """Define o LLM e o modelo de Embedding para o LlamaIndex."""
    # Usando a classe GoogleGenAI para o LLM
    Settings.llm = GoogleGenAI(model="gemini-2.5-flash") # CORRIGIDO

    # Usando a classe GoogleGenAIEmbedding para o Embedding
    Settings.embed_model = GoogleGenAIEmbedding(model="text-embedding-004") # CORRIGIDO

    print("Configuração do Agente: LLM e Embedding definidos para Gemini.")