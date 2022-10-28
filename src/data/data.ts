export class ResumeData {
  name = '';
}

export const getResumeData = (): ResumeData => {
  const str = window.localStorage['resume'];
  return str ? JSON.parse(str) : { name: '' };
};

export const putResumeData = (data: ResumeData) => {
  window.localStorage['resume'] = JSON.stringify(data);
};

let currTimeout: NodeJS.Timeout;
export const update = (name: string) => {
  const delayMillis = 300;
  if (currTimeout) {
    clearTimeout(currTimeout);
  }
  currTimeout = setTimeout(() => {
    const newData: ResumeData = { name: name };
    putResumeData(newData);
  }, delayMillis);
};

class Basics {
  name = '';
  label = '';
  image = '';
  phone = '';
  email = '';
  summary = '';
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

export class RealResumeData {
  fromJSON(resume: string) {
    const resumeData = JSON.parse(resume);
    this.basics = resumeData['basics'];
    this.work = resumeData['work'];
    this.education = resumeData['education'];
  }

  basics: Basics = new Basics();
  work: [Work] = [new Work()];
  education: [Education] = [new Education()];
}

export const resumeJSONToData = (resumeJSON: string): RealResumeData => {
  const data = new RealResumeData();
  data.fromJSON(resumeJSON);
  return data;
};
