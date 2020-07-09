import {  LinkedListNode } from "./LinkedListNode";
import { LinkedList } from "./Exercício1"

export class Queue {
  public nodes: LinkedList = new LinkedList();
	// considera-se o gabarito do item A para essa Lista Ligada!

  isEmpty(): boolean {
    return this.nodes.start === undefined;
  }

  enqueue(value: number): void {
    this.nodes.addToTail(value);
  }

  dequeue(): LinkedListNode | undefined {
    if (this.nodes.start) {
			const nodeToDequeue = this.nodes.start;
      this.nodes.start = this.nodes.start.next || null;
			return nodeToDequeue
    }
  }

  print(): void {
    this.nodes.print();
  }
}