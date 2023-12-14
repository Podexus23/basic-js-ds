const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  root() {
    if (!this._root) return null;
    return this._root;
  }

  add(data, tree = this._root) {
    let node = data instanceof Node ? data : new Node(data);

    if (!this._root) {
      this._root = node;
      return;
    }

    if (node.data > tree.data && tree.right === null) {
      tree.right = node;
      return;
    } else if (node.data > tree.data && tree.right !== null) {
      this.add(node, tree.right);
    }

    if (node.data < tree.data && tree.left === null) {
      tree.left = node;
      return;
    } else if (node.data < tree.data && tree.left !== null) {
      this.add(node, tree.left);
    }
  }

  has(data) {
    return this.find(data) ? true : false;
  }

  find(data, tree = this._root) {
    if (tree.data === data) return tree;
    if (tree.left === null && tree.right === null) return null;

    if (data > tree.data && tree.right !== null) {
      this.parentNode = tree;
      return this.find(data, tree.right);
    }
    if (data < tree.data && tree.left !== null) {
      this.parentNode = tree;
      return this.find(data, tree.left);
    }
    return null;
  }

  remove(data) {
    let toRemove = this.find(data);
    if (!toRemove) return;

    if (toRemove.right === null && toRemove.left === null) {
      !this.parentNode
        ? (this._root.data = null)
        : this.parentNode.right === toRemove
        ? (this.parentNode.right = null)
        : (this.parentNode.left = null);
      return;
    }

    if (toRemove.right !== null) {
      let newNode = toRemove.right;

      if (toRemove.left) this.add(toRemove.left, newNode);
      toRemove.left = newNode.left;
      toRemove.data = newNode.data;
      toRemove.right = newNode.right;
    } else if (toRemove.right === null) {
      toRemove.data = toRemove.left.data;
      toRemove.left = toRemove.left.left;
    } else toRemove.data = null;
  }

  min() {
    let branch = this._root;
    let min = branch.data;
    while (branch.left !== null) {
      if (branch.left.data < min) min = branch.left.data;
      branch = branch.left;
    }
    return min;
  }

  max() {
    let branch = this._root;
    let max = branch.data;
    while (branch.right !== null) {
      if (branch.right.data > max) max = branch.right.data;
      branch = branch.right;
    }
    return max;
  }
}

module.exports = {
  BinarySearchTree,
};
