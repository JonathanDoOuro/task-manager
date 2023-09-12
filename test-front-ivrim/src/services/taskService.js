const TaskService = {
   
    baseUrl: "http://localhost:3000" + "/task",

    listTasksByStatus: async (endpoint) => {
        try {
            const response = await fetch(`${TaskService.baseUrl}/${endpoint}`);
            if (!response.ok) {
                throw new Error(`Erro de resposta da API: ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        }catch (error) {
            throw error;
        }
    },

    updateColun: async (formData, id, index) => {
        const statusMapping = {
            0: "naoIniciada",
            1: "aFazer",
            2: "fazendo",
            3: "feito",
        };
        formData.status = statusMapping[index];
        await TaskService.updateTask(formData, id);
    },

    updateTask: async (formData, id) => {
        console.log("dentro do service: ", formData, "id: ", id)
        try{
            const response = await fetch(`${TaskService.baseUrl}/${id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (response.ok) {
              return await response.json();
            } else {
                throw new Error(`Erro de resposta da API: ${response.statusText}`);
            }
        }catch (error) {
            throw error;
          }
    },

    createTask: async (formData) => {
        try{
            const response = await fetch(`${TaskService.baseUrl}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
      
            if (response.ok) {
              return response.json();
            } else {
                throw new Error(`Erro de resposta da API: ${response.statusText}`);
            }
        }catch (error) {
            throw error;
          }
    },

    deleteTask: async(id) => {
        try {
            const response = await fetch(`${TaskService.baseUrl}/${id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                }
              });
              return await response.json();
        } catch(error) {
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
  