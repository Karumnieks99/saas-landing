Flat-color initials avatar, plus an overlapping `AvatarStack` for hero social proof.

```jsx
<Avatar initials="MR" color="indigo" size="lg" />
<AvatarStack size="sm" people={[
  { initials: "MR", color: "indigo" },
  { initials: "JT", color: "rose" },
  { initials: "AK", color: "amber" },
  { initials: "SB", color: "emerald" },
]} />
```

Colors cycle through the four fixed avatar hues (indigo / rose / amber / emerald) or any CSS color string.
