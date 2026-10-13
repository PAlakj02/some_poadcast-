<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared podcast navigation and footer in the root shell, and give home, about, and episodes their own content routes so navigation and page metadata stay independent.
- Keep the illustrative episode collection and filtering in a browser-safe shared module; do not present sample episodes as playable recordings until real audio is supplied.
- Define visual roles in the global CSS and use semantic tokens and Button variants so the editorial style stays consistent.
- Pre-optimize shared UI dependencies alongside the template's React entries to avoid late dependency discovery mixing React module generations during preview updates.
