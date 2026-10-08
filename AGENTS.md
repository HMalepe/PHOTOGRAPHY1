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

## Architecture
- Give each photography category its own route using the shared PhotographyGallery component; each route keeps a continuous scroll experience without duplicating presentation logic.
- Use the reusable gallery scroll hook to update motion CSS variables through requestAnimationFrame, avoiding React renders per scroll event and honoring reduced motion.
- Define gallery presentation and color roles in the global design system and use the gallery Button variant for contact actions.
