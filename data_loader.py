import pandas as pd
from llama_index.core.schema import Document as LlamaIndexDocument # CORREÇÃO: Nova localização da classe Document
import os

def carregar_e_preparar_base(caminho_csv):
    """Carrega o CSV e o transforma em document do LlamaIndex."""
    
    # 1. Checagem de arquivo
    if not os.path.exists(caminho_csv):
        raise FileNotFoundError(f"Arquivo '{caminho_csv}' não encontrado.")

    # 2. Carregamento do DataFrame
    # Este bloco deve estar fora do 'if' acima.
    try:
        df = pd.read_csv(caminho_csv)
    except Exception as e:
        # Adicionar tratamento de erro caso o arquivo exista, mas não possa ser lido
        raise ValueError(f"Erro ao ler o arquivo CSV: {e}")

    documentos_llama_index = []
    for _, row in df.iterrows():
        # Cria o contexto de texto
        # CORREÇÃO: Alterado 'fonte_politica' para 'fonte' para corresponder ao CSV de exemplo
        texto_completo = (
            f"Categoria: {row['categoria']}. "
            f"Pergunta relacionada: {row['pergunta']}. "
            f"Resposta Oficial: {row['resposta']}."
            f"Fonte/Política: {row['fonte']}." 
        )

        # Cria o documento com metadados
        doc = LlamaIndexDocument(
            text=texto_completo,
            metadata={"categoria": row['categoria'], "fonte": row['fonte']}
        )

        documentos_llama_index.append(doc)

    print(f"Data Loader: {len(documentos_llama_index)} documentos carregados e preparados.")
    return documentos_llama_index