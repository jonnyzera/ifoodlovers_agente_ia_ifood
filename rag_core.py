# rag_core.py
from llama_index.core import VectorStoreIndex

def criar_index(documentos):
    """Cria um VectorStoreIndex a partir dos documentos carregados."""
    index = VectorStoreIndex.from_documents(documentos)
    print("RAG Core: Indexação concluída.")
    return index

def configurar_agente(index):
    """Configura o Agente de Consulta (Query Engine) a partir do index."""
    # SYSTEM PROMPT com a Regra de Ouro (Fallback Seguro)
    system_prompt = (
        "Você é um Agente de IA interno do Ifood, especializado em orientar"
        "... [O restante do seu System Prompt, incluindo as regras de Fallback] ..."
    )

    # Cria o mecanismo de consulta (agente)
    query_engine = index.as_query_engine(
        system_prompt=system_prompt,
        similarity_top_k=3
    )

    return query_engine