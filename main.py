from config import configurar_settings, CAMINHO_BASE
from data_loader import carregar_e_preparar_base
from rag_core import criar_index, configurar_agente
import sys # Para tratar erros

def main():
    try:
        # 1. Setup
        configurar_settings()

        # 2. Carregar e Indexar
        documentos = carregar_e_preparar_base(CAMINHO_BASE)
        index = criar_index(documentos)

        # 3. Configurar o Agente
        agente = configurar_agente(index)
        
        print("\n--- AGENTE (Modular) ATIVADO ---")
        
        while True:
            pergunta = input("\nFoodlover, qual sua dúvida? -> ")
            if pergunta.lower() == 'sair':
                break

            response = agente.query(pergunta)
            
            print("\n--- RESPOSTA DO AGENTE ---")
            print(response.response)
            
            # Mostrar fontes
            print("\n--- FONTES UTILIZADAS ---")
            if response.source_nodes:
                for node in response.source_nodes:
                    print(f"- Fonte: {node.metadata.get('fonte')} (Categoria: {node.metadata.get('categoria')})")
            print("------------------------")

    except FileNotFoundError as e:
        print(f"Erro: {e}", file=sys.stderr)
    except Exception as e:
        print(f"Ocorreu um erro fatal: {e}. Encerrando.", file=sys.stderr)

if __name__ == "__main__":
    main()