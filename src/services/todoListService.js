class TodoListService {
    _apiKey = "0b7a39d1d230551375e150c26964761f15f93288"


    getResource = async (url) => {
        let res = await fetch(url); 

        if(!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllTasks = async () => {
        const res = await this.getResource(`https://api.todoist.com/rest/v1/tasks\
        -H ${this._apiKey}`);

        return res;
    }

}

export default TodoListService;