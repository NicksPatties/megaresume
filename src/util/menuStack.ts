export const push = (id: string, menuStack: string[]): string[] => {
  const lastElementId = menuStack[menuStack.length - 1];
  // check if element id is already on the stack
  if (lastElementId == id) {
    console.warn(`${id} is already at end of stack`);
  } else {
    menuStack.push(id);
  }
  return menuStack;
};

export const pop = (menuStack: string[]): string[] => {
  if (menuStack.length <= 1) {
    console.error(`menuStack is too short to pop! Ignoring`);
  } else {
    menuStack.pop();
  }
  return menuStack;
};
