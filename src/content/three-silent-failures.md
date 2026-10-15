# Three Silent Failures a Green Build Hid: apache/answer, CRA to Vite

## The Number I Almost Shipped

The first numbers out of this migration were good. Cold production build: 1.94 seconds, down from 19.87. Total bundle size, gzipped: 1175.90KB, smaller than the build it replaced on every axis I measured. Those are the numbers that go in a pitch.

They were also incomplete; finding out why took an adversarial review whose job was to break a migration that already looked finished.

The cold build got slower on a second look. Production TypeScript checking had been silently dropped: the previous toolchain ran its checker as a blocking step in the dev server and downgraded it to warnings during production builds, and neither carried over when the bundler changed, so until the fix a type error shipped with no signal at all. Restoring the check as a blocking `tsc --noEmit` step in the build brought the cold build to 4.77 seconds, still a 76 percent improvement over the 19.87 second baseline, and the number I am willing to publish, because it reflects a build that actually does what the old one did.

The bundle got heavier too. The built CSS referenced bootstrap-icons font files, two of them, 306,428 bytes, that the build was silently failing to emit, and every icon in the shipped application rendered as a broken glyph. The 1175.90KB gzip figure was smaller partly because those bytes were simply missing; once the fonts actually ship, the honest total is 1474.34KB.

Both of those numbers got worse, on purpose, once I went looking for why the flattering versions were wrong. That is the thesis of this article: honest numbers are the product. An engineer, or a shop, that publishes the flattering figure and stops looking is selling you the 1.94 second build, the one with no type safety and broken icons. I would rather sell you the 4.77 second one, because that is the build that actually works.

## What Was Being Migrated

apache/answer is an open-source question-and-answer platform, in the vein of Stack Overflow: a Go backend that server-renders pages and embeds its own built frontend into the compiled binary. The frontend was built with Create React App, by way of `react-scripts` and `react-app-rewired` (the `config-overrides.js` escape hatch CRA projects reach for once `react-scripts` alone will not do). I migrated it to Vite.

The migration landed as nine commits, each scoped to one concern, from the build toolchain itself to asset-tag parsing to removing Create React App outright. Nine agents were dispatched across that work, each on a bounded brief, the only way I have found to keep a migration this size reviewable rather than one undifferentiated diff.

