const localStorageApi = {

    //Проверяет хранилище по ключу. Возвращает: Пустой массив - если не находит, и Данные - если находит
    getMovies(key) {        
        const keyStorage = this.load(key);

        if(Array.isArray(keyStorage)) return keyStorage;
        
        this.save(key, []);
        return [];
    },
    
    //Добавляет фильм : Пушит переданный 'value' в LocalStorage с ключем 'key'
    addMovie(key, value) {        
        const dataFromLocalStorage = this.load(key);
        this.save(key, [value, ...dataFromLocalStorage]);
    },
    
    removeMovie(key, value) {
  
        const dataFromLocalStorage = this.load(key);

        const valueIndex = dataFromLocalStorage.indexOf(value);

        if (0 <= valueIndex) { 
            dataFromLocalStorage.splice(valueIndex, 1);

            this.save(key, dataFromLocalStorage);
        }
     },


    // Принимает ключ `key` по которому будет произведена выборка.
    load(key){
        try {
            const serializedState = localStorage.getItem(key);

            return serializedState === null ? undefined : JSON.parse(serializedState);
        } catch (err) {
            console.error('Get state error: ', err);
        }
    },

    // Принимает ключ `key` и значение `value`.
    save(key, value){
        try {
            const serializedState = JSON.stringify(value);
            localStorage.setItem(key, serializedState);
        } catch (err) {
            console.error('Set state error: ', err);
        }
    }
}
export default localStorageApi;