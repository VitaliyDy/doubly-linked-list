const Node = require('./node');

class LinkedList {
    constructor() {
        //init main properties of LinkedList
        this._head = null;
        this._tail = null;       
        this.length = 0;        
    }

     // Create new Node in List. Check if List is empty, if empty append data as head and tail of List
     // else append as tail, with changing links to "old" tail and from "old" tail to new one
    append(data) {        
        let temp;
        if (this.length === 0){
            this._head = this._tail = new Node(data, null, null);
        } else {
            temp = this._tail;
            this._tail = new Node(data, temp, null);
            temp.next = this._tail;
        } 
        this.length ++;
        return this;
    }

    //return data in head of List
    head() {
        return this._head.data;
    }

    //return data in tail of List
    tail() {
        return this._tail.data;
    }

    //return data in current Node index, using utility function for searching node
    at(index) {               
       return this.searchNodebyIndex(index).data;             
    }

    //insert new Node to List.
    // save Node with required index as "temp" (it will be next Node for new one), 
    // create new Node with internal links to next and previous Nodes
    // change links from previous and next Nodes to new one
    insertAt(index, data) {       
        let temp = this.searchNodebyIndex(index),
        tempPrev,
        newNode;   
             
        if(temp.data){
            // if (temp === this._head) {
            //     newNode = new Node(data, null, temp );
            //     temp.prev = newNode;                
            // } else {
            tempPrev = temp.prev;
            newNode = new Node(data, tempPrev, temp );
            if(tempPrev.next)
                tempPrev.next = newNode;
            temp.prev = newNode;                
            //}
            this.length ++;            
        } else {
            this.append(data);           
        }
        return this;
    }
    //check if length of List is 0
    isEmpty() {
        return(!this.length);
    }
    // clear Nodes from tail to head first, then change all links to null
    clear() {
        let temp;
        while(this.length > 0) {
             temp = this._tail.prev;
             this._tail = temp; 
             this.length --;
        }
        this._tail = this._head;
        this._head.data = this._head.next = this._head.prev = null;
        this.length = 0;
        return this;
    }

    //delete Node with specified index.
    //Find it, save as "temp", find neighbor nodes. change Links from neighbor nodes to each other.
    deleteAt(index) {
        let temp = this.searchNodebyIndex(index),
        prevNode,
        nextNode;

        if(temp){
            prevNode = temp.prev;
            nextNode = temp.next;  
            temp = null;   
            this.length --;
            if(prevNode && nextNode) {       //there are next and prev neighbor nodes
                prevNode.next = nextNode;  
                nextNode.prev = prevNode;              
            } else if (prevNode && !nextNode) { //delete last node
                prevNode.next= null;
                this._tail = prevNode;
            } else if(nextNode && !prevNode) { //delete first node
                nextNode.prev =null;
                this._head = nextNode;
            } else 
                this.clear(); // there is only one node in List                          
            return this;
        } else {
            return false //some exeption or error. there is no such index
        }
    }

    // reverse the list if he have more than one node
    // by changing links in opposite directions. and links on head and tail of List.
    reverse() {        
        let tempNode = this._head.next, 
        tempLink;

        if( tempNode === null ) {
            return this;
        }
        this._tail = this._head;
        this._tail.prev = this._tail.next;
        this._tail.next = null;         
        
        while (tempNode.next) {
            tempLink = tempNode.next;
            tempNode.next = tempNode.prev;
            tempNode.prev = tempLink;
            tempNode = tempNode.prev; // go to next node. ".prev" -cause we changed links earlye
        }        
        //this is last node (_tail). it has only "prev" link as tail of List. 
        // Change links and make it _head of List.
        tempNode.next = tempNode.prev;
        tempNode.prev = null;
        this._head = tempNode;
        return this;
    }

    //find index of specified data, viewing the list node after node
    indexOf(data) {
        let currentNode = this._head,
        index = 0;
        while( index < this.length ) {
            if (currentNode.data === data)
                return index;
            index ++;
            currentNode = currentNode.next
        }
        return -1; // there is no such data in List
    }

    // utility method foe search the node with specified index,
    searchNodebyIndex(index) {
        if( index >= 0  && index <= this.length){
            let current = this._head;
            for (let i = 0; i < index; i++ ) {
                current = current.next; 
            }            
            return current;  
        }
        else {
            return false; // there is no such index in List
        }
    }
}

module.exports = LinkedList;
