import { writable } from 'svelte/store';

const menuStack: string[] = [];
const defaultMenu = 'menu-main';
export const visibleMenu = writable(defaultMenu);

export const push = (id: string) => {
  const lastElementId = menuStack[menuStack.length - 1];
  // check if element id is already on the stack
  if (lastElementId == id) {
    console.warn(`${id} is already at end of stack`);
  } else {
    menuStack.push(id);
  }
  visibleMenu.set(menuStack[menuStack.length - 1]);
};

export const pop = () => {
  if (menuStack.length <= 0) {
    console.error(`menuStack is too short to pop! Ignoring`);
  } else {
    menuStack.pop();
  }
  if (menuStack.length == 0) {
    visibleMenu.set(defaultMenu);
  } else {
    visibleMenu.set(menuStack[menuStack.length - 1]);
  }
};

export const atMainMenu = (): boolean => {
  return menuStack.length == 0;
};
