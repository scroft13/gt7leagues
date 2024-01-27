import { redirect } from '@sveltejs/kit';

export const ssr = async (event: any) => {
  const {
    url,
    locals: { supabase },
  } = event;
  const token_hash = url.searchParams.get('token_hash') as string;
  const type = url.searchParams.get('type') as string;
  const next = url.searchParams.get('next') ?? '/';
  console.log('Hash: ', token_hash, 'Event: ', event, 'Type: ', type, 'Next: ', next);

  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      throw redirect(303, `/${next.slice(1)}`);
    }
  }

  // return the user to an error page with some instructions
  throw redirect(303, '/auth/auth-code-error');
};
