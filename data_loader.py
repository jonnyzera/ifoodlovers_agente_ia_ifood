import pandas as pd
from llama_index.readers.schema import Document as LlamaIndexDocument
import os

def carregar_e_preparar_base(caminho_csv):
    """Carrega o CSV e o transforma em document do LlamaIndex."""
    if not os.path.exists(caminho_csv):
        raise FileNotFoundError(f"Arquivo '{caminho_csv}' não encontrado.")

        df = pd.read_csv(caminho_csv)

        documentos_llama_index = []
        for _, row in df.iterrows():
            # Cria o contexto de texto
            texto_completo = (
                f"Categoria: {row['categoria']}. "
                f"Pergunta relacionada: {row['pergunta']}. "
                f"Resposta Oficial: {row['resposta']}."
                f"Fonte/Política: {row['fonte_politica']}."
            )

            # Cria o documento com metadados
            doc = LlamaIndexDocument(
                text=texto_completo,
                metadata={"categoria": row['categoria'], "fonte": row['fonte']}
            )

            documentos_llama_index.append(doc)

        print(f"Data Loader: {len(documentos_llama_index)} documentos carregados e preparados.")
        return documentos_llama_index