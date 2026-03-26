# money-in-mifo

Monorepo for related salary / money-in projects.

## Projects

| Folder | Description |
|--------|-------------|
| `bring-global-salary/` | Expo app — see `bring-global-salary/README.md` |

## How `bring-global-salary` was added

It was merged with **`git subtree`**, so **all past commits** from the old repo are still in this repo’s history. The standalone repo [bring-global-salary](https://github.com/mich-sastre/bring-global-salary) is unchanged; you can archive it on GitHub when you are sure you only work from this monorepo.

**If you still use the old repo for a while** and want to pull those changes in:

```bash
git subtree pull --prefix=bring-global-salary bring-global-salary main
```

(Requires remote `bring-global-salary` or use the full HTTPS URL instead of the name.)

**Day-to-day work:** open a terminal in `bring-global-salary/`, run `npm install` if needed, then `npx expo start` as usual.
