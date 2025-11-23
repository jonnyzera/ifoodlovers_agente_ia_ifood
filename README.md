# 🍔 Foodlovers Agente IA Ifood

Agente de Inteligência Artificial para auxiliar usuários (Foodlovers) com dúvidas sobre pedidos, cancelamentos e reembolsos no iFood.  
O projeto utiliza **RAG (Retrieval-Augmented Generation)** com **LlamaIndex** e **Gemini (Google GenAI)** para fornecer respostas fundamentadas em uma base de conhecimento estruturada.

---

## 🚀 Funcionalidades
- **Busca semântica:** Base de conhecimento em CSV indexada com embeddings.
- **Integração com Gemini:** Geração de respostas inteligentes e contextualizadas.
- **Arquitetura modular:** Código organizado e fácil de manter.
- **Respostas fundamentadas:** Minimiza alucinações usando trechos relevantes do CSV.

---

## 📂 Estrutura do projeto
```text
foodlovers_agente_ia_ifood/
├─ main.py                # Ponto de entrada do agente
├─ config.py              # Configurações e variáveis de ambiente
├─ data_loader.py         # Carregamento da base CSV
├─ rag_core.py            # Lógica principal de RAG com LlamaIndex
├─ requirements.txt       # Dependências do projeto
├─ README.md              # Documentação do projeto
├─ .env.dev               # Variáveis para ambiente de desenvolvimento
├─ .env.prod              # Variáveis para ambiente de produção
└─ base_conhecimento.csv  # Base de conhecimento (exemplo)
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
DB_URL="sqlite:///dev.db"
```

---
## ▶️ Uso
**python main.py**

---
# Exemplos de perguntas:
- **Posso cancelar meu pedido?**
- **Qual é a política de reembolso?**





