import { httpAuth } from '@/utils/request';

export function fetchGetAxiosChart(patientId: string) {
  return httpAuth.get(`/growth-record/axial-length-chart/${patientId}`);
}

export function fetchUploadPicture(files: Array<File>) {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('images', files[i] as File);
  }
  return httpAuth.post(`/feedback/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function fetchSubmitFeedback(hospitalId: string, data: API.Misc.feedbackRequest) {
  return httpAuth.post(`/feedback/submit/hospital`, data, {
    params: { id: hospitalId },
  });
}

export function fetchGetArticleList(data: API.Misc.GetArticleListRequest) {
  return httpAuth.post(`api/news/articles/page`, data);
}

export function fetchGetExpertList(data: API.Misc.GetExpertListRequest) {
  return httpAuth.post('/expert/page', data);
}

export function fetchGetExpertInfo(expertId: string) {
  return httpAuth.get(`/expert/${expertId}`);
}

export function fetchGetProvinceList() {
  return httpAuth.get('/api/region/provinces');
}

export function fetchGetCityList(provinceCode: string) {
  return httpAuth.get(`/api/region/cities`, {
    params: {
      provinceCode: provinceCode,
    },
  });
}
