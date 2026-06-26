# PRD - LyricCanvas

## Vision

LyricCanvas is an immersive web application for experiencing songs, poems, and text line-by-line.

Unlike traditional lyrics websites, LyricCanvas treats every lyric as part of a living visual performance. As the reader progresses, the text, colors, particles, and animated background evolve together to create an emotionally synchronized experience.

The application works entirely offline as a static website and can be hosted on GitHub Pages.

---

# Goals

- Create a beautiful lyric reading experience.
- Make every song feel like an interactive visual poem.
- Support both handcrafted experiences and user-created projects.
- Require zero backend.
- Store everything locally.
- Be easily shareable through JSON project files.

---

# Non-goals

- Music streaming.
- Karaoke timing accuracy.
- Online accounts.
- Community/social features.
- Lyrics scraping.
- AI-generated visuals (future possibility).

---

# Modes

## 1. Featured Songs

A small collection of handcrafted songs.

Each includes:

- Custom visuals
- Scene progression
- Tuned transitions
- Optional custom animations
- Metadata

These showcase the engine's full capabilities.

---

## 2. Custom Projects

Users create their own projects by importing or editing JSON.

Projects are stored in Local Storage.

Users can:

- Create
- Duplicate
- Rename
- Delete
- Export
- Import

No account required.

---

# Reading Experience

Current lyric appears centered.

Display order:

Native language
Romanization
English translation

Previous and next lines remain visible with reduced opacity and size.

Navigation:

- Scroll
- Swipe
- Tap
- Arrow keys
- Space

Optional autoplay.

---

# Themes

Themes define the overall artistic style.

Included themes:

- Fractal Garden
- Ink Painting
- Particle Dream

Each theme provides:

- Background renderer
- Color palette
- Lighting
- Camera movement
- Particle behavior
- Transition defaults
- Typography style

Themes remain consistent while evolving throughout the song.

---

# Default Performance Engine

Users only need lyrics and a theme.

Example:

{
"theme": "fractal_garden",
"lyrics": [...]
}

The engine automatically generates:

- Scene progression
- Camera motion
- Smooth transitions
- Particle movement
- Color evolution
- Text animations
- Lighting changes
- Ambient motion

Every project becomes visually interesting without additional configuration.

---

# Sentence-Specific Effects

The engine analyzes optional semantic tags or keywords for each lyric.

Examples:

Hope
→ sunrise
→ warm lighting
→ upward camera movement

Rain
→ falling particles
→ cool colors

Ocean
→ flowing motion
→ blue palette

Fire
→ sparks
→ orange glow

Wind
→ drifting particles

Night
→ stars
→ darker atmosphere

Love
→ bloom
→ floating petals

Loneliness
→ empty space
→ reduced saturation

Forest
→ leaves
→ organic movement

These effects blend naturally into the active theme.

---

# Progressive Customization

The same JSON supports multiple experience levels.

## Level 1

Lyrics only

The engine creates everything automatically.

---

## Level 2

Hints

Users provide:

- mood
- intensity
- theme
- scene tags

The engine interprets these creatively.

---

## Level 3

Scene Overrides

Specific lines can override:

- transition
- scene
- palette
- emphasis

Everything else remains automatic.

---

## Level 4

Explicit Performance

Advanced users can override any renderer parameter.

Only affected properties are replaced.

Remaining behavior comes from the engine.

---

# JSON Philosophy

Content and presentation are separated.

Lyrics represent content.

The engine represents presentation.

User overrides only replace the parts they specify.

Rendering priority:

Defaults

↓

Theme

↓

Sentence Effects

↓

Mood Hints

↓

Scene Overrides

↓

Explicit Parameters

---

# Visual Animation

Transitions include:

- Fade
- Dissolve
- Slide
- Blur
- Scale
- Glow

Background changes interpolate smoothly instead of jumping.

---

# Text Animation

Current lyric may:

- Fade in
- Breathe
- Glow
- Ripple
- Slightly float
- Dissolve

Previous and next lyrics gently animate but never distract.

---

# Project Storage

Stored in Local Storage.

Project browser:

Featured Songs

My Projects

Supports:

- Search
- Duplicate
- Delete
- Export JSON
- Import JSON

---

# JSON Structure

Project

↓

Metadata

↓

Theme

↓

Lyrics

↓

Optional hints

