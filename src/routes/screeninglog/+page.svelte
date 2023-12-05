<script>
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  import ScreeningItem from '$lib/components/ScreeningItem.svelte'
  import ScreeningItem2 from '$lib/components/ScreeningItem2.svelte'
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  export let data;
  export let search = '';
  export let mode = null;

  let inclusionState = 'all'; // 'all', 'meets', 'doesNotMeet'
  let inclusionMessage = 'Inclusion: Show All';

  let statusState = 'all'; // 'all', 'open', 'completed'
  let statusMessage = 'Status: Open & Completed';

  let filteredScreeningLog = [];

  function applyFilters() {
    filteredScreeningLog = data.screeningLog.filter(entry => {
      let meetsSearchCriteria = !search || JSON.stringify(entry._meta).toLowerCase().includes(search.toLowerCase());
      let meetsInclusionCriteria = inclusionState === 'all' || (inclusionState === 'meets' && entry._meta.inclusion) || (inclusionState === 'doesNotMeet' && !entry._meta.inclusion);
      let meetsStatusCriteria = statusState === 'all' || (statusState === 'open' && !entry._meta.isComplete) || (statusState === 'completed' && entry._meta.isComplete);
      return meetsSearchCriteria && meetsInclusionCriteria && meetsStatusCriteria;
    });
    console.log('filteredScreeningLog:', filteredScreeningLog)
  }
  console.log('screeningLog:', data.screeningLog)

  function toggleInclusion() {
    if (inclusionState === 'all') {
      inclusionState = 'meets';
      inclusionMessage = 'Inclusion: Meets';
    } else if (inclusionState === 'meets') {
      inclusionState = 'doesNotMeet';
      inclusionMessage = 'Inclusion: Does Not Meet';
    } else {
      inclusionState = 'all';
      inclusionMessage = 'Inclusion: Show All';
    }
    applyFilters();
  }

  function toggleStatus() {
    if (statusState === 'all') {
      statusState = 'open';
      statusMessage = 'Status: Open';
    } else if (statusState === 'open') {
      statusState = 'completed';
      statusMessage = 'Status: Completed';
    } else {
      statusState = 'all';
      statusMessage = 'Status: Open & Completed';
    }
    applyFilters();
  }

  onMount(applyFilters);
</script>

<style>
    /* You can still write custom styles if needed */
</style>

<div class="container mx-auto p-4 | ">
  <div class="controls w-full | my-4">
    <form class="flex w-full  items-center space-x-2">
      <Input class="max-w-xs" type="Type to search" placeholder="search" bind:value={search} on:input={applyFilters} />
      <Button class="hover:border-slate-900 border-2 border-solid" variant="secondary" on:click={toggleStatus}>{statusMessage}</Button>
      <Button class="hover:border-slate-900 border-2 border-solid" variant="secondary" on:click={toggleInclusion}>{inclusionMessage}</Button>
    </form>
  </div>

  <div class="items | grid grid-cols-3 gap-2">
    {#each filteredScreeningLog as entry}
      <ScreeningItem2 {entry} />
    {/each}
  </div>
</div>