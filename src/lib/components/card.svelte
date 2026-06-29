<script lang="ts">
  import type { Snippet } from "svelte";

  const { children }: { children: Snippet } = $props();
</script>

<div class="card">
  {@render children()}
</div>

<style lang="scss">
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 10px 30px color-mix(in srgb, var(--color-text), transparent 90%);
}
</style>
