import { Tag, addTag, deleteTag, updateTag, saveTags, loadTags } from '@src/data/tag';
import { type Writable, writable, get } from 'svelte/store';
import { describe, it, expect, vi } from 'vitest';

describe('Tag', () => {
  describe('addTag', () => {
    it("should add the tag to the store if it's not already present", () => {
      const mockTag = new Tag('js', true);
      const mockStore: Writable<Tag[]> = writable([]);
      addTag(mockTag, mockStore);
      const tags = get(mockStore);
      expect(tags.length).toBe(1);
      expect(tags[0]).toStrictEqual(mockTag);
    });

    it('should do nothing if the tag is already in the store', () => {
      const mockTag = new Tag('js', true);
      const mockStore = writable([mockTag]);
      addTag(mockTag, mockStore);
      const tags = get(mockStore);
      expect(tags.length).toBe(1);
      expect(tags[0]).toStrictEqual(mockTag);
    });
  });

  describe('deleteTag', () => {
    it('should delete the tag if it is found in the store', () => {
      const mockTag = new Tag('js', true);
      const mockStore = writable([mockTag]);
      deleteTag(mockTag.name, mockStore);
      const tags = get(mockStore);
      expect(tags.length).toBe(0);
    });

    it('should skip deleting if the tag is not in the store', () => {
      const mockTag = new Tag('js', true);
      const mockStore = writable([new Tag('css', true)]);
      deleteTag(mockTag.name, mockStore);
      const tags = get(mockStore);
      expect(tags.length).toBe(1);
    });
  });

  describe('updateTag', () => {
    it('should update the tag if its found in the store', () => {
      const mockTag = new Tag('js', false);
      const mockStore = writable([new Tag('js', true)]);
      updateTag(mockTag, mockStore);
      const tags = get(mockStore);
      expect(tags.length).toBe(1);
      expect(tags[0]).toStrictEqual(mockTag);
    });

    it('should ignore updating if the tag is not found in the store', () => {
      const mockTag = new Tag('js', false);
      const storedTag = new Tag('css', true);
      const mockStore = writable([storedTag]);
      updateTag(mockTag, mockStore);
      const tags = get(mockStore);
      expect(tags.length).toBe(1);
      expect(tags[0]).toStrictEqual(storedTag);
    });
  });

  describe('saveTags', () => {
    it('should save a stringified version of the tags to localStorage', () => {
      vi.stubGlobal('localStorage', {
        setItem: vi.fn()
      });
      const mockStore = writable([new Tag('js', true), new Tag('css', false)]);
      saveTags(mockStore);
      expect(localStorage.setItem).toHaveBeenCalledOnce();
      expect(localStorage.setItem).toHaveBeenCalledWith('tags', JSON.stringify(get(mockStore)));
      vi.resetAllMocks();
    });
  });

  describe('loadTags', () => {
    it('should load the tags from a json string into the store', () => {
      const mockTags = [new Tag('js', true), new Tag('css', false)];
      const mockJsonString = JSON.stringify(mockTags);
      const mockStore: Writable<Tag[]> = writable([]);
      loadTags(mockJsonString, mockStore);
      expect(get(mockStore)).toEqual(mockTags);
    });
  });
});
