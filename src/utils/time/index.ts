/**
 * 根据生日字符串计算年龄（支持 YYYY-MM-DD 格式）
 * @param birthdayStr 生日字符串，格式：2015-03-15
 * @returns 精准年龄（整数），解析失败返回 0
 */
export function calculateAge(birthdayStr: string): number {
  const dateReg = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateReg.test(birthdayStr)) {
    console.error('生日格式错误，需为 YYYY-MM-DD 格式');
    return 0;
  }

  const birthday = new Date(birthdayStr);
  const today = new Date();
  if (isNaN(birthday.getTime())) {
    console.error('无效的生日日期');
    return 0;
  }

  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return Math.max(age, 0);
}
