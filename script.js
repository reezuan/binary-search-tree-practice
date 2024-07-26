import { Tree } from "./Tree.js";

// 1. Create a binary search tree from an array of random numbers < 100.
let treeValues = [];

for (let i = 0; i < 20; i++) {
    treeValues.push(Math.floor(Math.random() * 100));
}

let tree = new Tree(treeValues);
tree.prettyPrint();
// │               ┌── 99
// │           ┌── 96
// │       ┌── 90
// │       │   └── 81
// │   ┌── 80
// │   │   │       ┌── 77
// │   │   │   ┌── 73
// │   │   └── 69
// │   │       └── 66
// └── 64
//     │           ┌── 57
//     │       ┌── 51
//     │   ┌── 45
//     │   │   └── 43
//     └── 41
//         │   ┌── 33
//         └── 32
//             └── 9

// 2. Confirm that the tree is balanced.
console.log(tree.isBalanced()); // True

// 3. Print out all elements in level order.
let levelOrderValues = [];

tree.levelOrder(node => {
    levelOrderValues.push(node.data);
});

console.log(levelOrderValues); // [64, 41, 80, 32, 45, 69, 90, 9, 33, 43, 51, 66, 73, 81, 96, 57, 77, 99]

// 4. Print out all elements in pre-order.
let preOrderValues = [];

tree.preOrder(node => {
    preOrderValues.push(node.data);
});

console.log(preOrderValues); // [64, 41, 32, 9, 33, 45, 43, 51, 57, 80, 69, 66, 73, 77, 90, 81, 96, 99]

// 5. Print out all elements in in-order.
let inOrderValues = [];

tree.inOrder(node => {
    inOrderValues.push(node.data);
});

console.log(inOrderValues); // [9, 32, 33, 41, 43, 45, 51, 57, 64, 66, 69, 73, 77, 80, 81, 90, 96, 99]

// 6. Print out all elements in post-order.
let postOrderValues = [];

tree.postOrder(node => {
    postOrderValues.push(node.data);
});

console.log(postOrderValues); // [9, 33, 32, 43, 57, 51, 45, 41, 66, 77, 73, 69, 81, 99, 96, 90, 80, 64]

// 7. Unbalance the tree by adding several numbers > 100.
for (let i = 0; i < 10; i++) {
    tree.insert(Math.floor(Math.random() * 100) + 100);
}

tree.prettyPrint();
// │                           ┌── 199
// │                           │   └── 191
// │                       ┌── 181
// │                       │   └── 176
// │                       │       └── 174
// │                   ┌── 166
// │                   │   └── 157
// │                   │       │   ┌── 136
// │                   │       └── 130
// │                   │           └── 105
// │               ┌── 99
// │           ┌── 96
// │       ┌── 90
// │       │   └── 81
// │   ┌── 80
// │   │   │       ┌── 77
// │   │   │   ┌── 73
// │   │   └── 69
// │   │       └── 66
// └── 64
//     │           ┌── 57
//     │       ┌── 51
//     │   ┌── 45
//     │   │   └── 43
//     └── 41
//         │   ┌── 33
//         └── 32
//             └── 9

// 8. Confirm that the tree is unbalanced.
console.log(tree.isBalanced()); // False

// 9. Re-balance the tree.
tree.rebalance();
tree.prettyPrint();
// │               ┌── 199
// │           ┌── 191
// │           │   └── 181
// │       ┌── 176
// │       │   │   ┌── 174
// │       │   └── 166
// │       │       └── 157
// │   ┌── 136
// │   │   │       ┌── 130
// │   │   │   ┌── 105
// │   │   │   │   └── 99
// │   │   └── 96
// │   │       │   ┌── 90
// │   │       └── 81
// └── 80
//     │           ┌── 77
//     │       ┌── 73
//     │       │   └── 69
//     │   ┌── 66
//     │   │   │   ┌── 64
//     │   │   └── 57
//     └── 51
//         │       ┌── 45
//         │   ┌── 43
//         │   │   └── 41
//         └── 33
//             │   ┌── 32
//             └── 9

// 10. Confirm that the tree is balanced.
console.log(tree.isBalanced()); // True

// 11. Print out all elements in level order.
levelOrderValues = [];

tree.levelOrder(node => {
    levelOrderValues.push(node.data);
});

console.log(levelOrderValues);
// [80, 51, 136, 33, 66, 96, 176, 9, 43, 57, 73, 81, 105, 166, 191, 32, 41, 45, 64, 69, 77, 90, 99, 130, 157, 174, 181, 199]

// 12. Print out all elements in pre-order.
preOrderValues = [];

tree.preOrder(node => {
    preOrderValues.push(node.data);
});

console.log(preOrderValues);
// [80, 51, 33, 9, 32, 43, 41, 45, 66, 57, 64, 73, 69, 77, 136, 96, 81, 90, 105, 99, 130, 176, 166, 157, 174, 191, 181, 199]

// 13. Print out all elements in in-order.
inOrderValues = [];

tree.inOrder(node => {
    inOrderValues.push(node.data);
});

console.log(inOrderValues);
// [9, 32, 33, 41, 43, 45, 51, 57, 64, 66, 69, 73, 77, 80, 81, 90, 96, 99, 105, 130, 136, 157, 166, 174, 176, 181, 191, 199]

// 14. Print out all elements in post-order.
postOrderValues = [];

tree.postOrder(node => {
    postOrderValues.push(node.data);
});

console.log(postOrderValues);
// [32, 9, 41, 45, 43, 33, 64, 57, 69, 77, 73, 66, 51, 90, 81, 99, 130, 105, 96, 157, 174, 166, 181, 199, 191, 176, 136, 80]