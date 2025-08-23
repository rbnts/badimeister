<script lang="ts">
  import favicon from "$img/favicon.avif";
  import "$styles/base.scss";
  import type { LayoutProps } from "./$types";
  const { children }: LayoutProps = $props();
</script>

<svelte:head>
  <meta name="description" content="E gäbigi Übersicht für d Badis i de Stedt Bärn u Züri." />
  <meta name="keywords" content="badi, bern, zürich, freibad" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href={favicon} rel="icon" type="image/avif" />
</svelte:head>

{@render children()}
