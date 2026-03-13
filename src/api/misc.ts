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
  return httpAuth.post(`/feedback/submit`, data, {
    params: { id: hospitalId },
  });
}
