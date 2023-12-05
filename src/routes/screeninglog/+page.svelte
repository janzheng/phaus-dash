<script>
  
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';
  // import { checkmarkEmoji, crossEmoji, getExclusionReasons, getPathogenTargets} from '$lib/redcap-utils'
  import ScreeningItem from '$lib/components/ScreeningItem.svelte'
  export let data

  if(browser) {
    console.log('Screening Data:', data)
  }

</script>

<style>
    /* You can still write custom styles if needed */
</style>


<div class="container mx-auto p-4 | grid grid-cols-4 gap-4">
  {#each data.screeningLog as entry}
    <ScreeningItem {entry} />
  {/each}
</div>

