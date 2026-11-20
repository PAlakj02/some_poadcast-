# Ancient Echoes Archive

create a website template intended to hold a podcast series focused on history, primarily ancient so far, but keep it open(They have been centered on various areas across the world, including India, Egypt, Mesopotamia, and practically all of Eurasia due to Proto Indo Europeans). Include a home page, an about page, and the page for the podcast episodes

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/2f44d46c-3b85-424d-8d2d-969eeb9558c9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Shray's portfolio, recordings, and visitor counter

- **`/portfolio`**: Shray's one-page portfolio with its own navigation (About, Interests, Podcast, Projects, Achievements). Edit the text in `src/lib/portfolio.ts`.
- **`/shray`**: Shray's private studio. He logs in and pastes a Google Drive link to add a recording. Everyone else only sees the recordings, on the portfolio's Podcast section and on the Episodes page.
- **Visitor counter**: shown in the site footer and on the portfolio. Each browser is counted once. Each recording also shows how many times it has been played.

Audio stays in Google Drive. The database only stores titles, descriptions, Drive file ids, and counts.

### One-time setup (Supabase, free tier)

1. Create a project at [supabase.com](https://supabase.com) (or enable Lovable Cloud, which provides one).
2. **SQL Editor** → paste and run `supabase/migrations/0001_shray_recordings_and_counters.sql`.
3. **Authentication → Users → Add user**: create Shray's login (email + password, tick "Auto confirm").
4. **SQL Editor** → allow that account to add recordings:
   ```sql
   insert into public.site_admins (email) values ('shray-login@example.com');
   ```
5. **Authentication → Sign In / Providers → Email**: turn off "Allow new users to sign up", so nobody else can create an account.
6. Add the keys from **Project Settings → API** as environment variables (see `.env.example`):
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

Until the keys are set, the site still works and the recordings area shows "will appear here once the site's database is connected".

### How Shray adds a recording

1. Upload the audio to Google Drive.
2. **Share** → General access → **Anyone with the link** (Viewer) → **Copy link**.
3. Go to `/shray`, log in, paste the link, add a title, and click **Add to website**.
