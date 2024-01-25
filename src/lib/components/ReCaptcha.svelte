<script lang="ts">
  import { onMount } from 'svelte';

  const recaptchaSiteKey = import.meta.env.RECAPTCHA_SITE_KEY;
  onMount(() => {
    document.body.classList.add('grecaptcha');
    return () => {
      document.body.classList.remove('grecaptcha');
    };
  });

  export function requestCaptchaToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      grecaptcha.ready(function () {
        // eslint-disable-next-line no-undef
        grecaptcha.execute(recaptchaSiteKey, { action: 'submit' }).then(
          (token: any) => resolve(token),
          (error: any) => reject(error),
        );
      });
    });
  }
</script>

<svelte:head>
  <script
    src="https://www.google.com/recaptcha/api.js?render={recaptchaSiteKey}"
    async
    defer
  ></script>
</svelte:head>

<!-- <style lang="postcss">
  :global(.grecaptcha-badge) {
    visibility: hidden;
  }
  :global(body.grecaptcha .grecaptcha-badge) {
    visibility: inherit;
  }
</style> -->
