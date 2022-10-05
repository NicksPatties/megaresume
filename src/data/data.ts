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

class BasicInformation {
  name = '';
  title = '';
  contact = '';
  location = '';
}

class Experience {
  company = '';
  title = '';
  startDate = '';
  endDate = '';
  highlights = [];
}

class Education {
  degree = '';
  institution = '';
  startDate = '';
  endDate = '';
  highlights = [];
}

export class RealResumeData {
  fromJSON(resume: string) {
    const resumeData = JSON.parse(resume);
    this.basicInformation = resumeData['basic_information'];
    this.experience = resumeData['experience'];
    this.education = resumeData['education'];
  }

  basicInformation: BasicInformation = new BasicInformation();
  experience: [Experience] = [new Experience()];
  education: [Education] = [new Education()];
}

export const resumeJSONToData = (resumeJSON: string): RealResumeData => {
  const data = new RealResumeData();
  data.fromJSON(resumeJSON);
  return data;
};
