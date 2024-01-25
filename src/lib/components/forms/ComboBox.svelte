<script lang="ts">
  import { XIcon } from '@rgossiaux/svelte-heroicons/outline';
  import { getFormContext, pick } from '../../utils';
  import { tick } from 'svelte';
  export let options: string[];
  export let name: string;
  let open = false;
  let comboInput: HTMLInputElement;
  let list: HTMLUListElement;
  let selected = -1;
  let previousLength = options?.length;
  export let dependsOn: string[] | undefined = undefined;
  export let placeholder: string;
  export let short: boolean;
  export let disabled: boolean;
  const { form, errors, updateValidateField, validateField } = getFormContext();

  let lastDependsOnValue: unknown;
  let filtered: string[];

  $: if (dependsOn && pick($form ?? {}, ...dependsOn) !== lastDependsOnValue) {
    validateField(name);
    lastDependsOnValue = pick($form ?? {}, ...dependsOn);
  }
  $: if (value) {
    filtered = options.filter((d) => d.toLowerCase().includes(value.toLowerCase()));
  } else {
    filtered = options;
  }

  $: {
    if (previousLength !== filtered?.length) {
      selected = -1;
    }
  }

  $: {
    if (!open && selected !== -1) {
      selected = -1;
    }
  }

  let value: string;

  async function handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        open = false;
        break;
      case 'Enter':
        e.preventDefault();
        updateValidateField(name, filtered[selected]);
        open = false;
        comboInput.focus();
        break;
      case 'ArrowUp':
        open = true;
        if (selected !== -1) {
          selected = (selected - 1) % filtered.length;
        } else {
          selected = filtered.length - 1;
        }
        await tick();
        if (list) {
          const active = list.querySelector(`#${name}-option-${selected}`) as HTMLLIElement;
          if (active) {
            if (selected === filtered.length - 1) {
              list.scrollTop = active.offsetTop;
              return;
            }
            if (active.offsetTop < list.scrollTop) {
              active.scrollIntoView();
            }
          }
        }

        break;
      case 'ArrowDown':
        open = true;
        if (selected !== -1) {
          selected = (selected + 1) % filtered.length;
        } else {
          selected = 0;
        }
        await tick();
        if (list) {
          const active = list.querySelector(`#${name}-option-${selected}`) as HTMLLIElement;
          if (active) {
            if (selected === 0) {
              list.scrollTop = 0;
              return;
            }
            if (active.offsetTop + active.clientHeight > list.scrollTop + list.offsetHeight) {
              active.scrollIntoView();
            }
          }
        }

        break;
      case 'Tab':
        updateValidateField(name, comboInput.value);
        break;

      default:
        open = true;
    }
  }
</script>

<div class={short ? 'relative w-52' : 'relative w-full'} {...$$props}>
  <div
    role="combobox"
    aria-controls="combobox"
    aria-expanded={open}
    aria-owns="listbox-1"
    aria-haspopup="listbox"
  >
    <input
      {placeholder}
      id={name}
      value={$form[name]}
      aria-autocomplete="list"
      aria-controls="listbox-1"
      aria-activedescendant={selected !== -1 ? `name-${selected}` : null}
      autocomplete={name}
      bind:this={comboInput}
      on:click={() => (open = true)}
      on:keydown={handleKeyDown}
      on:keyup={() => (value = comboInput.value)}
      on:change={() => (value = comboInput.value)}
      type="text"
      on:focus={() => (value = comboInput.value)}
      on:blur={() => {
        open = false;
      }}
      class="rounded standard-border mt-1 w-full"
      class:invalid={$errors[name]}
      {...$$props}
      {disabled}
    />
    {#if value}
      <button
        tabindex="-1"
        class="w-5 h-5 absolute top-[22px] right-3 text-primary"
        on:click|preventDefault={() => {
          updateValidateField(name, '');
          comboInput.focus();
          value = '';
        }}
      >
        <XIcon />
      </button>
    {/if}

    <div>
      {#if open}
        <ul
          bind:this={list}
          id="listbox-1"
          role="listbox"
          tabindex={-1}
          class="absolute popover-background standard-border w-full rounded max-h-80 overflow-y-auto list-none z-50"
        >
          {#each filtered as listItem, i (listItem)}
            <li
              id="{name}-option-{i}"
              role="option"
              aria-setsize={filtered.length}
              aria-posinset={i + 1}
              aria-selected={selected === i}
              class:selected={selected === i}
              class="py-1 px-2 hover:bg-gray-300 aria-selected:bg-gray-300"
              on:mousedown|preventDefault={() => {
                value = listItem;
                updateValidateField(name, listItem);
                comboInput.focus();
                setTimeout(() => {
                  open = false;
                }, 0);
              }}
            >
              {listItem}
            </li>
          {:else}
            <li class="py-1 px-2">Nothing matched</li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>
