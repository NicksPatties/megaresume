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

export type Education = {
  studyType: string;
  institution: string;
  area: string;
  url: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
};

export class EducationStore {
  studyType = writable('');
  institution = writable('');
  area = writable('');
  url = writable('');
  startDate = writable('');
  endDate = writable('');
  score = writable('');
  courses = writable(['']);

  constructor(
    st: string,
    i: string,
    a: string,
    u: string,
    sd: string,
    ed: string,
    s: string,
    c: Array<string>
  ) {
    this.studyType.set(st);
    this.institution.set(i);
    this.area.set(a);
    this.url.set(u);
    this.startDate.set(sd);
    this.endDate.set(ed);
    this.score.set(s);
    this.courses.set(c);
  }
}
