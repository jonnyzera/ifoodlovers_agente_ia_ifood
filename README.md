# 🍔 Foodlovers Agente IA Ifood

Agente de Inteligência Artificial para auxiliar usuários (Foodlovers) com dúvidas sobre pedidos, cancelamentos e reembolsos no iFood.  
O projeto utiliza **RAG (Retrieval-Augmented Generation)** com **LlamaIndex** e **Gemini (Google GenAI)** para fornecer respostas fundamentadas em uma base de conhecimento estruturada.

---

## 🚀 Funcionalidades
- **Busca Semântica:** Encontra a política exata na base de conhecimento (CSV) via similaridade de significado.
- **Geração Contextual:** Utiliza o Gemini para traduzir políticas internas ("Política 3.2", "Fluxo Financeiro") em respostas **diretas, práticas e não-técnicas** para o cliente.
- **Fallback Seguro:** Configurado para **sempre** encaminhar o usuário ao suporte oficial em casos de status financeiro ou ambiguidade.
- **Arquitetura modular:** Código organizado e fácil de manter.
- **Respostas fundamentadas:** Minimiza alucinações usando trechos relevantes do CSV.

---

## 📂 Estrutura do projeto
```text
foodlovers_agente_ia_ifood/
│
├─ app.py                                # Ponto de entrada principal do Agente Web (Flask)
├─ main.py                               # Ponto de entrada do agente via Linha de Comando (CLI)
├─ requirements.txt                      # Lista de dependências Python (LlamaIndex, Flask, etc.)
├─ README.md                             # Documentação do projeto
├─ vercel.json                           # Configuração de roteamento e build para o Deploy (Vercel)
├─ runtime.txt                           # Define a versão Python para o Deploy (ex: python-3.11)
├─ base_conhecimento_ifood_genai-exemplo.csv  # Base de conhecimento em dados (CSV)
├─ .gitignore                            # Arquivo para ignorar arquivos não necessários no Git
│
├─ templates/                            # Arquivos HTML
│  └─ index.html                         # Interface do chat (front-end)
│
├─ static/                               # Arquivos Estáticos
│  ├─ style.css                          # Estilização visual da interface
│  └─ script.js                          # Lógica JavaScript do chat (requisições à API)
│
└─ src/                                  # Lógica Central do Agente (Módulos)
   ├─ __init__.py                        # Define 'src' como um pacote Python
   ├─ config.py                          # Configuração de LLM/Embedding e variáveis de ambiente
   ├─ data_loader.py                     # Lógica de carregamento e preparo da base CSV
   └─ rag_core.py                        # Lógica de RAG: Criação do VectorStoreIndex e configuração do Query Engine
```

## 🛠️ Instalação

### Clone o repositório
```bash
git clone https://github.com/jonnyzera/foodlovers_agente_ia_ifood.git
cd foodlovers_agente_ia_ifood
```

## 🔑 Configuração

```APP_ENV=dev
GEMINI_API_KEY="sua_chave_aqui"
```

---
## ▶️ Uso
**python main.py**

---
# Exemplos de perguntas:
- **O cliente quer reembolso, mas o pedido já saiu para entrega. Ainda é permitido?**
- **Posso cancelar meu pedido?**
- **Qual é a política de reembolso?**
-  **Quando o agente deve gerar orientação de ticket?**
- **Há situações em que o reembolso não se aplica?**
- **O cliente pode pedir reembolso após o pedido sair para entrega?**
- **O que fazer se o restaurante não tiver o item pedido?**
- **Cancelamento solicitado após despacho?**
- **Estorno é automático em qual situação?**
- **O cliente pode ser cobrado duas vezes?**



