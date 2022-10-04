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
