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
     * Inserts a node with the given value into the tree.
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

    /**
     * Deletes the node with the given value from the tree.
     */
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

    /**
     * Returns the node with the given value.
     */
    find(value, rootNode = this.root) {
        let currentNode = rootNode;

        if (currentNode === null) {
            currentNode = null;
        } else if (value < currentNode.data) {
            currentNode = this.find(value, currentNode.left);
        } else if (value > currentNode.data) {
            currentNode = this.find(value, currentNode.right);
        }

        return currentNode;
    }

    /**
     * Accepts an optional callback function. Traverses the tree in
     * breadth-first level order and provides each node as an argument
     * to the callback.
     */
    levelOrder(callback) {
        let queue = [];
        
        if (this.root === null) {
            return;
        }

        queue.push(this.root);

        while (queue.length > 0) {
            let currentNode = queue[0];

            if (arguments.length > 0) {
                callback(currentNode);
            }

            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            }

            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            }

            queue.shift();
        }
    }

    /**
     * Returns the given node’s height. Height is defined as the number
     * of edges in the longest path from the given node to a leaf node.
     */
    height(node = this.root) {
        if (node === null) {
            return -1;
        }

        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    /**
     * Returns the given node’s depth. Depth is defined as the number
     * of edges in the path from the given node to the tree’s root node.
     */
    depth(node, root = this.root) {
        if (root === null) {
            return -1;
        } else if (node === root) {
            return 0;
        }

        let leftDepth = this.depth(node, root.left);
        let rightDepth = this.depth(node, root.right);

        // Increment counter only when matching node has been found.
        return Math.max(leftDepth, rightDepth) === -1 ? -1 : Math.max(leftDepth, rightDepth) + 1;
    }

    /**
     * Checks if the tree is balanced (i.e. the difference in height
     * between the left and right subtree of every node is not more
     * than 1).
     */
    isBalanced(root = this.root) {        
        let leftHeight = this.height(root.left) === -1 ? 0 : this.height(root.left) + 1;
        let rightHeight = this.height(root.right) === -1 ? 0 : this.height(root.right) + 1;

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        } else {
            let isLeftBalanced = root.left === null ? true : this.isBalanced(root.left);
            let isRightBalanced = root.right === null ? true : this.isBalanced(root.right);

            return isLeftBalanced === false || isRightBalanced === false ? false : true;
        }
    }

    /**
     * Rebalances an unbalanced tree.
     */
    rebalance() {
        let treeValues = [];

        this.levelOrder(node => {
            treeValues.push(node.data);
        });

        this.root = this.#buildTree(treeValues);
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