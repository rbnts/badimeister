<script lang="ts">
  import Card from "$components/card.svelte";
  import type { UiBadi } from "$lib/badis";
  const { name, temperature, open, time, url }: UiBadi = $props();
</script>

<Card>
  <a class="badi" href={url} rel="noopener noreferrer external" target="_blank">
    <h3>{name}</h3>

    {#if open}
      <p class="metric">{temperature}</p>
    {/if}

    <p class="status" class:open>
      <span class="dot" aria-hidden="true"></span>
      {#if time}
        {open ? "Offe" : "Zue"} bis {time}
      {:else}
        {open ? "Offe" : "Zue"}
      {/if}
    </p>
  </a>
</Card>

<style lang="scss">
  .badi {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    height: 100%;
    padding: var(--space-lg);
    color: inherit;
    text-decoration: none;
  }

  h3 {
    font-size: var(--text-lg);
  }

  .status {
    display: inline-flex;
    gap: var(--space-xs);
    align-items: center;
    align-self: flex-start;
    padding: var(--space-2xs) var(--space-sm);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-muted);
    background-color: var(--color-muted-soft);
    border-radius: var(--radius-full);

    &.open {
      color: var(--color-open);
      background-color: var(--color-open-soft);
    }
  }

  .dot {
    width: 0.5em;
    height: 0.5em;
    background-color: currentcolor;
    border-radius: 50%;
  }
</style>
