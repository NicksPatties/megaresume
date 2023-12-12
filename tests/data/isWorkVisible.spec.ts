import { describe, it, expect } from 'vitest';
import { createBlankWork } from '@src/data/data';
import type { Tag } from '@src/data/tag';
import isWorkVisible from '@src/data/isWorkVisible';

describe('isWorkVisible', () => {
  it("returns true if there's a tag that is visible and matches", () => {
    const mockWork = createBlankWork();
    mockWork.highlights.push({
      visible: true,
      content: 'this is the content',
      tagNames: ['js', 'css', 'html']
    });

    const mockTags: Tag[] = [
      {
        name: 'js',
        visible: true
      }
    ];
    expect(isWorkVisible(mockWork, mockTags)).toBe(true);
  });

  it('returns false if the work does not have a tag that is visible', () => {
    const mockWork = createBlankWork();
    mockWork.highlights.push({
      visible: true,
      content: 'this is the content',
      tagNames: ['js', 'css', 'html']
    });

    const mockTags: Tag[] = [
      {
        name: 'ruby',
        visible: true
      }
    ];
    expect(isWorkVisible(mockWork, mockTags)).toBe(false);
  });

  it("returns false if the work's visibility is set to false", () => {
    const mockWork = createBlankWork();
    mockWork.visible = false;
    mockWork.highlights.push({
      visible: true,
      content: 'this is the content',
      tagNames: ['js', 'css', 'html']
    });

    const mockTags: Tag[] = [
      {
        name: 'js',
        visible: true
      }
    ];
    expect(isWorkVisible(mockWork, mockTags)).toBe(false);
  });

  it("returns false if all a work's highlights are not visible is set to false", () => {
    const mockWork = createBlankWork();
    mockWork.highlights.push({
      visible: false,
      content: 'this is the content',
      tagNames: ['js', 'css', 'html']
    });
    mockWork.highlights.push({
      visible: false,
      content: 'this is more content',
      tagNames: ['html']
    });

    const mockTags: Tag[] = [
      {
        name: 'js',
        visible: true
      }
    ];
    expect(isWorkVisible(mockWork, mockTags)).toBe(false);
  });

  it('returns false if the tags that are in a highlight are not visible', () => {
    const mockWork = createBlankWork();
    mockWork.highlights.push({
      visible: true,
      content: 'this is the content',
      tagNames: ['js', 'css', 'html']
    });

    const mockTags: Tag[] = [
      {
        name: 'js',
        visible: false
      }
    ];
    expect(isWorkVisible(mockWork, mockTags)).toBe(false);
  });
});