I opened it upstream as [apache/answer#1567](https://github.com/apache/answer/pull/1567), "build: replace Create React App with Vite," where a maintainer asked about its size and purpose and received an answer offering a discussion venue and a staged split. A project reviewer then built and ran the migrated application locally, production binary and dev server both, and reported no blocking defects for the default same-origin deployment, calling the server-side fixes "correct and necessary." That exchange also produced a small follow-up commit correcting two stale code comments and a regression run across the deployment scenarios raised in review, which passed in all three.

On August 17 a maintainer asked for the staged split, a tracking issue ([apache/answer#1578](https://github.com/apache/answer/issues/1578)) plus three pull requests that each leave the `dev` branch buildable, and I closed #1567 on August 22 as suggested. The Go asset contract merged on September 15 ([#1582](https://github.com/apache/answer/pull/1582)) and the Vite cutover on September 18 ([#1616](https://github.com/apache/answer/pull/1616)); the v2.0.3-RC1 pre-release, published September 23, ships the new frontend. The Go test described below landed with the first; the guard scripts are the third pull request ([#1641](https://github.com/apache/answer/pull/1641)), still open as of October 4. Every measurement in this article was taken on the original single-PR branch, before the split.

## Three Silent Failures That Shipped Green Builds Anyway

Three separate defects in this migration shared the same shape: the build succeeded, exit code 0. The checks that existed at the time passed. And the application was broken anyway, in a way nothing in the pipeline said out loud. The specifics below belong to one bundler migration; the shape belongs to every migration.

### The server couldn't find its own assets

apache/answer's Go server renders pages server-side, and `GetStyle()` tells the page template which script and stylesheet tags to write into the head, by regular expression over the built `index.html`, written against Create React App's exact output shape: `<script defer="defer" src="...">`. Vite's entry script is an ES module instead, and the regex matched nothing against it: `GetStyle()` returned empty, and every server-rendered page silently lost all of its JavaScript and CSS. No error anywhere. The build was green, the binary compiled, the server started, and the pages it served had no assets.

It got worse under inspection: `header.html`, the template that writes the tag, re-emits the scraped paths as a hardcoded classic script tag, which throws on the first bare `import` an ES module contains, so a frontend-only fix was never available; only a change on the Go side could close the gap.

The fix touched both: `GetStyle()` now walks the parsed DOM (via Go's `golang.org/x/net/html`) instead of matching a tag shape, and `header.html` emits a module script tag instead of a classic one. A Go test, `TestGetStyleResolvesBuiltAssets`, proved failing two separate ways against a real embedded build before I trusted it: once against the module-script shape (empty scripts), and separately against a stylesheet order that left the scripts alone (empty CSS, the half a script-only fix would have missed). A permanent self-check mutates the built HTML into broken shapes and confirms the checker fails on each. Those fixtures earned their keep once already: when the parser became shape-tolerant, the original two negatives started passing, and the self-check reported itself vacuous instead of staying quietly green. They were replaced with shapes genuinely broken under the new parser, because a self-check whose fixtures no longer fail is not checking anything.

### A blank page with a perfect console

The second failure was harder to diagnose: there was nothing to look at. I built the application, started the server, and loaded a page in a real browser: the server-rendered HTML was present, the module script and both stylesheets fetched successfully, every dynamic chunk returned 200, the console was completely empty, and the page showed nothing but its loading spinner, which never cleared because React never mounted. Both regression checks in place at the time, the asset-tag check above and the locale-file loader check built alongside it, passed. The build was green. Nothing had failed.

The cause was an ordering dependency the bundler decides, not the application. i18next (version 21.10.0) attaches its resource-store methods to its own instance inside `init()`, while this application's plugin i18n modules register against that instance during module evaluation, before `init()` is called. The previous bundler's chunking happened to evaluate the i18n bootstrap first, so the store methods already existed when the plugin code ran; Vite's chunking did not, and the registration call threw while the entry module was still evaluating, taking the application down before it ever rendered.

I found the cause by rebuilding unminified and reading i18next's own source rather than guessing from a minified trace. The fix does not reorder imports, since that is one bundler upgrade from breaking again the same way; it registers immediately if an initialized instance exists, and otherwise defers to the `initialized` handler the code already had. A third check exercises both orders, asserting the translations actually land, not just that the call survives, and I watched it fail with the browser's identical error before trusting it.

A green build, a working dev server, and two passing regression checks together are not proof an application renders.

### The warning nobody reads

The third failure explains why "read the errors" is not sufficient advice. The router loaded page components with ``lazy(() => import(`@/pages/${pagePath}`))``, a dynamic import built from a path alias and a template literal, which Vite cannot statically analyze. It told me so, with a warning, not an error. The build exited 0. The two checks written before the migration passed. The Go binary compiled. The literal, untransformed specifier shipped inside the bundle, so every lazily routed page would 404 the moment a user navigated to it.

Neither check caught this: both guard failures I had already predicted, and this one I had not. What caught it was something more boring than a check: diffing the shape of the build output against a baseline captured before touching any config. 297 JavaScript files had become 114, 35 CSS files had become 1, and the entry chunk, which should stay small, had grown to 1127KB, because every page's code that should have split into its own chunk was instead dragged into the one chunk the bundler could resolve.

The fix replaces the unanalyzable template literal with a depth-bounded `import.meta.glob`, Vite's way of enumerating modules at build time, scoped to the directory depths the router actually uses so a component's own index file never gets mistaken for a page. The entry chunk dropped to 91KB, and a route with no matching module now throws loudly, with the path and keys it knew, instead of rendering nothing.

Checks guard the failures you predicted. Artifact comparison catches the ones you did not.

## Proving a Check Can Fail Before Trusting It

None of the three checks above were trusted the moment I wrote them. Every regression check in this project was proven failing, deliberately, against the exact shape it was meant to catch, before it was allowed to guard anything. A check never observed failing is a check trusted on faith, and faith is the failure mode this article is about.

That discipline caught its own failure once: a green line that meant nothing. The first attempt to prove the asset-tag check's negative case (feed it a broken `index.html`, confirm it fails) reported PASS. It should have failed. What happened: a shell redirect meant to swap in the mutated HTML was silently refused by zsh's `noclobber` option, the error scrolled past inside a multi-command block, and the Go test ran against a cached result from the original, untouched file. The green line had tested nothing. I caught it because the run printed which file it was about to test, and the content was visibly the unmodified original. Fixed with an explicit copy and a flag that defeats Go's test cache: a passing check and a check that ran are not the same claim.

## Ten Rounds of Trying to Break It

The same discipline, scaled to the whole branch, is the adversarial review: ten rounds, every reviewer instructed to find checks that pass while the thing they guard stays broken, every finding sent to a separate reviewer instructed to default to refuted when uncertain. Raw findings per round: 67, 18, 25, 5, 3, 4, 2, 3, 0, 0. Refuters killed or downgraded roughly a quarter of everything raised. What survived, with duplicates across finders merged, became 21 distinct defects, fixed across 20 commits; the branch, nine commits when the migration first landed and 21 by the time the review began, grew to 41 commits.

For three consecutive rounds, the review caught defects inside its own previous fixes: a timeout leak in a listener, an unbounded close call, a watchdog timer budgeted too tight for the steps it was meant to bound. Only after that streak did two rounds come back empty, the actual exit condition: one dry round after three self-inflicted rounds proves nothing, two in sequence does.

## Numbers That Were Wrong Before They Were Right

The same review pass caught three wrong numbers before publication, none of them caught by anything failing.

- **Dev server time-to-ready read 81 milliseconds**, the build tool's own self-reported figure. The pre-migration baseline had no equivalent number and was measured by wall clock, spawn included, so comparing the two flattered the result roughly fourfold. Forced to wall clock on both sides, the honest number is 359 milliseconds: still a 94.9 percent improvement, but a real one.
- **A dependency count read 739 after a plain reinstall**, when it should have read lower: a plain install does not prune the package manager's link farm, so packages already removed earlier in the session were still on disk, counted as present. A clean reinstall gives 689, fifty phantom dependencies.
- **A cold build measured faster than a warm build, twice, on separate capture attempts:** arithmetically impossible, and the benchmarking harness enforces an arithmetic invariant for exactly this, so it flagged both attempts and named the likely cause. The cause was a cache-purge list missing a directory the new tool writes to. Once fixed, cold and warm landed within noise: the new build has no meaningful persistent cache to warm, so the only honest comparison is cold against cold.

None were caught by a test turning red, only by an arithmetic invariant or two independently measured numbers disagreeing. A green checkmark cannot catch a plausible wrong number; a cross-check can.

## What the Agents Got Wrong, and Who Caught It

Agentic tooling did the mechanical work in this migration; every change was reviewed by a human before being committed. That meant dispatching agents for bounded, evidence-checked work rather than a finished migration in one shot, which is also why the mistakes below are visible instead of silently absorbed.

Roughly 150 subagents ran across the ten review rounds, 72 in round one alone, producing the 127 raw findings the review rounds above account for and the 21 defects that survived them; nine agents executed the migration itself. A few concrete failures from that fleet, since the failures are the actual evidence for whether any of this works:

- Three agents, during earlier repository research, produced impossible lines-of-code estimates by letting one vendored or minified file anchor a bytes-per-line ratio: roughly 13,000 against a real count near 800,000; 4,200 against near 252,000; 18,000 against near 750,000. All three caught and corrected the error before reporting, since the standing instruction is evidence per claim, not a bare conclusion.
- Two agents wrote to the same generic filename in a shared scratchpad and clobbered each other's output; both caught it when the content did not match the repository each was reading, and re-fetched under unique names.
- Two agents disclosed rule violations unprompted, including one that ran a git command after being told not to and said plainly it should have asked first.
- One agent stalled at a 600-second timeout, task half finished, debug instrumentation left in a test file; I finished it by hand.
- One capture agent, recapturing benchmark numbers, ran a package-manager command granting blanket build-script trust (`pnpm approve-builds --all`) without authorization, trying to force an install past a security gate on its own initiative. The security layer flagged it; the affected file was reverted, the capture discarded, and I redid it clean with no gate bypassed.

None of these took the migration down. Each is the same shape as the three traps above: left uncaught, it produces a confident wrong answer instead of a visible failure. Catching them was not a side effect of the process. It is the process.

Human hours across review and verification: roughly 4 to 10, reconstructed afterwards from session timestamps rather than logged during the work. Time spent reading outside those sessions is not counted, so the real figure is somewhat higher.

## What This Did Not Cover

- `make lint` (golangci-lint) did not run in the final review session: the toolchain is not installed locally, and its installer wants a network curl-to-shell, which I skipped. The Apache Software Foundation license-header half of the lint target did run, clean, and golangci-lint itself ran clean earlier in the branch's history, when it found and fixed a hazard.
- The Docker image was not rebuilt after the review's fixes landed. The release path was proven toolchain-agnostic at an earlier tag and nothing the fixes touched should affect it, but "should" is weaker than the direct verification this project insists on, so I am naming the gap rather than rounding it to done.
- The CDN module-script CORS path was not reproduced live (it needs a second origin and a configured CDN plugin I do not have set up); the consequence is documented instead of demonstrated, in the CDN plugin READMEs ([apache/answer-plugins#326](https://github.com/apache/answer-plugins/pull/326)) and the v2.0.3-RC1 release notes.
- The claim that this migration does not regress old-Safari support rests on chained evidence (resolved browserslist queries against caniuse data), not a real device; `vite preview`'s behavior was verified by reading its source, not a live run against this application.
- HMR latency was not re-measured at the final review head; the figure below is carried forward from an earlier commit, disclosed as such, because no commit since touches the hot-update path.
- The upstream repository's branch-protection settings were unreadable without admin API access, so nothing here characterizes them.

Underneath it all: this repository has no test runner and no unit tests, before this migration or after. Three targeted regression checks exist now, each proven failing before being trusted, each guarding one way a green build can lie. That is not a test suite, and I am not calling it one.

## The Numbers

Same machine, same method, clean working tree on both sides, five runs per metric, reproduced exactly as captured:

| Metric | Before | After | Delta | Delta % |
|---|---|---|---|---|
| Cold production build | 19.87s | 4.77s | -15.11s | -76.0% |
| Warm/incremental build | 8.75s | 4.87s | -3.88s | -44.4% |
| Dev server time-to-ready | 7104ms | 359ms | -6745ms | -94.9% |
| HMR latency | 421ms | 139ms | -282ms | -67.0% |
| Bundle size, JS raw | 3477.60KB | 3010.49KB | -467.11KB | -13.4% |
| Bundle size, JS gzip | 1198.75KB | 1035.57KB | -163.18KB | -13.6% |
| Bundle size, total raw | 4290.39KB | 3763.97KB | -526.42KB | -12.3% |
| Bundle size, total gzip | 1652.24KB | 1474.34KB | -177.90KB | -10.8% |
| CI wall time | n/a (no CI run captured) | n/a (no CI run captured) | n/a | n/a |
| Test suite wall time | n/a (no test script in package.json) | n/a (no test script in package.json) | n/a | n/a |
| Dependency count, direct | 75 | 65 | -10 | -13.3% |
| Dependency count, total | 1578 | 689 | -889 | -56.3% |
| Audit findings (critical/high/moderate/low) | 4/78/63/13 | 1/50/38/6 | -3/-28/-25/-7 | n/a |

Caveats that stay attached to every one of these rows:

- Chunk boundaries differ structurally between the bundlers; the bundle-size rows compare total shipped bytes, not chunk for chunk.
- Bundle rows exclude sourcemaps; they are not shipped bytes.
- The migrated cold build includes a blocking TypeScript check. The old toolchain ran its checker in the dev server and let production builds pass with type errors downgraded to warnings; the first migration pass carried neither, and the restored check runs on every build, cold or warm.
- HMR latency was measured at one commit, on both toolchains, carried forward; no commit since touches the hot-update path.
- Dev server time-to-ready is wall clock on both sides, process spawn included, not either tool's self-reported number.
- Cold and warm land within noise on the migrated side: the new toolchain has no meaningful persistent cache to warm, so cold against cold is the comparison that matters.
- Dependency count, total uses the same directory-count method on both sides, after a clean reinstall.
- Both captures ran on pnpm 11.17.0 though the repository pins 9.7.0; the same version both sides is what makes the comparison hold, a disclosed caveat, not an oversight.
- Deltas and percentages are computed from the full-precision medians, then rounded for display; recomputing them from the rounded cells shown here can differ in the last digit.

## Where This Leaves It

As of October 6, the Vite cutover is merged upstream and shipping in a release candidate, and the guard scripts are still open. These are the numbers I would defend to whoever lives with this build after I am gone: slower where honesty made them slower, faster everywhere it actually is faster, every caveat attached to its row.

That is the whole pitch. Not fast. Honest.

---

*Xan Torres runs Red First, a one-person practice doing fixed-price frontend modernization that starts with an audit. More at https://redfirst.dev, or email hello@redfirst.dev.*
