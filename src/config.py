import os
import pandas as pd
from dotenv import load_dotenv

from llama_index.llms.google_genai import GoogleGenAI            
from llama_index.embeddings.google_genai import GoogleGenAIEmbedding 
from llama_index.core.schema import Document as LlamaIndexDocument 
from llama_index.core.settings import Settings

# -- ARQUIVO .ENV (GEMINI_API_KEY) --
load_dotenv()

CAMINHO_BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', "base_conhecimento_ifood_genai-exemplo.csv")

# -- CONFIGURAÇÃO DOLLAMAINDEX --
def configurar_settings():
    """Define o LLM e o modelo de Embedding para o LlamaIndex."""
    # Atualizado para o modelo atual suportado pela integração
    Settings.llm = GoogleGenAI(model="gemini-3.6-flash") 

    # Configuração de embedding
    Settings.embed_model = GoogleGenAIEmbedding(model="text-embedding-004") 

    print("Configuração do Agente: LLM e Embedding definidos para Gemini.")