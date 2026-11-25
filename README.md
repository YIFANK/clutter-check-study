# Clutter Check Study

Behavioral task for the 9.66 project "What Needs Checking Before We Act?". Participants see six objects with
uncertain positions and two placement sites, may reveal up to two objects, then answer fits / collides.

- `index.html`: the whole experiment (stimulus generator, trial flow, saving).
- `build.sh`: wraps it into `docs/index.html`, the GitHub Pages site.
- `docs/config.js`: `window.STUDY_API`, the URL responses are POSTed to.
- `backend/Code.gs`: Google Apps Script that appends each submission to a Google Sheet.
- `backend/load_responses.py`: sheet CSV to one JSON list (last save per participant).

## Collecting data

1. Create a Google Sheet, open Extensions > Apps Script, paste `backend/Code.gs`.
2. Deploy > New deployment > Web app, execute as "Me", access "Anyone". Copy the `/exec` URL.
3. Put the URL in `docs/config.js`, commit and push.

With `STUDY_API` empty, participants get a response code to copy and send back instead.

## Links

Add `#a` or `#b` to the study link to fix the counterbalancing group; without it the group is random.

## Design

24 layouts, 6 per condition for each group, half fit and half collide in every condition:

| condition  | objects at the cued site                      | nearest object can change the answer |
|------------|-----------------------------------------------|--------------------------------------|
| critical   | near decoy, one boundary-crossing, far filler | no                                   |
| critical2  | near decoy, two boundary-crossing             | no                                   |
| congruent  | nearest is boundary-crossing, two fillers     | yes                                  |
| congruent2 | nearest boundary-crossing, a second, filler   | yes                                  |

True centers are sampled uniformly inside each region conditional on the designed outcome, so outcomes are
balanced rather than drawn from the uniform prior.
