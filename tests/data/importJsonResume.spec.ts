import { BasicsStore, type Education, type Work } from '@src/data/data';
import { beforeAll, describe, expect, it } from 'vitest';
import { type Writable, writable, get } from 'svelte/store';
import importJsonResume from '@src/data/importJsonResume';
import type { JsonResume } from '@src/data/JsonResume';
import type { Tag } from '@src/data/tag';

const testResumeJson: JsonResume = {
  basics: {
    name: 'John Doe',
    label: 'Programmer',
    email: 'john@gmail.com',
    phone: '(912) 555-4321',
    summary: 'A summary of John Doe…',
    location: {
      address: '2712 Broadway St',
      postalCode: 'CA 94115',
      city: 'San Francisco',
      countryCode: 'US',
      region: 'California'
    },
    profiles: [
      {
        network: 'Twitter',
        username: 'john'
      }
    ]
  },
  work: [
    {
      name: 'Company',
      position: 'President',
      startDate: '2013-01-01',
      endDate: '2014-01-01',
      summary: 'Description…',
      highlights: ['Started the company']
    }
  ],
  education: [
    {
      institution: 'University',
      area: 'Software Development',
      studyType: 'Bachelor',
      startDate: '2011-01-01',
      endDate: '2013-01-01',
      score: '4.0',
      courses: ['DB1101 - Basic SQL']
    }
  ],
  skills: [
    {
      name: 'Web Development',
      level: 'Master',
      keywords: ['HTML', 'CSS', 'JavaScript']
    }
  ]
};

describe('Import JSON Resume', () => {
  const mockBasicsStore = new BasicsStore();
  const mockWork: Writable<Work[]> = writable([]);
  const mockEducation: Writable<Education[]> = writable([]);
  const mockSkills: Writable<Tag[]> = writable([]);

  beforeAll(() => {
    importJsonResume(testResumeJson, mockBasicsStore, mockWork, mockEducation, mockSkills);
    console.log('finished importJsonResume');
  });

  it('should assign the contents of the JSON Resume to the correct stores', () => {
    expect(get(mockBasicsStore.name)).toBe('John Doe');
    expect(get(mockBasicsStore.label)).toBe('Programmer');
    expect(get(mockBasicsStore.email)).toBe('john@gmail.com');
    expect(get(mockBasicsStore.phone)).toBe('(912) 555-4321');
    expect(get(mockBasicsStore.location)).toBe('California');
  });

  it('should assign the work contents of the JSON Resume to the correct store', () => {
    const actualWork = get(mockWork);
    expect(actualWork.length).toBe(1);
    for (let i = 0; i < actualWork.length; i++) {
      const w = actualWork[i];
      const rw = testResumeJson.work![i];
      expect(w.visible).toBe(true);
      expect(w.name).toBe(rw.name);
      expect(w.position).toBe(rw.position);
      expect(w.startMonth).toBe('01');
      expect(w.startYear).toBe('2013');
      expect(w.endMonth).toBe('01');
      expect(w.endYear).toBe('2014');
      expect(w.current).toBe(false);
      expect(w.summary).toBe(rw.summary);
    }
  });

  it('should assign the education contents of the JSON resume to the correct store', () => {
    const actualEducation = get(mockEducation);
    expect(actualEducation.length).toBe(1);
    for (let i = 0; i < actualEducation.length; i++) {
      const edu = actualEducation[i];
      const redu = testResumeJson.education![i];
      expect(redu).toBeDefined();
      expect(edu.visible).toBe(true);
      expect(edu.name).toBe(redu.institution);
      expect(edu.degree).toBe(redu.studyType);
      expect(edu.major).toBe(redu.area);
      expect(edu.startYear).toBe('2011');
      expect(edu.startMonth).toBe('01');
      expect(edu.current).toBe(false);
      expect(edu.endYear).toBe('2013');
      expect(edu.endMonth).toBe('01');
    }
  });

  it('should assign the skills in the JSON resume to the tagsStore', () => {
    const isExpectedSkillName = (name: string) =>
      name === 'HTML' || name === 'CSS' || name === 'JavaScript' || name === 'Web Development';
    const actualSkills = get(mockSkills);
    expect(actualSkills.length).toBe(4); // HTML, CSS, JS, and Web Development
    for (let i = 0; i < actualSkills.length; i++) {
      const skill = actualSkills[i];
      expect(skill.visible).toBe(true);
      console.log('skill.name', skill.name);
      console.log(isExpectedSkillName(skill.name));
      expect(isExpectedSkillName(skill.name)).toBe(true);
    }
  });
});
