# My-Portfolio
Mechanical engineering portfolio for Sheikh Al Arefin Ankon.

## Local preview

Run `python -m http.server 4173 --bind 127.0.0.1` in the repository, then open
`http://127.0.0.1:4173`. No build step or package installation is required.

## Site structure

- `index.html`: introduction, filterable projects, expertise, applied research, biography, credentials, and contact.
- `projects/`: four standalone engineering case studies.
- `css/styles.css`: shared responsive design system.
- `js/script.js`: navigation, filtering, and optional scroll animation.
- `images/`: existing project photographs, portrait, and SVG favicon.
- `images/eod-rov/`: project photos and CAD views for the Man-Portable EOD ROV case study.
- Legacy about, projects, and skills URLs redirect to their corresponding homepage sections.

## Publishing

GitHub Pages can serve this site from the `main` branch and `/(root)` folder.
The expected project URL is https://arefinsheikh123.github.io/My-Portfolio/.
Internal asset and page URLs are relative to support this repository subpath.

## Content maintenance

Project copy appears in both the homepage project cards and the respective case study.
Keep image filenames case-sensitive. Google Fonts are optional; system font fallbacks
are included. The site remains readable and navigable without JavaScript.

Contact uses email, telephone, and LinkedIn links. There is no configured form backend,
so the old placeholder form was removed. No resume PDF is present in the repository;
add the actual file before introducing a download link.
