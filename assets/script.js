// ==================== JAVASCRIPT PARA INTERATIVIDADE (LÓGICA DO CHAT) ====================
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const queryForm = document.getElementById('query-form');
    const userInput = document.getElementById('user-input');

    // 🌟 VARIÁVEL GLOBAL: Array para armazenar o histórico de consultas (Pergunta, Categoria e HORA) 🌟
    const queryHistory = []; 
    // ELEMENTOS DO SIDEBAR: Pegar referências pelos IDs
    const contextoAtualSpan = document.getElementById('contexto-atual');
    const historicoConsultasDiv = document.getElementById('historico-consultas');
    
    // Mensagem de boas-vindas inicial do Agente
    appendMessage('agent', 'Olá! Sou seu Agente IA de Suporte Operacional. Estou pronto para consultas sobre políticas e fluxos internos.', []);
    
    // Inicializa o sidebar com a mensagem de 'Aguardando Consulta'
    updateSidebar(); 

    queryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pergunta = userInput.value.trim();
        if (pergunta === '') return;

        // 1. Mostrar a pergunta do usuário
        appendMessage('user', pergunta, []);

        // 2. Limpar input e desabilitar
        userInput.value = '';
        userInput.disabled = true;
        queryForm.querySelector('button').disabled = true;

        // 3. Chamar a API usando Fetch
        try {
            const response = await fetch('/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pergunta: pergunta }),
            });

            const result = await response.json();
            const resposta = result.response;
            const fontes = result.sources;
            
            if (resposta) {
                const categoriaMaisRelevante = getMostRelevantCategory(fontes);

                // 🌟 MUDANÇA: Captura e armazena o horário da consulta 🌟
                queryHistory.unshift({ 
                    pergunta: pergunta, 
                    categoria: categoriaMaisRelevante,
                    timestamp: new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})
                });
                
                // Mantém apenas as N últimas consultas no histórico
                if (queryHistory.length > 3) {
                    queryHistory.pop();
                }
                
                // Atualiza os elementos do sidebar
                updateSidebar(categoriaMaisRelevante);
            }

            // 4. Mostrar a resposta do agente
            appendMessage('agent', resposta, fontes);

        } catch (error) {
            console.error('Erro na comunicação com o backend:', error);
            appendMessage('agent', 'Desculpe, ocorreu um erro de comunicação com o servidor. Verifique o console do Flask.', []);
        } finally {
            // 5. Reabilitar input
            userInput.disabled = false;
            queryForm.querySelector('button').disabled = false;
            userInput.focus();
        }
    });
    
    // FUNÇÃO: Determina a categoria mais relevante (sem alterações)
    function getMostRelevantCategory(sources) {
        if (!sources || sources.length === 0) return 'Geral / Indefinido';
        
        const categoryCounts = sources.reduce((acc, s) => {
            acc[s.categoria] = (acc[s.categoria] || 0) + 1;
            return acc;
        }, {});
        
        let maxCount = 0;
        let mostRelevant = '';
        
        for (const cat in categoryCounts) {
            if (categoryCounts[cat] > maxCount) {
                maxCount = categoryCounts[cat];
                mostRelevant = cat;
            }
        }
        
        return mostRelevant.charAt(0).toUpperCase() + mostRelevant.slice(1) || 'Geral / Indefinido';
    }

    // 🌟 FUNÇÃO MODIFICADA: Renderiza o HTML com o horário e classes para o "quadrado" 🌟
    function updateSidebar(currentContext = 'Aguardando Consulta') {
        contextoAtualSpan.textContent = currentContext.toUpperCase();
        
        historicoConsultasDiv.innerHTML = ''; // Limpa o conteúdo
        
        if (queryHistory.length === 0) {
            historicoConsultasDiv.innerHTML = '<p>Nenhuma consulta registrada.</p>';
            return;
        }
        
        queryHistory.forEach((item, index) => {
            const label = index === 0 ? 'Atual' : (index === 1 ? 'Última' : 'Anterior');
            
            const pElement = document.createElement('p');
            // Adiciona classe para estilização do "quadrado"
            pElement.classList.add('history-item'); 
            
            // Renderiza o HTML com a hora capturada (item.timestamp) e formatação
            pElement.innerHTML = `
                <div class="history-header">
                    <strong>${label}</strong>
                    <span class="history-time">${item.timestamp}</span>
                </div>
                <div class="history-content">
                    ${item.pergunta} 
                    <em class="history-category">(Cat: ${item.categoria})</em>
                </div>
            `;
            
            historicoConsultasDiv.appendChild(pElement);
        });
    }

    // Função de exibição de mensagem (sem alterações, mas incluída para completar o arquivo)
    function appendMessage(sender, text, sources) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'user' ? 'user-message' : 'agent-message');
        messageDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;

        if (sender === 'agent' && sources && sources.length > 0) {
            const sourcesDiv = document.createElement('div');
            sourcesDiv.classList.add('sources');
            let sourcesText = '--- FONTES UTILIZADAS ---';
            const uniqueSources = {};
            
            sources.forEach(s => {
                const key = `${s.fonte} (Categoria: ${s.categoria})`;
                if (!uniqueSources[key]) {
                    uniqueSources[key] = true;
                    sourcesText += `\n- Fonte: ${s.fonte} (Cat: ${s.categoria})`;
                }
            });
            sourcesDiv.textContent = sourcesText.trim();
            messageDiv.appendChild(sourcesDiv);
        }

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});