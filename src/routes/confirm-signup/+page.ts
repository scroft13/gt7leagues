import { supabase } from '$lib/db.js';
import type { EmailOtpType } from '@supabase/supabase-js';
// import { redirect } from '@sveltejs/kit';

console.log('now');

/** @type {import('./$types').PageLoad} */
export async function load({ url }) {
  const fetchUrl = url.searchParams.get('confirmation_url') as string;

  //   const next = url.searchParams.get('next') ?? '/';
  const token = extractTokenFromURL(fetchUrl);
  const type = extractTypeFromURL(fetchUrl) as EmailOtpType;
  const email = url.searchParams.get('email') as string;

  if (token && type && email) {
    const { error } = await supabase.auth.verifyOtp({ token, type, email });
    if (!error) {
      console.log('You lucky bastard!');
    }
  }

  // Function to extract the value of the 'token' parameter from the URL
  function extractTokenFromURL(url: string) {
    // Extract the query string part of the URL
    const queryString = url.split('?')[1];

    if (queryString) {
      // Split the query string into individual key-value pairs
      const queryParams = queryString.split('&');

      // Find the key-value pair where the key is 'token'
      const tokenParam = queryParams.find((param) => param.startsWith('token='));

      if (tokenParam) {
        // Extract the value of 'token' from the key-value pair
        const token = tokenParam.split('=')[1];
        return token;
      }
    }

    // Return null if 'token' parameter is not found
    return null;
  }

  function extractTypeFromURL(url: string) {
    // Extract the query string part of the URL
    const queryString = url.split('?')[1];

    if (queryString) {
      // Split the query string into individual key-value pairs
      const queryParams = queryString.split('&');

      // Find the key-value pair where the key is 'token'
      const typeParams = queryParams.find((param) => param.startsWith('type='));

      if (typeParams) {
        // Extract the value of 'token' from the key-value pair
        const token = typeParams.split('=')[1];
        return token;
      }
    }

    // Return null if 'token' parameter is not found
    return null;
  }
}
