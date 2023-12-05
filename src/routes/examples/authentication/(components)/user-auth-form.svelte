<script lang="ts">
	import { Icons } from "$lib/components/docs";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import { cn } from "$lib/utils";

  // import sheet from '@yawnxyz/sheetlog';
  import { Sheet } from './sheetlog.js';
  
  let sheet = new Sheet();
  sheet.setup({
    sheetUrl: "https://script.google.com/macros/s/AKfycbw7-5swcIk3fLMupsmI4LcBjZxaoWMrNMyZ2fcUOS1vCsie9nUeGK5iytiT_VJJaV2n5w/exec",
  })


	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;
	async function onSubmit(event) {
    console.log('submit!')
		isLoading = true;
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    console.log('email:', email)
    await sheet.log({email});
    isLoading = false;

	}
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
	<form on:submit|preventDefault={onSubmit}>
		<div class="grid gap-2">
			<div class="grid gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<Input
					id="email"
          name="email"
					placeholder="name@example.com"
					type="email"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					disabled={isLoading}
				/>
			</div>
			<Button disabled={isLoading} type="submit">
				{#if isLoading}
					<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign In with Email
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground">
				Or continue with
			</span>
		</div>
	</div>
	<Button variant="outline" type="button" disabled={isLoading}>
		{#if isLoading}
			<Icons.spinner class="mr-2 h-4 w-4 animate-spin" />
		{:else}
			<Icons.gitHub class="mr-2 h-4 w-4" />
		{/if}
		{" "}
		Github
	</Button>
</div>
