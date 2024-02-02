import { supabase } from '$lib/db.js';
import type { EmailOtpType } from '@supabase/supabase-js';

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  const fetchUrl = url.searchParams.get('confirmation_url') as string;
  const token_hash = extractTokenFromURL(fetchUrl);
  const type = extractTypeFromURL(fetchUrl) as EmailOtpType;
  const email = url.searchParams.get('email') as string;

  if (token_hash && type && email) {
    await supabase.auth
      .verifyOtp({ token_hash, type })
      .catch(() => {
        return { emailConfirmed: false };
      })
      .then(() => {
        return { emailConfirmed: true };
      });
  }

  function extractTokenFromURL(url: string) {
    const queryString = url.split('?')[1];
    if (queryString) {
      const queryParams = queryString.split('&');
      const tokenParam = queryParams.find((param) => param.startsWith('token='));
      if (tokenParam) {
        const token = tokenParam.split('=')[1];
        return token;
      }
    }
    return null;
  }

  function extractTypeFromURL(url: string) {
    const queryString = url.split('?')[1];
    if (queryString) {
      const queryParams = queryString.split('&');
      const typeParams = queryParams.find((param) => param.startsWith('type='));
      if (typeParams) {
        const token = typeParams.split('=')[1];
        return token;
      }
    }
    return null;
  }
}
