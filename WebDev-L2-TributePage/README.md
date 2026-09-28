# Abdus Salam — A Legacy Written in the Stars

## Project Overview

A responsive tribute webpage created as Level 2 Task 2 of the Oasis Infobyte Web Development & Designing internship. This second project presents Dr. Abdus Salam's life, scientific contributions and work to broaden access to research. The layout, HTML, CSS and biographical prose were created for this project; the historical photograph and attributed quotation are sourced separately.

## Internship Information

- Oasis Infobyte
- Web Development & Designing Internship
- Level 2 — Task 2: Tribute Page
- Student: Aisha Meraj

## Features

- Navigation to About, Achievements, Timeline and Legacy using native anchors.
- Archival portrait stored locally with credit and a reuse-license link.
- Four biographical paragraphs plus an introductory paragraph.
- Four achievement items and a seven-entry responsive timeline.
- Verified, attributed quotation with a transcript link.
- Legacy discussion, factual sources and image attribution.
- Skip link, semantic headings, visible keyboard focus and reduced-motion support.
- Responsive Grid/Flexbox layouts and system fonts; no external runtime dependencies.

## Technologies Used

- HTML5
- CSS3

No JavaScript, frameworks, package installation or build process is needed.

## Project Structure

```text
WebDev-L2-TributePage/
├── index.html
├── css/
│   └── style.css
├── images/
│   ├── abdussalam-portrait.jpg
│   └── README.md
├── screenshots/
│   └── README.txt
├── README.md
└── .gitignore
```

`index.html` contains all page content and semantic structure. `css/style.css` contains the complete theme and responsive styles. The image README records the portrait's provenance and license. The screenshot README contains capture instructions and a short recording plan. `.gitignore` excludes common local settings and temporary files.

## How to Run

Open `index.html` directly in a modern browser. Keep the `css` and `images` folders beside it. The complete page works offline; following external source links requires internet access.

## Design Approach

The design uses an editorial reading rhythm: a large portrait-led introduction, narrow biography text, a dark achievement section and a vertical chronology. Ivory, deep navy and muted gold keep the emphasis on the subject. Georgia supplies serif headings and quotations; Arial/Helvetica supplies sans-serif body text and navigation. These system-font stacks work without downloading fonts.

Desktop uses paired columns, with four achievement columns at wide widths. Tablet reduces the card grid to two columns. Mobile stacks the hero, biography and legacy; narrow phones use one achievement column. A CSS-only orbital motif is decorative, not a scientific diagram. The poetic title does not imply that Salam's primary discipline was astronomy.

## Content Sources

Facts checked on 28 September 2026. All explanatory prose is written in original wording. The quotation is explicitly attributed.

- [Nobel Prize biography](https://www.nobelprize.org/prizes/physics/1979/salam/biographical/): early life, education, research career and death date.
- [Nobel Prize curriculum vitae](https://www.nobelprize.org/prizes/physics/1979/salam/cv/): birth date and educational dates, including the **1952 doctorate**. The biography's 1951 date describes publication of his thesis; it is not used here as the degree year.
- [1979 Nobel Physics press release](https://www.nobelprize.org/prizes/physics/1979/press-release/): shared award and electroweak theory.
- [ICTP: Our History](https://dp9.ictp.it/home/our-history): 1964 founding, Paolo Budinich and scientific exchange.
- [ICTP: Celebrating Abdus Salam](https://2022.ictp.it/news/2024/1/celebrating-abdus-salam): Imperial's theoretical physics group with Paul Matthews.
- [Al Islam: Nobel Banquet speech transcript](https://www.alislam.org/articles/abdus-salam-banquet-speech/): exact quotation, “The creation of Physics is the shared heritage of all mankind.” Speech dated 10 December 1979; the transcript identifies its origin as *Les Prix Nobel*, Nobel Foundation, 1980. The Nobel speech webpage returned an access error during verification, so the page links this accessible transcript. Biography and scientific claims use Nobel/ICTP sources.

## Image Attribution

**Abdus Salam 1987.jpg**, photograph by **Bart Molendijk / Anefo**, 30 May 1987, from the **Nationaal Archief**, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Abdus_Salam_1987.jpg).

License: [Creative Commons Attribution-ShareAlike 3.0 Netherlands](https://creativecommons.org/licenses/by-sa/3.0/nl/deed.en). The file is included locally and unchanged; the page scales it proportionally. It is licensed for reuse, not claimed to be public domain. Preserve attribution and follow ShareAlike requirements for image adaptations. See `images/README.md` for archive and download details.

## Screenshots

These are planned filenames, **not existing screenshot files**:

- `screenshots/tribute-desktop.png` — desktop hero/full-page view.
- `screenshots/tribute-achievements-timeline.png` — achievements and timeline.
- `screenshots/tribute-mobile.png` — mobile responsive view.

Capture the real page at 100% browser zoom. Suggested viewports: 1440 × 1000 and 390 × 844. Detailed capture instructions and the demo-video plan are in `screenshots/README.txt`.

## What I Learned

Topics to explain and reflect on when presenting this project:

- Using semantic HTML and a logical heading order to organise a long page.
- Pairing serif and sans-serif type to separate editorial content from navigation.
- Reflowing Grid and Flexbox layouts at readable breakpoints.
- Building a timeline with a list, borders and decorative pseudo-elements.
- Keeping image dimensions proportional and recording reuse permissions.
- Providing keyboard focus, a skip link and reduced-motion preferences.

## Future Improvements

- Add an independently reviewed Urdu translation with appropriate language metadata.
- Add a print stylesheet for a compact reading copy.
- Test with more browsers and a screen reader, and refine using reader feedback.

## Validation and Requirement Check

Tested in local headless Chrome by opening the actual `file://` page at viewport widths 1440, 1024, 768, 390 and 320 pixels. At each width: no horizontal document overflow, portrait loaded, all fragment targets existed, all four navigation links changed to the correct section, and the first Tab focused the skip link. No page errors or failed requests were recorded. Desktop and mobile full-page captures were inspected for alignment, proportional image display, card flow, timeline readability and quote wrapping. The page uses one h1, section h2 headings and item h3 headings; the portrait has descriptive alt text. Primary text colour pairs meet WCAG AA contrast for normal text. Reduced-motion preferences disable smooth scrolling.

This is a focused Chrome/layout check, not a claim of a complete accessibility audit or testing in every browser. A manual screen-reader review and Safari/Firefox checks remain useful optional follow-ups.

| Oasis requirement | Result |
| --- | --- |
| Page title with subject's name | PASS |
| One-line tagline | PASS |
| Prominent reusable portrait | PASS — local CC BY-SA image with credit |
| At least 3–4 original biography paragraphs | PASS — four plus introduction |
| Timeline or key achievements | PASS — both included |
| Distinct quote block | PASS — verified transcript and attribution |
| At least two background treatments | PASS — ivory, navy and soft neutral |
| At least two font styles | PASS — serif and sans-serif |
| Responsive layout | PASS — five viewport widths checked |

## Submission and GitHub

Place this folder inside the existing `OIBSIP` checkout so the result is `OIBSIP/WebDev-L2-TributePage/`. Do not initialise a separate repository. After reviewing the page, run from the root of the existing OIBSIP checkout:

```sh
git status
git add WebDev-L2-TributePage/
git diff --cached --check
git diff --cached --stat
git commit -m "Add Level 2 Task 2 Abdus Salam tribute page"
```

No push is required for local review. When ready to upload to the already-configured remote and branch, run `git push`. Check the staged changes before committing so unrelated work is not included.
