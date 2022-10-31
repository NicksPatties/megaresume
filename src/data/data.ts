import { writable } from 'svelte/store';

export class BasicsStore {
  name = writable('The first name');
  label = writable('');
  image = writable('');
  phone = writable('');
  email = writable('');
  summary = writable('');

  constructor(n: string, l: string, i: string, p: string, e: string, s: string) {
    this.name.set(n);
    this.label.set(l);
    this.image.set(i);
    this.phone.set(p);
    this.email.set(e);
    this.summary.set(s);
  }
}

class Work {
  name = '';
  position = '';
  url = '';
  startDate = '';
  endDate = '';
  summary = '';
  highlights = [];
}

class Education {
  studyType = '';
  institution = '';
  area = '';
  url = '';
  startDate = '';
  endDate = '';
  score = '';
  courses = [];
}

export class ResumeData {
  fromJSON(resume: string) {
    const resumeData = JSON.parse(resume);
    this.basics = resumeData['basics'];
    this.work = resumeData['work'];
    this.education = resumeData['education'];
  }

  basics: Basics = blankBasics();
  work: [Work] = [new Work()];
  education: [Education] = [new Education()];
}

export const resumeJSONToData = (resumeJSON: string): ResumeData => {
  const data = new ResumeData();
  data.fromJSON(resumeJSON);
  return data;
};
