<script lang="ts">
  import Badi from "$components/badi.svelte";
  import { type Badi as BadiData, fetchAirTemperature, fetchBernBadis } from "$lib/data";
  import "$styles/base.scss";

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
  <header class="hero">
    <h1>Badimeister</h1>
    <p class="lead">E gäbigi Übersicht für d Badis ir Stadt Bärn.</p>
  </header>

  {#if loading}
    <p class="note">Bi am Chrampfe, gib mer es Momäntli...</p>
  {:else if failed}
    <p class="note">Het leider nid klappet, probiers es angers Mau. Excusez!</p>
  {:else}
    <div class="air card">
      <span class="air-label">Lufttämperatur z Bärn</span>
      <span class="air-value metric">{air ?? "Weiss nid"}</span>
    </div>

    <section class="badis">
      <h2>Badis ds Bärn</h2>
      <ul class="badi-list">
        {#each badis as badi (badi.id)}
          <li class="badi-list-item">
            <Badi {...badi} />
          </li>
        {/each}
      </ul>
    </section>

    {#if updated}
      <p class="footer">
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
  main {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }

  .hero {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }

  .lead,
  .note {
    font-size: var(--text-lg);
    color: var(--color-text-muted);
  }

  .lead {
    max-width: 50ch;
    text-wrap: balance;
  }

  .air {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2xs) var(--space-md);
    align-items: baseline;
    padding: var(--space-md) var(--space-lg);
  }

  .air-label {
    color: var(--color-text-muted);
  }

  .air-value {
    color: var(--color-accent);
  }

  .badis {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  .badi-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
    gap: var(--space-md);
  }

  .badi-list-item {
    transition: translate 0.2s ease-in-out;

    @media (pointer: fine) {
      &:hover {
        translate: 0 -4px;
      }
    }
  }

  .footer {
    line-height: 1.5;
  }
</style>
