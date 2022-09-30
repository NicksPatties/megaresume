export interface DataShape {
  name: string;
  url: string;
}

export const data = new Promise<DataShape>((resolve) => {
  setTimeout(() => {
    const data: DataShape = {
      name: 'SvelteKit',
      url: 'https://kit.svelte.dev/'
    };
    resolve(data);
  }, 500);
});
