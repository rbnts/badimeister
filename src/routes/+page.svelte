<script lang="ts">
  import "$styles/base.scss";
  import Badi from "$components/badi.svelte";
  import { type Badi as BadiData, fetchAirTemperature, fetchBernBadis } from "$lib/data";

  let air = $state<string | null>(null);
  let badis = $state<BadiData[]>([]);
  let updated = $state<Date | null>(null);
  let loading = $state(true);
  let failed = $state(false);

  const load = async () => {
    try {
      const [airTemperature, bernBadis] = await Promise.all([
        fetchAirTemperature(),
        fetchBernBadis()
      ]);

      air = airTemperature;
      badis = bernBadis;
      updated = new Date();
    } catch {
      failed = true;
    } finally {
      loading = false;
    }
  };

  $effect(() => {
    void load();
  });
</script>

<main>
  <h1>Badimeister</h1>
  <p>E gäbigi Übersicht für d Badis i de Stadt Bärn.</p>

  {#if loading}
    <p>Bi am Chrampfe, gib mer es Momäntli...</p>
  {:else if failed}
    <p>Het leider nid klappet, probiers es angers Mau. Excusez!</p>
  {:else}
    <p>Lufttämperatur z Bärn: {air ?? "Weiss nid"}</p>

    <h2>Badis ds Bärn</h2>
    <ul class="badi-list">
      {#each badis as badi (badi.id)}
        <li class="badi-list-item">
          <Badi {...badi} />
        </li>
      {/each}
    </ul>

    {#if updated}
      <p>
        <small>
          Stang vo {updated.toLocaleString("de-CH")}; Date vo
          <a href="https://opendata.swiss/de/dataset/messwerte-lufttemperatur-2-m-10-min-mittel">MeteoSchweiz</a>
          &amp;
          <a href="https://www.sportamt-bern.ch/sportanlagen/outdoor-anlagen/freibaeder">Sportamt Bärn</a>
        </small>
      </p>
    {/if}
  {/if}
</main>

<style lang="scss">
  .badi-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
    gap: 1rem;
  }

  .badi-list-item {
    contain: content;
    transition:
      opacity 0.2s ease-in-out,
      translate 0.2s ease-in-out;

    @media (pointer: fine) {
      &:hover {
        translate: 0 -4px;
      }

      .badi-list:hover &:not(:hover) {
        opacity: 0.5;
      }
    }
  }
</style>
