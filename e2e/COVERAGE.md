# E2E Test Coverage

## What is covered

### Unauthenticated flows
- Sign-in landing page renders with CTA text and sign-in button
- Sign-in modal displays OAuth providers (GitHub, Google, Discord) and credentials form
- Page title shows "Sign In" when unauthenticated
- All protected routes redirect to sign-in page

### Authentication
- Credential-based sign-in/sign-up flow (auto-creates user if not existing)

### Home feed (authenticated)
- Home page renders with navigation sidebar, tweet input, and content area
- Tweet composer with Tweet button is visible
- Right sidebar shows "Who to follow" section and disabled search bar
- Left sidebar shows all navigation items (Home, Explore, Bookmarks, Settings, Profile)
- "Get Verified" option visible in sidebar

### Tweet creation and interaction
- Creating a new tweet with text content
- Tweet minimum body length enforcement (>= 3 characters)
- Clicking a tweet navigates to the tweet detail page

### User profile
- Navigating to own profile via sidebar
- Profile page shows username, Edit profile button, follower/following stats
- Edit profile modal opens when clicking Edit profile
- Back button present on profile page

### Page navigation
- Bookmarks, settings, and messages pages load with proper layout
- Both `/` and `/home` render the home feed
- Footer attribution link visible

## Known gaps

### Requires human interaction to verify
- **OAuth sign-in flows** — GitHub, Google, Discord OAuth require real provider credentials and redirect flows that cannot be automated without provider-specific test accounts
- **Image upload in tweets** — Requires a real Supabase storage bucket; image compression and upload flow needs manual verification
- **Image upload in profile edit** — Same as above; background and profile image upload to Supabase storage
- **Toast notifications** — Success/error toast messages appear transiently; manual verification needed for correct timing and content

### Requires additional test infrastructure
- **Tweet like/unlike toggle** — Requires verifying UI state change and backend count update; depends on existing tweet data
- **Tweet retweet/unretweet toggle** — Same as above
- **Tweet reply flow** — Requires navigating to tweet detail, composing reply, verifying it appears in thread
- **Follow/unfollow user** — Requires a second user account to test following another user
- **Followers/following list pages** — Requires multiple users with follow relationships
- **Edit profile save** — Saving profile changes and verifying persistence across page loads
- **Infinite scroll pagination** — Requires >10 tweets in the database to trigger pagination
- **Verification badge selection** — Badge modal interaction and persistence

### Stub/disabled features (not testable)
- **Explore page** — Route does not exist; nav item is disabled
- **Notifications** — Not implemented
- **Messages/DM** — UI only; no backend messaging functionality
- **Settings password change** — Form exists but functionality not fully implemented
- **Bookmarks filtering** — Shows all tweets; no actual bookmark filtering logic
- **Search** — Search bar is disabled

### Business logic gaps (requires domain knowledge)
- **Duplicate username handling** — Edge case behavior when OAuth creates a user with an existing username
- **Session refresh after profile update** — NextAuth session update mechanism
- **Tweet body normalization** — 3+ consecutive newlines compressed to 2
