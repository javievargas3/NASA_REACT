
let token = '6dea651d2c12b2461d367d018bf46a9e8d6536670f1a260b'



export const server_calls = {
    get: async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/notes`,{
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`,
                'Accept' : 'application/json'
            },
            
            
        });
        
        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`http://127.0.0.1:5000/api/notes`,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
		},

        update: async (id:string, data:any = {}) => {
            const response = await fetch(`http://127.0.0.1:5000/api/notes/${id}`, {
                method: 'POST',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `Bearer ${token}`
                    
                },
                body: JSON.stringify(data)
            });
        },

        delete: async(id:string) => {
            const response = await fetch(`http://127.0.0.1:5000/api/notes/${id}`,{
                method: 'DELETE',
                mode:'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `Bearer ${token}`
                }
            })
        }
    }