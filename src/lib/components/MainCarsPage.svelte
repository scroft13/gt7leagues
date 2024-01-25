<script lang="ts">
  import CarCard from '$lib/components/CarCard.svelte';
  import type { UserCar } from '$lib/shared';
  import type { User } from '@supabase/supabase-js';
  import { createEventDispatcher } from 'svelte';
  export let carList: UserCar[];
  export let user: User;
  const dispatch = createEventDispatcher();
  function logout() {
    dispatch('close');
  }
</script>

<p>Hello {user.email}</p>
<a href="/gt7/userCars">Your Cars</a>
<div class="flex flex-wrap gap-3 justify-evenly">
  {#each carList as car}
    <CarCard make={car.make} model={car.model} price={car.price} id={car.id} />
  {/each}
</div>
<div>
  <button on:click={() => logout()}>Log Out</button>
</div>
