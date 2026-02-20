from flask import Flask, render_template, request, jsonify
from src.config import configurar_settings, CAMINHO_BASE 
from src.data_loader import carregar_e_preparar_base   
from src.rag_core import criar_index, configurar_agente 
import sys

app = Flask(__name__)
agente = None

def inicializar_agente():
    """Inicializa o Agente RAG uma única vez ao iniciar o servidor."""
    global agente
    try:
        configurar_settings()
        documentos = carregar_e_preparar_base(CAMINHO_BASE)
        index = criar_index(documentos)
        agente = configurar_agente(index) 
        print("--- AGENTE WEB ATIVADO ---")
    except Exception as e:
        print(f"Erro fatal na inicialização do agente: {e}", file=sys.stderr)
        sys.exit(1)

with app.app_context():
    inicializar_agente()

@app.route('/')
def index():
    """Carrega a interface HTML do chat."""
    return render_template('index.html')

@app.route('/query', methods=['POST'])
def query():
    """Endpoint da API para receber perguntas e retornar a resposta do RAG."""
    data = request.json
    pergunta = data.get('pergunta', '')
    
    if not pergunta or not agente:
        return jsonify({"response": "Erro interno: Agente não inicializado ou pergunta vazia."}), 500

    try:
        # AQUI O AGENTE FAZ A CONSULTA REAL
        response_obj = agente.query(pergunta)
        
        fontes = []
        if response_obj.source_nodes:
            for node in response_obj.source_nodes:
                fontes.append({
                    "fonte": node.metadata.get('fonte', 'N/A'),
                    "categoria": node.metadata.get('categoria', 'N/A')
                })

        return jsonify({
            "response": response_obj.response,
            "sources": fontes
        })
    except Exception as e:
        return jsonify({"response": f"Ocorreu um erro ao processar a consulta: {e}"}), 500

if __name__ == '__main__':
    # Roda o servidor Flask em modo de debug para desenvolvimento
    app.run(debug=True)