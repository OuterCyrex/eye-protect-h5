import { httpAuth } from '@/utils/request';

export function fetchGetCouponList() {
  return httpAuth.get<API.Coupon.couponInfo[]>('/parentGift/claimable');
}

export function fetchGetCouponInfo(voucherId: string | number) {
  return httpAuth.get<API.Coupon.couponInfo>(`/parentGift/${voucherId}`);
}

export function fetchReceiveCoupon(voucherId: string | number) {
  return httpAuth.put(`/parentGift/${voucherId}/claim`);
}

export function fetchGetMyCoupons() {
  return httpAuth.get<API.Coupon.couponInfo[]>('/parentGift/claimed');
}
