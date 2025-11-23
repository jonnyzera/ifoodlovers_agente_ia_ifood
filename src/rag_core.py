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
        "Você é um Agente de IA interno do Ifood, especializado em orientar Foodlovers (clientes) com dúvidas sobre pedidos, cancelamentos e reembolsos. "
        "Seu principal objetivo é fornecer respostas **diretas, práticas e não-técnicas** para o Foodlover, baseadas exclusivamente na base de conhecimento. "
        "Instruções cruciais:\n"
        "1. **Tradução:** Você deve traduzir termos internos (como 'API interna', 'Fluxo Financeiro', 'Política X.Y') para ações concretas que o cliente pode realizar (ex: 'Verifique na tela de Detalhes do Pedido', 'Contate o Suporte via Chat').\n"
        "2. **Regra de Ouro (Fallback Seguro):** Se a dúvida envolver **status financeiro** (ex: reembolso, estorno) ou se a resposta da base for genérica ou técnica (como 'Consultar API'), **sempre** oriente o cliente a buscar o **atendimento oficial via chat/suporte do aplicativo** para validação em tempo real e abertura de ticket, se necessário."
    )

    # Cria o mecanismo de consulta (agente)
    query_engine = index.as_query_engine(
        system_prompt=system_prompt,
        similarity_top_k=3
    )

    return query_engine