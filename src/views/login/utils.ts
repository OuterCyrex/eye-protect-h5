import type { LocationQuery } from 'vue-router';
import { WeChatCode } from '@/api';

interface BuildWechatAuthUrlOptions {
  appId: string;
  redirectOrigin?: string;
  routeQuery: LocationQuery;
}

interface WechatCallbackParams {
  code: string;
  phoneCode: string;
}

const WECHAT_AUTH_BASE_URL = 'https://open.weixin.qq.com/connect/oauth2/authorize';

function getQueryStringValue(query: LocationQuery, key: string): string {
  const value = query[key];
  return typeof value === 'string' ? value : '';
}

function buildWechatLoginRedirectUrl(redirectOrigin: string | undefined, routeQuery: LocationQuery): URL {
  const normalizedOrigin = typeof redirectOrigin === 'string' ? redirectOrigin.trim() : '';
  let loginUrl: URL;
  try {
    loginUrl = new URL(normalizedOrigin || window.location.origin);
  } catch (error) {
    console.warn('[wechat-login] Invalid VITE_WECHAT_REDIRECT_ORIGIN, fallback to current origin', error);
    loginUrl = new URL(window.location.origin);
  }

  loginUrl.pathname = '/login';
  loginUrl.hash = '';

  const redirect = getQueryStringValue(routeQuery, 'redirect');
  if (redirect) {
    loginUrl.searchParams.set('redirect', redirect);
  }

  const phoneCode = getQueryStringValue(routeQuery, 'phoneCode');
  if (phoneCode) {
    loginUrl.searchParams.set('phoneCode', phoneCode);
  }

  loginUrl.searchParams.delete('code');
  loginUrl.searchParams.delete('state');
  return loginUrl;
}

export function buildWechatAuthUrl(options: BuildWechatAuthUrlOptions): string {
  const loginUrl = buildWechatLoginRedirectUrl(options.redirectOrigin, options.routeQuery);
  const authUrl = new URL(WECHAT_AUTH_BASE_URL);
  authUrl.searchParams.set('appid', options.appId);
  authUrl.searchParams.set('redirect_uri', loginUrl.toString());
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'snsapi_userinfo');
  authUrl.searchParams.set('state', 'wechat_login');
  return `${authUrl.toString()}#wechat_redirect`;
}

export function getWechatCallbackParams(routeQuery: LocationQuery): WechatCallbackParams {
  return {
    code: getQueryStringValue(routeQuery, 'code'),
    phoneCode: getQueryStringValue(routeQuery, 'phoneCode'),
  };
}

export async function loginByWechatCallback(routeQuery: LocationQuery): Promise<string> {
  const { code, phoneCode } = getWechatCallbackParams(routeQuery);
  if (!code) return '';
  const res = await WeChatCode(code, phoneCode);
  return res.token;
}
