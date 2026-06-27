<script lang="ts">
  import type { Badi } from "$lib/data";
  const { name, temperature, open, url }: Badi = $props();
</script>

<article class="badi">
  <h3>{name}</h3>
  <p>
    <span>Wie warm? {temperature}</span>
    <span>Isch offe? {open ? "Iu 😎" : "Nei 😔"}</span>
  </p>
  <small>
    <a href={url} rel="noopener noreferrer external" target="_blank">Meh Details &rarr;</a>
  </small>
</article>

<style lang="scss">
  .badi {
    overflow: clip;
    border: 1px solid #222;
    border-radius: 8px;
  }

  h3 {
    padding: 1rem;
    background-color: #111;
    border-bottom: 1px solid #222;
  }

  p {
    padding: 1rem;

    > span {
      display: block;
    }
  }

  small {
    display: block;
    padding: 1rem;
    line-height: 1.1;
    background-color: #111;
  }
</style>
