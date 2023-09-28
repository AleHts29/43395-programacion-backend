let instance = null

class SingletonClass {
    constructor() {
        this.value = Math.random(100)
    }

    static getInstance() {
        // Con singleton
        if (!instance) {
            instance = new SingletonClass()
        }

        // Sin singleton 
        // instance = new SingletonClass()
        return instance
    }
}

module.exports = SingletonClass