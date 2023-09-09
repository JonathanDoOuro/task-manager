const TaskService = {
   
    baseUrl: " http://localhost:3000" + "/task",

    listTasksByStatus: async (endpoint) => {
        try {
            const response = await fetch(`${TaskService.baseUrl}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Erro de resposta da API: ${response.status}`);
            }
            const data = await response.json();
            return data;
        }catch (error) {
            throw error;
        }
    },

    loadColuns: async () => {
        const colunas = [
            {
                title: 'Tarefas',
                creatable: true,
                cards: await TaskService.listTasksByStatus("naoIniciada")
            },
            {
                title: 'A Fazer', 
                creatable: false,
                cards: await TaskService.listTasksByStatus("aFazer")
            },
            {
                title: 'Fazendo', 
                creatable: false,
                cards: await TaskService.listTasksByStatus("fazendo")
            },
            {
                title: 'Concluído', 
                creatable: false,
                done: true,
                cards: await TaskService.listTasksByStatus("feito")
            }
        ]
        return colunas
    }

};
  
export default TaskService;
  