import { isHighlightVisible } from '@src/util/resumeUtils';
import { Tag } from '@src/data/tag';
import { describe, it, expect } from 'vitest';

describe('isHighlightVisible', () => {
  it("should return false if the highlight's visibility is false", () => {
    const mockHighlight = {
      visible: false,
      content: 'A highlight',
      tagNames: ['js', 'css']
    };
    const tags = [new Tag('js', true), new Tag('css', true)];
    expect(isHighlightVisible(mockHighlight, tags)).toBe(false);
  });

  it("should return false if the highlight's tags are not visible", () => {
    const mockHighlight = {
      visible: true,
      content: 'A highlight',
      tagNames: ['js', 'css']
    };
    const tags = [new Tag('js', false), new Tag('css', false)];
    expect(isHighlightVisible(mockHighlight, tags)).toBe(false);
  });

  it("should return true if the highlight and at least one of the highlight's tags are visible", () => {
    const mockHighlight = {
      visible: true,
      content: 'A highlight',
      tagNames: ['js', 'css']
    };
    const tags = [new Tag('js', true), new Tag('css', false)];
    expect(isHighlightVisible(mockHighlight, tags)).toBe(true);
  });

  it('should return true if the highlight is visible and has no tags', () => {
    const mockHighlight = {
      visible: true,
      content: 'A highlight',
      tagNames: []
    };
    const tags = [new Tag('js', true), new Tag('css', true)];
    expect(isHighlightVisible(mockHighlight, tags)).toBe(true);
  });
});
