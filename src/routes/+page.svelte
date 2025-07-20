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
        <h1>Cron Debugger</h1>
        <p class="byline">by <ExternalLink href="https://svev.dev" text="svev.dev" trusted /></p>
        <p>Visualize and understand your cron schedules</p>
    </header>

    <main>
        <CronInput bind:expression />
        <HumanReadable {expression} />
        <Schedules {expression} />
    </main>

    <footer class="footer">
        <p>Use this tool to debug and visualize cron expressions for your scheduled tasks</p>
        <div>
            <p class="footer-links">
                Created by
                <ExternalLink href="https://svev.dev" text="svev.dev" trusted />
            </p>
            <p class="footer-links">
                Uicons by <ExternalLink
                    href="https://www.flaticon.com/uicons"
                    text="Flaticon"
                    trusted={false}
                />
            </p>
        </div>
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

    .footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 1rem;
        text-align: center;
        font-size: 0.95rem;
        color: #64748b; /* slate-500 */

        div {
            display: flex;
            gap: 15px;
        }
    }
    .footer-links {
        margin-top: 0.5rem;
    }

    .byline {
        font-size: 1rem;
        color: #64748b; /* slate-500 */
        margin: 0 0 0.25rem 0;
        text-align: center;
    }

    @media (max-width: 700px) {
        .container {
            gap: 24px;
        }
    }
</style>
