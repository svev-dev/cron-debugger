<script lang="ts">
    import Card from './Card.svelte';
    import { getHumanReadableString } from './cron-utils';
    import GraduationIcon from './icons/GraduationIcon.svelte';

    interface Props {
        expression: string;
    }
    let { expression = $bindable() }: Props = $props();
    let humanReadableString = $derived(getHumanReadableString(expression));
</script>

<Card title="Human-Readable Explanation" Icon={GraduationIcon}>
    <div class="body">
        <p class="text">
            {#if humanReadableString}
                "{humanReadableString}"
            {:else}
                "Invalid cron expression"
            {/if}
        </p>
    </div>
</Card>

<style>
    .body {
        padding: 1rem;
        background-color: #eff6ff;
        border-width: 1px;
        border-style: solid;
        border-color: #dbeafe;
        border-radius: 0.5rem;
    }

    .text {
        color: #1e40af;
        font-size: 1.125rem;
        font-weight: 500;
        text-align: center;
    }
</style>
