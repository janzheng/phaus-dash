
<script>   
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import { Input } from "$lib/components/ui/input";
	import * as Select from "$lib/components/ui/select";
	import { Separator } from "$lib/components/ui/separator";
	import { Icons } from "$lib/components/docs/icons";
	import { Label } from "$lib/components/ui/label";

  import { checkmarkEmoji, crossEmoji, getExclusionReasons, getPathogenTargets} from '$lib/redcap-utils'

  export let entry

</script>


<Card.Root class="{entry._meta.isComplete? "border-green-400":"border-orange-400"} border-2">
	<Card.Header>
		<Card.Title>
      RC_ID: {#if entry.scr_id}{entry.scr_id}{:else}<span class="text-sm text-slate-500">N/A</span>{/if}
    </Card.Title>
		<Card.Description>
			{entry._meta.isComplete ? `${checkmarkEmoji} Complete` : `🔸 Open`}
      <p class="{entry._meta.inclusion ? 'text-green-500' : 'text-red-500'}">
        {entry._meta.inclusion ? checkmarkEmoji : crossEmoji} Meets Inclusion: {entry.scr_meets_inclusion || 'N/A'}
      </p>
		</Card.Description>
	</Card.Header>
	<Card.Content>
    <p>Date: {#if entry.scr_date}{entry.scr_date}{:else}<span class="text-sm text-slate-500">N/A</span>{/if}</p>
    <p>Patient Initials: {#if entry.scr_patient_initials}{entry.scr_patient_initials}{:else}<span class="text-sm text-slate-500">N/A</span>{/if}</p>
    <p>Ref ID: {#if entry.scr_refid}{entry.scr_refid}{:else}<span class="text-sm text-slate-500">N/A</span>{/if}</p>
    <p>PICF Signed Date: {#if entry.scr_picf_signed_date}{entry.scr_picf_signed_date}{:else}<span class="text-sm text-slate-500">N/A</span>{/if}</p>
    <p>Recruitment Site: {#if entry.scr_recruitment_site}{entry.scr_recruitment_site}{:else}<span class="text-sm text-slate-500">N/A</span>{/if}</p>


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
	</Card.Content>
</Card.Root>

