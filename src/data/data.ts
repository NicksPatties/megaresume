import { writable } from 'svelte/store';

export class BasicsStore {
  name = writable('');
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

export type Work = {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
};

export class WorkStore {
  name = writable('');
  position = writable('');
  url = writable('');
  startDate = writable('');
  endDate = writable('');
  summary = writable('');
  highlights = writable(['']);

  constructor(
    n: string,
    p: string,
    u: string,
    sd: string,
    ed: string,
    s: string,
    h: Array<string>
  ) {
    this.name.set(n);
    this.position.set(p);
    this.url.set(u);
    this.startDate.set(sd);
    this.endDate.set(ed);
    this.summary.set(s);
    this.highlights.set(h);
  }
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
