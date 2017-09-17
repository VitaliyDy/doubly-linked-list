const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;       
        this.length = 0;
    }

    append(data) {
        
        if (this.length === 0){
            this._head = this._tail = new Node(data, null, null);
        } else {
            let temp = this._tail;
            this._tail = new Node(data, temp, null);
            temp.next = this._tail;
        } 
        this.length ++;
    }

    head() {
        return this._head.data;
    }

    tail() {
        return this._tail.data;
    }

    at(index) {
        let current = this._head;        
        if(index <= this.length){
            for (let i = 0; i < index; i++) {   
                current = current.next; 
            }    
            return current.data;
        }   else {
            return false;
        }   
                
    }

    insertAt(index, data) {}

    isEmpty() {}

    clear() {}

    deleteAt(index) {}

    reverse() {}

    indexOf(data) {}
}

module.exports = LinkedList;