↓

Optional scene overrides

↓

Optional explicit performance

---

# Technical Requirements

Platform:
Static Web App

Hosting:
GitHub Pages

Framework:
React + TypeScript + Vite

Styling:
Tailwind CSS

Animation:
Motion

Graphics:
React Three Fiber

Persistence:
Local Storage

Import/Export:
JSON

Backend:
None

---

# Paced V1 Build Plan

V1 should be built as a sequence of small, usable slices. Each step should leave the app in a working state and avoid pulling in later complexity before the core reading experience feels good.

## Step 1 - Reading Prototype

Goal:
Replace the Vite starter with a focused lyric reader using one hardcoded sample project.

Includes:

- Project and lyric TypeScript types
- One sample project loaded in code
- Centered current lyric
- Previous and next lyric previews
- Keyboard navigation
- Tap/click navigation
- Mobile-friendly layout

Out of scope:

- Three.js visuals
- Project storage
- Import/export
- Advanced theme engine

Success criteria:

- A user can move through a song line-by-line.
- The lyric hierarchy is clear: native text, romanization, translation.
- The interface already feels calm and intentional without final visuals.

---

## Step 2 - Visual Mood Shell

Goal:
Add the first lightweight background system without introducing a full renderer.

Includes:

- Theme tokens for color, typography, and motion
- One initial theme inspired by Particle Dream
- CSS-based ambient background animation
- Smooth transitions between lines
- Basic intensity changes by lyric position

Out of scope:

- React Three Fiber
- Semantic keyword detection
- User theme editing

Success criteria:

- The experience feels like a lyric performance, not a static page.
- Visual motion supports the text without competing with it.

---

## Step 3 - Project Data Model

Goal:
Move from hardcoded rendering details to the JSON shape described by the PRD.

Includes:

- Formal project schema in TypeScript
- Metadata support
- Theme selection field
- Lyric hints: mood, intensity, tags
- Safe parsing and fallback defaults

Out of scope:

- Full editor UI
- Local Storage project browser
- Scene override UI

Success criteria:

- The sample project can be represented as JSON-like data.
- Missing optional fields still produce a good default experience.

---

## Step 4 - Local Projects

Goal:
Let users create and keep projects entirely in the browser.

Includes:

- My Projects list
- Create, duplicate, rename, delete
- Local Storage persistence
- Import JSON
- Export JSON

Out of scope:

- Rich lyric editor
- Theme marketplace
- Accounts or backend features

Success criteria:

- A user can import a project, read it, leave, return, and still find it.
- Exported JSON can be re-imported successfully.

---

## Step 5 - Semantic Effects

Goal:
Make optional hints and keywords influence the visual shell.

Includes:

- Keyword/tag effect mapping
- Mood and intensity interpolation
- Per-line text emphasis
- Scene override merge logic

Out of scope:

- AI analysis
- Complex renderer parameter editing
- Timed karaoke behavior

Success criteria:

- Lines tagged with concepts like rain, fire, night, hope, or loneliness produce distinct but tasteful visual shifts.
- Effects blend into the active theme rather than replacing it abruptly.

---

## Step 6 - Featured Songs

Goal:
Add the showcase mode after the engine can support it.

Includes:

- Featured Songs section
- Handcrafted sample projects
- Tuned transitions and metadata
- Read-only project display

Out of scope:

- Online library
- Community sharing
- Scraping or streaming

Success criteria:

- Featured songs demonstrate what a polished LyricCanvas project can feel like.
- Custom projects and featured projects share the same rendering engine.

---

# Immediate Next Step

Start with Step 1 only.

The first implementation task is:

Build a single-song lyric reader with previous/current/next lines and keyboard navigation.

Do not install animation or graphics libraries yet. The first slice should prove the reading interaction before visual complexity is added.

---

# Design Principles

- Reading comes first.
- Visuals should support emotion, never distract.
- Every interaction should feel smooth.
- Beautiful defaults.
- Progressive customization.
- Entirely local and private.
- Fast loading.
- Mobile-first.
- Accessible typography.

---

# Future Ideas (Out of Scope for V1)

- Audio synchronization
- Music player integration
- Theme marketplace
- Community theme packs
- AI-assisted scene generation
- WebGPU renderer
- Collaborative editing
- Timed word-level karaoke
- Live presentation mode
