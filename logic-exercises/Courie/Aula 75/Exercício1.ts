import { LinkedListNode } from "./LinkedListNode";

export class LinkedList {
  constructor(public start?: LinkedListNode | null) {}

  public addToTail(value: number) {
    if (!this.start) {
      this.start = new LinkedListNode(value);
    } else {
      let node: LinkedListNode = this.start;
      while (node && node.next !== undefined) {
        node = node.next!;
      }
      node.next = new LinkedListNode(value)
    }
  }

  public print(): void {
    let node: LinkedListNode | null = this.start || null;
    let i = 1;
    while (node !== null) {
      console.log(`Elemento ${i}: `, node.value);
      node = node.next!;
      i++;
    }
  }
}