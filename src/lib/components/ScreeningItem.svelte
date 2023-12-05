
<script>   

  import { checkmarkEmoji, crossEmoji, getExclusionReasons, getPathogenTargets} from '$lib/redcap-utils'

  export let entry

</script>

<div class="entry bg-pastel-blue-100 rounded-lg shadow-md p-6 mb-4 relative">
  <div class="absolute top-2 right-2 text-xl">
    {entry.screening_log_complete === 'Complete' ? checkmarkEmoji : crossEmoji}
  </div>
  <p class="text-lg font-semibold text-gray-700">ID: {entry.scr_id || 'N/A'}</p>
  <p class="text-gray-600">Date: {entry.scr_date || 'N/A'}</p>
  <p class="text-gray-600">Patient Initials: {entry.scr_patient_initials || 'N/A'}</p>
  <p class="text-gray-600">Ref ID: {entry.scr_refid || 'N/A'}</p>
  <p class="text-gray-600">PICF Signed Date: {entry.scr_picf_signed_date || 'N/A'}</p>
  <p class="text-gray-600">Recruitment Site: {entry.scr_recruitment_site || 'N/A'}</p>
  <p class="{entry.scr_meets_inclusion === 'Yes' ? 'text-green-500' : 'text-red-500'}">
    {entry.scr_meets_inclusion === 'Yes' ? checkmarkEmoji : crossEmoji} Meets Inclusion: {entry.scr_meets_inclusion || 'N/A'}
  </p>

  <!-- Exclusion Reasons -->
  <div>
    {#if getExclusionReasons(entry).length > 0}
      <p class="font-semibold text-gray-700">Exclusion Reasons:</p>
      <ul class="list-disc pl-5 text-gray-600">
        {#each getExclusionReasons(entry) as reason}
          <li>{reason}</li>
        {/each}
      </ul>
    {:else}
      <p>No specific exclusion reasons.</p>
    {/if}
  </div>

  <!-- Pathogen Targets -->
  <div>
    {#if getPathogenTargets(entry).length > 0}
      <p class="font-semibold text-gray-700">Pathogen Targets:</p>
      <ul class="list-disc pl-5 text-gray-600">
        {#each getPathogenTargets(entry) as target}
          <li>{target}</li>
        {/each}
      </ul>
    {:else}
      <p>No pathogen targets specified.</p>
    {/if}
  </div>
</div>