export function checkStringSymbols(input: string): boolean {
  if (input.length % 2 !== 0) {
    return false
  }

  const openStack: Stacks = new Stacks()

  for (const symbol of input) {
    if (symbol === '(' || symbol === '[' || symbol === '{') {
      openStack.push(symbol)
    }
    else {
      switch (symbol) {
        case ')':
          if (openStack.lastNode() === '(') {
            openStack.pop()
          } else {
            return false
          }
          break;
        case ']':
          if (openStack.lastNode() === '[') {
            openStack.pop()
          } else {
            return false
          }
          break;
        case '}':
          if (openStack.lastNode() === '{') {
            openStack.pop()
          } else {
            return false
          }
          break;
      }
    }
  }
  return openStack.isEmpty()
}

class Stacks {
  public nodes: (string | undefined)[] = [];

  isEmpty(): boolean {
    return this.nodes.length === 0;
  }

  push(value: string): void {
    this.nodes.push(value);
  }

  lastNode(): string {
    return this.nodes[this.nodes.length - 1]!
  }

  pop(): string | undefined {
    const nodeToPop = this.nodes[this.nodes.length - 1];
    this.nodes[this.nodes.length - 1] = undefined;
    this.nodes.length -= 1;
    return nodeToPop;
  }
}