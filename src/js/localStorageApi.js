const localStorageApi = {

    //Проверяет хранилище по ключу. Возвращает: Пустой массив - если не находит, и Данные - если находит
    getMovies(key) {        
        const keyStorage = this.load(key);

        if(Array.isArray(keyStorage)) return keyStorage;
        
        this.save(key, []);
        return [];
    },

    //Забирает по ID фильм из хранилища
    // getSingleMovie(key, id) { 

    //     const movies = this.load(key);
    //     // console.log(movies);
    //     const movie = movies.find(movie => movie.id === id);
    //     return movie;
    // },

    
    //Добавляет фильм : Пушит переданный 'value' в LocalStorage с ключем 'key'
    addMovie(key, value) {        
        const dataFromLocalStorage = this.load(key);
        this.save(key, [value, ...dataFromLocalStorage]);
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