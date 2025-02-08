class LinkedNode
{
    constructor(value)
    {
        this.value = value;
        this.next = null;
    }
}

class LinkedList
{
    constructor(useArr = false)
    {
        this.head = null;
        this.arr = [];
        this.useArr = useArr;
    }

    size()
    {
        if (this.useArr)
            return this.arr.length;

        let length = 0;
        let temp = this.head;
        while (temp != null)
        {
            temp = temp.next;
            length++;
        }
        return length;
    }

    init(value)
    {
        this.head = new LinkedNode(value);

        if (this.useArr) this.arr = [value];
    }

    callNodeMethods(callback)
    {
        let temp = this.head;
        while (temp != null)
        {
            callback(temp.value);
            temp = temp.next;
        }
    }

    addNode(value)
    {
        const node = new LinkedNode(value);
        node.next = this.head;

        this.head = node;

        if (this.useArr) this.arr.unshift(value);
    }

    addBulk(values)
    {
        for (const v of values)
        {
            this.addNode(v);
        }

        if (this.useArr) this.arr.unshift(...values);
    }

    pop()
    {
        // if (this.head.next)
            this.head = this.head.next;
    }

    deleteFromIndex(index)
    {
        if (index == 0)
        {
            this.pop();
            return;
        }

        let temp = this.head;
        for (let i = 1; i < index && temp; i++) {
            temp = temp.next;
        }

        if (!temp || !temp.next) {
            console.log("Index out of range.");
            return;
        }
        
        // Update the next pointer
        temp.next = temp.next.next;
    }

    deleteNode(value)
    {
        let temp = this.head;
        let index = 0;
        while (temp != null && temp.value != value) {
            temp = temp.next;
            index++;
        }

        if (temp == null)
        {
            // console.log("Value not found!");
            return;
        }
        
        this.deleteFromIndex(index);

        if (this.useArr)
        {
            this.arr=[];
            this.callNodeMethods((obj) =>
            {
                this.arr.push(obj);
            });
        }
    }
}