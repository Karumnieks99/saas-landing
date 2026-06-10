Rounded surface container. Light panel by default; `dark` and `feature` variants for the zinc-950 Features section.

```jsx
<Card>
  <Badge variant="eyebrow">Track</Badge>
  <h3>Scope log that never lies</h3>
  <p>Every request is timestamped and tied to a job code.</p>
</Card>

<Card variant="feature">…white-on-dark tile…</Card>
```

Hover lifts the light card with a soft shadow and darker border; dark/feature brighten instead. Set `hover={false}` to disable.
