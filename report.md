AI Analysis Summary

Issues
2
warning
Landmarks
1 occurrence
Read more

Document should have one main landmark

<html lang="en">

warning
Structure & Semantics
1 occurrence
Read more

Page should contain a level-one heading

<html lang="en">

Strengths
5

    Structure & Semantics

    Includes a meaningful alt attribute on the logo image (alt="logo The Black Cat"), providing context for screen reader users.
    Language

    Specifies the document language with lang="en" on the <html> element, helping screen readers select the correct pronunciation.
    Page Behavior

    Uses responsive meta viewport tag to ensure content scales correctly on different devices.
    Navigation & Interaction

    Includes preconnect hints for Google Fonts to improve loading performance.
    Screen Reader Support

    Includes descriptive metadata such as author and social links in meta and link tags, supporting user trust and context.








    warning
Structure & Semantics
AI Detected1 occurrence

Uses a <div> with id root as the main container without a semantic landmark element. This reduces clarity of the main content structure for users and search engines, impacting navigation and content understanding.

<div id="root"><div class="splash-wrapper"><img alt="logo The Black Cat" src="/frontend-mentor-exercise-34-entertainment-web-app/assets/images/the-white-cat.png"></div></div>

warning
Structure & Semantics
AI Detected1 occurrence

The image inside .splash-wrapper lacks a surrounding semantic element like <header> or <figure>. This misses an opportunity to convey that this is a branding or introductory image, which helps screen readers and SEO understand its role.

<div class="splash-wrapper"><img alt="logo The Black Cat" src="/frontend-mentor-exercise-34-entertainment-web-app/assets/images/the-white-cat.png"></div>






error
Syntax & Validation
3 occurrences
Read more

Use only recognized property values to ensure styles apply correctly and consistently.

object-fit: content;

project/src/components/movie/Movie/Movie.module.css:30
error
Syntax & Validation
3 occurrences
Read more

Use only valid CSS properties to ensure consistent rendering and avoid unexpected styling failures.

grid-name: mlHeader;

project/src/layouts/mainLayout/MainLayout.module.css:13
warning
Accessibility
11 occurrences
Read more

Provide alternatives for users who prefer reduced motion to prevent motion sickness and other accessibility issues.

transition:
    opacity 0.5s ease-in-out,
    filter 2s ease-in-out;

project/src/components/movie/Movie/Movie.module.css:17
warning
Responsive Design
48 occurrences
Read more

Consider using relative units (em, rem) instead of absolute units (px, pt) to support resizing and improve accessibility.

height: 140px;

project/src/components/movie/Movie/Movie.module.css:35
warning
Best Practice
2 occurrences
Read more

Order selectors from least to most specific to prevent unexpected style overrides.

.movie__image {
  opacity: 0;
  filter: blur(10px);

project/src/components/movie/Movie/Movie.module.css:14
warning
Accessibility
1 occurrence
Read more

Avoid position: fixed as it can cause content to be cut off when zoomed, creating accessibility issues for users who need to enlarge content.

position: fixed;

project/src/components/loading/Loading.css:2
warning
Accessibility
2 occurrences
Read more

Use em or rem units in media queries to respect user font-size preferences and ensure better accessibility.

@media screen and (min-width: 48px) {
  .header {
    padding: 20px;

project/src/layouts/mainLayout/Header.module.css:50
warning
Maintainability
1 occurrence
Read more

Consolidate duplicate selectors to maintain an organized and efficient stylesheet.

input,
  textarea,
  select,

project/src/styles/base/reset.css:59
warning
Syntax & Validation
5 occurrences
Read more

Avoid empty blocks to keep CSS clean and prevent unnecessary code bloat.

.form-control {
}

project/src/components/forms/fields/FormInput.css:56
info
Best Practice
3 occurrences
Read more

Use logical properties (e.g., inline-start instead of left) to support different reading directions and improve internationalization.

margin-top: 20px;

project/src/components/movie/Movie/Movie.module.css:49
info
Best Practice
20 occurrences
Read more

Consider using CSS functions like calc(), min(), and clamp() to create more responsive and flexible layouts that adapt to different viewport sizes.

margin-top: 20px;

project/src/components/movie/Movie/Movie.module.css:49
info
Responsive Design
1 occurrence
Read more

Consider using min-width instead of max-width and using a mobile-first approach, which can lead to cleaner code and better performance on smaller devices.

@media screen and (max-width: 25em) {
    .grid-result {
      max-width: 343px;



error
Logic & Correctness
AI Detected2 occurrences

The Login and SignUp components have submit buttons with type='button' which prevents form submission. This breaks the login/signup functionality causing users to be unable to submit forms.

          <button
            className="btn--submit mt-[40px] text-preset-4 flex justify-center items-center"
            type="button"
            aria-label="Log in to your account"
            disabled={!isValid || isSubmitting}
          >
            Login to your account
          </button>