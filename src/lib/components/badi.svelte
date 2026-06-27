<script lang="ts">
  import type { Badi } from "$lib/data";
  const { name, temperature, open, url }: Badi = $props();
</script>

<article class="badi card">
  <h3>{name}</h3>

  {#if open}
    <p class="metric">{temperature}</p>
  {/if}

  <p class="status" class:open>
    <span class="dot" aria-hidden="true"></span>
    {open ? "Offe" : "Zue"}
  </p>

  <small class="details">
    <a href={url} rel="noopener noreferrer external" target="_blank">Meh Details &rarr;</a>
  </small>
</article>

<style lang="scss">
  .badi {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    height: 100%;
    padding: var(--space-lg);
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

  .details {
    padding-top: var(--space-sm);
    margin-top: auto;
  }
</style>
