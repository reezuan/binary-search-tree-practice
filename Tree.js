import { Node } from "./Node.js";

class Tree {
    constructor(arr) {
        this.arr = arr;
        this.root = this.#buildTree(arr);
    }

    /** 
     * Takes an array of data and turns it into a balanced binary tree
     * full of Node objects appropriately placed. The buildTree
     * function should return the level-0 root node.
    */
    #buildTree(array) {
        let cleanedArray = array;
        
        // 1. Sort the array.
        cleanedArray = this.#sortArray(cleanedArray);

        // 2. Remove duplicates from the array.
        cleanedArray = this.#removeDuplicatesInArray(cleanedArray);

        // 3. Build the tree.
        let start = 0;
        let end = cleanedArray.length - 1;
        let mid = Math.floor((start + end) / 2);

        if (start > end) {
            return null;
        }

        const root = new Node(cleanedArray[mid]);
        root.left = this.#buildTree(cleanedArray.slice(start, mid));
        root.right = this.#buildTree(cleanedArray.slice(mid + 1));

        return root;
    }

    /**
     * Logs the tree to the console in a structured format.
    */
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    /**
     * Insert the given value into the tree.
    */
    insert(value, rootNode = this.root) {
        let currentNode = rootNode;

        if (currentNode === null) {
            currentNode = new Node(value);
        } else if (value < currentNode.data) {
            currentNode.left = this.insert(value, currentNode.left);
        } else if (value > currentNode.data) {
            currentNode.right = this.insert(value, currentNode.right);
        }

        return currentNode;
    }

    deleteItem(value, rootNode = this.root) {
        let currentNode = rootNode;

        if (currentNode === null) {
            return currentNode;
        } else if (value < currentNode.data) {
            currentNode.left = this.deleteItem(value, currentNode.left);
        } else if (value > currentNode.data) {
            currentNode.right = this.deleteItem(value, currentNode.right);
        } else {
            if (currentNode.left === null && currentNode.right === null) {
            // No children.
                currentNode = null;
                return currentNode;
            } else if (currentNode.left === null) {
            // 1 child (on right).
                currentNode = currentNode.right;
                return currentNode;
            } else if (currentNode.right === null) {
            // 1 child (on left).
                currentNode = currentNode.left;
                return currentNode;
            } else {
                // Find node with minimum value in right subtree.
                let minimumNode = currentNode.right;

                while (minimumNode.left !== null) {
                    minimumNode = minimumNode.left;
                }

                currentNode.data = minimumNode.data;
                currentNode.right = this.deleteItem(minimumNode.data, currentNode.right);
            }
        }

        return currentNode;
    }

    // --------------------------------------------------------------------
    // 👇🏼 HELPER METHODS 👇🏼
    // --------------------------------------------------------------------

    #sortArray(arr) {
        if (!Array.isArray(arr) || arr.length === 0) {
            return [];
        } else if (Array.isArray(arr) && arr.length === 1) {
            return arr;
        }
    
        const leftArray = this.#sortArray(arr.slice(0, Math.floor(arr.length / 2)));
        const rightArray = this.#sortArray(arr.slice(Math.floor(arr.length / 2)));
        const newArray = [];
    
        while (leftArray.length > 0 && rightArray.length > 0) {
            if (leftArray[0] < rightArray[0]) {
                newArray.push(leftArray.shift());
            } else {
                newArray.push(rightArray.shift());
            }
        }
    
        while (leftArray.length > 0 || rightArray.length > 0) {
            if (leftArray.length > 0) {
                newArray.push(leftArray.shift());
            } else {
                newArray.push(rightArray.shift());
            }
        }
    
        return newArray;
    }
    
    #removeDuplicatesInArray(arr) {
        const newArray = arr;
    
        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === newArray[i + 1] && i !== newArray.length - 1) {
                newArray.splice(i + 1, 1);
                i -= 1;
            }
        }
    
        return newArray;
    }
}

export { Tree }