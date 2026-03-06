import { httpAuth } from '@/utils/request';

export function fetchGetReservationList(id: string) {
  return httpAuth.get('/reservation/record', {
    params: { patientId: id },
  });
}

export function fetchGetReservationTime(data: API.Reservation.reservationTimeRequest) {
  return httpAuth.post('/reservation/numbers', data);
}

export function fetchReserve(data: API.Reservation.reserveRequest) {
  return httpAuth.post('/reservation', data);
}

export function fetchGetReservationInfo(id: string) {
  return httpAuth.get(`/reservation/record/${id}`);
}
