# Fieldwork

A lightweight, browser-only prototype for helping small-business owners explore funding and support opportunities related to UN Sustainable Development Goal 9.

## Run it

Open `index.html` in a browser. No build step, package installation, account, or API key is required.

## What the prototype demonstrates

- An intake form for a business description, location, business stage, support needs, and optional TXT/Markdown notes.
- Example opportunities across local, state, and federal levels, with simple keyword-based matching and level filters.
- Save controls and links to program-provider websites for further research.
- Responsive layouts for desktop and mobile.

## Important limitations

This is a user-interface prototype, not a live AI search product. Matching runs locally in the browser using a small, hand-authored sample catalog; it does not search the web, call an AI model, verify current availability, or determine eligibility. Local and state examples are intentionally limited to Austin and Texas. Other locations can still see federal examples, but will not see location-specific coverage until a verified catalog is added.

Program information and example matches are for exploration only. Providers may change eligibility, terms, and availability; users should confirm all details with the official provider. Uploaded text is read locally into the description field and is not sent to a server. Only TXT and Markdown files are supported in this demo.

## Next steps for a production version

Connect a verified, maintained program catalog with geographic coverage, deadlines, eligibility criteria, and official sources; add a secure backend and a grounded AI search layer; then test matching quality and accessibility with small-business owners.
