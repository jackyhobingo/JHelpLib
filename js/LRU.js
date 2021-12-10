class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.pre = null;
        this.next = null;
    }
}

class LRU {
    constructor(maxSize) {
        this.maxSize = maxSize
        this.valueMap = new Map()
        this.head = null;
        this.tail = null;
    }

    getCount() {
        return this.valueMap.size;
    }

    getHead() {
        if (this.getCount())
            return this.head.value;
        return null
    }

    getTail() {
        if (this.getCount())
            return this.tail.value;
        return null
    }

    has(key) {
        return this.valueMap.has(key);
    }

    get(key) {
        if (this.has(key)) {
            let node = this.valueMap.get(key)
            node.pre.next = node.next;
            node.next.pre = node.pre;
            node.next = this.head;
            node.pre = this.tail;
            this.tail = node;
            return node.value;
        } else {
            return null;
        }
    }

    removeHeadItem() {
        if (this.getCount() === 1) {
            this.valueMap.delete(this.head.key)
            this.head = null;
            this.tail = null;
        } else if (this.getCount() > 1) {
            this.head.next.pre = this.head.pre;
            this.head.pre.next = this.head.next;
            let key = this.head.key
            this.head = this.head.next;
            this.valueMap.delete(key)
        } else {
            this.head = null;
            this.tail = null;
        }
    }

    update(key, value) {
        if (this.has(key)) {
            let node = this.valueMap.get(key)
            node.value = value;
            this.valueMap.set(key, node)
        } else if (this.getCount() === this.maxSize) {
            this.removeHeadItem()
            this.update(key, value);
        } else {
            let node = new Node(key, value);
            if (this.getCount() === 0) {
                this.head = node;
                this.tail = node;
            }
            node.pre = this.tail;
            this.tail.next = node;
            node.next = this.head;
            this.head.pre = node;
            this.tail = node;
            this.valueMap.set(key, node)
        }
    }
}
