import { httpAuth } from '@/utils/request';

export function fetchGetCouponList() {
  return httpAuth.get('/coupon/getVouchers');
}

export function fetchReceiveCoupon(data: { voucherId: string; institutionId: string }) {
  return httpAuth.post('/user/coupon/receive', data);
}

export function fetchGetMyCoupons() {
  return httpAuth.get('/user/coupon/view');
}
