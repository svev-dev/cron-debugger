<script lang="ts">
    import Card from './Card.svelte';
    import { getNextNSchedules } from './cron-utils';
    import CalendarIcon from './icons/CalendarIcon.svelte';

    const MONTHS = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];

    function formatDate(date: Date): string {
        const day = String(date.getDate()).padStart(2, '0');
        const month = MONTHS[date.getMonth()];
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${day} ${month} ${year}, ${hour}:${minute}`;
    }

    interface Props {
        expression: string;
    }
    let { expression = $bindable() }: Props = $props();

    let schedules = $derived(getNextNSchedules(expression, 5).map(formatDate));
</script>

{#snippet invalidCron()}
    <div class="card-empty">
        <p>No valid schedule could be generated.</p>
        <p class="card-empty-hint">Check your cron expression syntax.</p>
    </div>
{/snippet}

<Card title="Upcoming Schedule" Icon={CalendarIcon}>
    {#if schedules.length > 0}
        <div class="card-table-wrapper">
            <table class="card-table">
                <thead>
                    <tr class="card-table-header-row">
                        <th class="card-table-header"> # </th>
                        <th class="card-table-header">Date & Time</th>
                    </tr>
                </thead>
                <tbody>
                    {#each schedules as schedule, idx (schedule)}
                        <tr class="card-table-row">
                            <td class="card-table-index">{idx + 1}.</td>
                            <td class="card-table-value">{schedule}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {:else}
        {@render invalidCron()}
    {/if}
</Card>

<style>
    .card-empty {
        border-radius: 0.5rem;
        background-color: #f8fafc;
        padding: 2rem;
        text-align: center;
        color: #64748b;
    }
    .card-empty-hint {
        margin-top: 0.25rem;
        font-size: 0.875rem;
    }
    .card-table-wrapper {
        overflow: hidden;
        border-radius: 0.5rem;
        border: 1px solid #e2e8f0;
    }
    .card-table {
        width: 100%;
        border-collapse: collapse;
    }
    .card-table-header-row {
        background-color: #f8fafc;
    }
    .card-table-header {
        border-bottom: 1px solid #e2e8f0;
        padding: 0.75rem 1rem;
        text-align: left;
        font-size: 0.875rem;
        font-weight: 500;
        color: #475569;
    }
    .card-table-row {
        border-bottom: 1px solid #e2e8f0;
        transition: background 0.2s;
    }
    .card-table-row:last-child {
        border-bottom: none;
    }
    .card-table-row:hover {
        background-color: #f8fafc;
    }
    .card-table-index {
        padding: 0.75rem 1rem;
        color: #64748b;
    }
    .card-table-value {
        padding: 0.75rem 1rem;
        font-family: monospace;
        color: #334155;
    }
</style>
