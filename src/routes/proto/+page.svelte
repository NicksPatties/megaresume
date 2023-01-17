<script lang="ts">
  import { writable, get, type Writable } from 'svelte/store';

  type Foo = {
    content: Writable<string>;
  };

  const firstContent = writable('foo');

  const fooStore: Writable<Foo[]> = writable([
    { content: firstContent },
    { content: writable('two') }
  ]);

  type Bar = {
    content: string;
  };

  const barStore: Writable<Bar[]> = writable([{ content: 'three' }, { content: 'four' }]);

  /**
   * changing the string store inside the foo word without updating the fooStore doesn't
   * update the fooStore properly. This looks like what is going on with my actual app.
   */
  function modifyFooWord(e: Event, strStore: Writable<string>): void {
    const target = e.target as HTMLInputElement;
    if (target) {
      const value = target.value;
      strStore.set(value);
    }
  }

  /**
   * It's still possible to live update the content of the stores, but I need to make sure
   * I update the entire store if I want to do any updates. This makes having stores inside
   * the objects pretty pointless, since I'll be updating their contents while updating the
   * entire store anyway.
   *
   * I can use this technique to fix the display issues for now, but I need to rethink the data
   * of the application and implement a less confusing solution.
   */
  function modifyFooWordBetter(e: Event, i: number): void {
    const target = e.target as HTMLInputElement;
    if (target) {
      fooStore.update((foos) => {
        foos[i].content.set(target.value);
        return foos;
      });
    }
  }

  /**
   * Modifying the store seems pretty straightforward, as long as I know the index of
   * the array element that I'd like to modify. Since I'm updating the barStore, everything
   * that is observing the barStore actually updates accordingly.
   */
  function modifyBarWord(e: Event, i: number): void {
    const target = e.target as HTMLInputElement;
    if (target) {
      const value = target.value;
      barStore.update((bars) => {
        bars[i].content = value;
        return bars;
      });
    }
  }
</script>

<div class="container">
  {#each $fooStore as foo, i}
    <div class="row">
      <input type="text" value={get(foo.content)} on:input={(e) => modifyFooWordBetter(e, i)} />
      <span>{get(foo.content)}</span>
    </div>
  {/each}

  {#each $barStore as bar, i}
    <div class="row">
      <input type="text" value={bar.content} on:input={(e) => modifyBarWord(e, i)} />
      <span>{bar.content}</span>
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
  }

  .row {
    display: flex;
    width: 30%;
  }
</style>
