export class Basics {
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

export class ResumeData {
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

export const resumeJSONToData = (resumeJSON: string): ResumeData => {
  const data = new ResumeData();
  data.fromJSON(resumeJSON);
  return data;
};
