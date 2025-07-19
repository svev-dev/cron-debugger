<script lang="ts">
    import { CronInput, HumanReadable, Schedules, ExternalLink } from '$lib';
    import { replaceState } from '$app/navigation';
    import { onMount, tick } from 'svelte';
    let expression = $state('* * * * *');
    let mounted = $state(false);

    onMount(async () => {
        const params = new URLSearchParams(window.location.search);
        const exp = params.get('exp');
        if (exp) expression = exp;
        await tick(); // Wait for router to be ready
        mounted = true;
    });

    $effect(() => {
        if (!mounted) return; // Only run after mount
        const newUrl = `${window.location.pathname}?exp=${encodeURIComponent(expression)}`;
        replaceState(newUrl, {});
    });
</script>

<div class="container">
    <header class="header">
        <div class="external-links">
            <ExternalLink href="https://svev.dev" text="svev.dev" trusted />
            <ExternalLink href="https://monitor.svev.dev" text="CronMonitor" trusted />
        </div>
        <h1>Cron Debugger</h1>
        <p>Visualize and understand your cron schedules</p>
        <div class="info-box">
            <p class="info-text">
                Need to monitor your cron jobs in production? Check out
                <ExternalLink href="https://monitor.svev.dev" text="CronMonitor" trusted />
                - our cron job monitoring tool!
            </p>
        </div>
    </header>

    <main>
        <CronInput bind:expression />
        <HumanReadable {expression} />
        <Schedules {expression} />
    </main>

    <footer class="footer">
        <p>Use this tool to debug and visualize cron expressions for your scheduled tasks</p>
        <p class="footer-links">
            Created by
            <ExternalLink href="https://svev.dev" text="svev.dev" trusted />
            |
            <ExternalLink href="https://monitor.svev.dev" text="Monitor your cron jobs" trusted />
        </p>
        <p class="footer-links">
            Uicons by <ExternalLink
                href="https://www.flaticon.com/uicons"
                text="Flaticon"
                trusted={false}
            />
        </p>
    </footer>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        max-width: 900px;
        margin: 2rem auto;
    }

    .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
    }
    .header h1 {
        margin: 0;
        text-align: center;
    }
    .header p {
        text-align: center;
        margin: 5px 0;
    }

    .external-links {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        gap: 1rem;
        width: 100%;
    }

    .info-box {
        margin-top: 0.5rem;
        padding: 1rem;
        background-color: #eff6ff; /* blue-50 */
        border-radius: 0.5rem;
        border: 1px solid #dbeafe; /* blue-100 */
        font-size: 0.8rem;
    }

    .info-text {
        color: #1e40af; /* blue-800 */
        margin: 0;
    }

    .footer {
        margin-top: 1rem;
        text-align: center;
        font-size: 0.95rem;
        color: #64748b; /* slate-500 */
    }
    .footer-links {
        margin-top: 0.5rem;
    }

    @media (max-width: 700px) {
        .container {
            gap: 24px;
        }
    }
</style>
