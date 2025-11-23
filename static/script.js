        // ==================== JAVASCRIPT EMBUTIDO (LÓGICA DO CHAT) ====================
        document.addEventListener('DOMContentLoaded', () => {
            const chatBox = document.getElementById('chat-box');
            const queryForm = document.getElementById('query-form');
            const userInput = document.getElementById('user-input');

            // Mensagem de boas-vindas inicial do Agente
            appendMessage('agent', 'Olá! Sou seu Agente IA de Suporte Operacional. Estou pronto para consultas sobre políticas e fluxos internos.', []);

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

                    // 4. Mostrar a resposta do agente
                    appendMessage('agent', result.response, result.sources);

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
                    
                    // Filtra fontes duplicadas e formata para exibir as referências internas
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
                // Scroll para a última mensagem
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        });