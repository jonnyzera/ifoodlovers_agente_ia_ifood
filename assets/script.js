// ==================== JAVASCRIPT OTIMIZADO PARA INTERATIVIDADE ====================
document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const queryForm = document.getElementById('query-form');
    const userInput = document.getElementById('user-input');

    const queryHistory = []; 
    const contextoAtualSpan = document.getElementById('contexto-atual');
    const historicoConsultasDiv = document.getElementById('historico-consultas');
    
    // Mensagem de boas-vindas inicial do Agente
    appendMessage('agent', 'Olá! Sou seu Agente IA de Suporte Operacional. Estou pronto para consultas sobre políticas e fluxos internos.', []);
    
    updateSidebar(); 

    queryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pergunta = userInput.value.trim();
        if (pergunta === '') return;

        appendMessage('user', pergunta, []);

        userInput.value = '';
        userInput.disabled = true;
        const submitBtn = queryForm.querySelector('button');
        if (submitBtn) submitBtn.disabled = true;

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

                queryHistory.unshift({ 
                    pergunta: pergunta, 
                    categoria: categoriaMaisRelevante,
                    timestamp: new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})
                });
                
                if (queryHistory.length > 3) {
                    queryHistory.pop();
                }
                
                updateSidebar(categoriaMaisRelevante);
            }

            appendMessage('agent', resposta, fontes);

        } catch (error) {
            console.error('Erro na comunicação com o backend:', error);
            appendMessage('agent', 'Desculpe, ocorreu um erro de comunicação com o servidor. Verifique o console do Flask.', []);
        } finally {
            userInput.disabled = false;
            if (submitBtn) submitBtn.disabled = false;
            userInput.focus();
        }
    });
    
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

    function updateSidebar(currentContext = 'Aguardando Consulta') {
        if (contextoAtualSpan) {
            contextoAtualSpan.textContent = currentContext.toUpperCase();
        }
        
        if (!historicoConsultasDiv) return;
        historicoConsultasDiv.innerHTML = ''; 
        
        if (queryHistory.length === 0) {
            historicoConsultasDiv.innerHTML = '<p style="color: #717171;">Nenhuma consulta registrada.</p>';
            return;
        }
        
        queryHistory.forEach((item, index) => {
            const label = index === 0 ? 'Atual' : (index === 1 ? 'Última' : 'Anterior');
            
            const divElement = document.createElement('div');
            divElement.classList.add('context-item'); 
            divElement.style.marginBottom = '10px';
            
            divElement.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <strong style="font-size: 0.75rem; color: #EA1D2C;">${label}</strong>
                    <span style="font-size: 0.75rem; color: #717171;">${item.timestamp}</span>
                </div>
                <div>
                    <span style="font-size: 0.9rem; color: #1f1f1f; display: block; margin-bottom: 2px;">${item.pergunta}</span>
                    <em style="font-size: 0.75rem; color: #717171;">(Cat: ${item.categoria})</em>
                </div>
            `;
            
            historicoConsultasDiv.appendChild(divElement);
        });
    }

    function appendMessage(sender, text, sources) {
        if (!chatBox) return;

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        
        if (sender === 'user') {
            messageDiv.style.cssText = "margin: 12px 0; padding: 12px 16px; background-color: #EA1D2C; color: white; border-radius: 8px 8px 0 8px; margin-left: auto; max-width: 80%; word-break: break-word;";
        } else {
            messageDiv.style.cssText = "margin: 12px 0; padding: 12px 16px; background-color: #ffffff; color: #333333; border: 1px solid #e5e5e5; border-radius: 8px 8px 8px 0; margin-right: auto; max-width: 80%; word-break: break-word;";
        }

        // Formatação limpa: converte quebras de linha e remove/transforma os ** em negrito HTML real
        let formattedText = text ? text.replace(/\n/g, '<br>') : "Sem resposta do servidor.";
        formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong style="color: #1f1f1f;">$1</strong>');

        messageDiv.innerHTML = `<p style="margin: 0; line-height: 1.4;">${formattedText}</p>`;

        if (sender === 'agent' && sources && sources.length > 0) {
            const sourcesDiv = document.createElement('div');
            sourcesDiv.style.cssText = "margin-top: 8px; font-size: 0.75rem; color: #717171; border-top: 1px solid #eee; padding-top: 6px;";
            
            let sourcesText = '<strong>Fontes utilizadas:</strong>';
            const uniqueSources = {};
            
            sources.forEach(s => {
                const key = `${s.fonte} (Categoria: ${s.categoria})`;
                if (!uniqueSources[key]) {
                    uniqueSources[key] = true;
                    sourcesText += `<br>- ${s.fonte} (Cat: ${s.categoria})`;
                }
            });
            sourcesDiv.innerHTML = sourcesText;
            messageDiv.appendChild(sourcesDiv);
        }

        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
