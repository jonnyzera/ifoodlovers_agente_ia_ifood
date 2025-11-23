from llama_index.core import VectorStoreIndex

def criar_index(documentos):
    """Criar um VectorStoreIndex a parte dos documentos carregados."""
    index = VectorStoreIndex.from_documents(documentos)
    print("RAG Core: Indexação concluída.")
    return index

    # SYSTEM PROMPT com a Regra de Ouro (Fallback Seguro)
    system_prompt = (
        "Você é um Agente de IA interno do Ifood, especializado em orientar"
        "... [O restante do seu System Prompt, incluindo as regras de Fallback] ..."
    )

    # Cria o mecanismo de consulta 
    query_engine = index.as_query_engine(
        system_prompt=system_prompt,
        similarity_top_k=3
    )

    return query_engine