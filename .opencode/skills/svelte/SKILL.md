---
name: svelte
description: Instructs the agent to consult official Svelte and SvelteKit documentation before working with these libraries. Use when creating, editing, or generating Svelte components, SvelteKit routes, stores, actions, load functions, or any Svelte/SvelteKit-related topics, or when the user asks about Svelte/SvelteKit concepts.
---

# Svelte Documentation

## Quick start

**Do not rely on your training data for Svelte or SvelteKit APIs, patterns, or conventions.** Your training data may be out of date. Always fetch the relevant documentation from the official docs before writing or modifying any Svelte/SvelteKit code.

## Workflows

### Before editing Svelte components or SvelteKit routes

1. Identify the scope of your task:
   - Quick syntax check or simple pattern → use small docs
   - Typical component/routing task → use medium docs
   - Complex API, migration, or architecture → use full docs

2. Fetch the appropriate documentation:
   - **Small**: `https://svelte.dev/llms-small.txt`
   - **Medium**: `https://svelte.dev/llms-medium.txt`
   - **Full**: `https://svelte.dev/llms-full.txt`

3. Review the relevant sections before proceeding with your changes.

### Package-specific tasks

For focused work on a specific package, use the dedicated docs:
- **Svelte core**: `https://svelte.dev/docs/svelte/llms.txt`
- **SvelteKit**: `https://svelte.dev/docs/kit/llms.txt`
- **Svelte CLI**: `https://svelte.dev/docs/cli/llms.txt`
- **Svelte AI**: `https://svelte.dev/docs/ai/llms.txt`
