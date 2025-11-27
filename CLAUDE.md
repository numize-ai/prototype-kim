# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **frontend-only prototype repository** for Numize, an AI-enabled data analysis platform. The repository is used for rapid prototyping and experimentation with UI/UX concepts.

**Tech Stack:**
- **Frontend**: Next.js 15 application with React 19
- **UI Components**: shadcn/ui with Radix UI and Tailwind CSS v4
- **Purpose**: Building and testing prototypes quickly

## Development Commands

### Initial Setup
```bash
# Enable corepack and install dependencies
corepack enable && corepack prepare --activate
pnpm install
```

### Running the Application
```bash
pnpm dev                         # Development with Turbopack
pnpm build                       # Production build
pnpm start                       # Production server
```

### Linting & Type Checking
```bash
pnpm lint                        # Lint and report
pnpm lint:fix                    # Lint and auto-fix
pnpm typecheck                   # TypeScript type checking
```

### Git Workflow
```bash
# Commit
pnpm commit

# Note: Git hooks will automatically run:
# - pre-commit: Prevents commits to main, runs lint-staged, typecheck, file size checks, Knip
# - commit-msg: Validates conventional commit format (supports emoji prefixes)
# - pre-push: Prevents pushes to main, runs lint and build
```

## Architecture

### Application Structure

```
src/
├── app/                        # Next.js App Router pages and layouts
│   ├── (platform)/             # Authenticated platform routes
│   ├── layout.tsx              # Root layout with metadata
│   └── providers.tsx           # Client-side providers wrapper
├── components/                 # React components
│   ├── ui/                     # Reusable UI components (shadcn/ui based)
│   ├── marketing/              # Marketing/landing page components
│   ├── digest/                 # Digest-related components
│   ├── data-sources/           # Data source components
│   └── ...                     # Other feature-specific components
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions (including shadcn utils)
├── store/                      # Redux Toolkit state management
├── services/                   # Mock data and services
├── mocks/                      # Mock data for prototyping
├── styles/                     # Global styles and Tailwind config
├── i18n/                       # Internationalization (i18next)
├── types/                      # TypeScript type definitions
└── config/                     # App configuration (site config, etc.)
```

## Key Architectural Patterns

### Next.js App Router
- Uses Next.js 15 App Router (not Pages Router)
- Pages in `src/app/` with `page.tsx`, `layout.tsx`, and `loading.tsx`
- Mark components with `"use client"` when using hooks, context, browser APIs, or event handlers
- Route groups with `(platform)` for authenticated sections

### State Management
- **Redux Toolkit** in `src/store/` for global state
- **React hooks** for local component state
- **Context API** sparingly for cross-cutting concerns
- **Mock data** in `src/mocks/` for prototyping

### Styling
- **Tailwind CSS v4** utilities as primary and only method for styling
  - Layouts, spacing, responsive design, theming
  - Mobile-first responsive design principles
- **Framer Motion** and **GSAP** for animations when needed
- **No CSS modules, styled-components, or other CSS-in-JS solutions**

### UI Components
- **shadcn/ui** components in `src/components/ui/` built with Radix UI primitives
- **Lucide React** for icons
- **Class Variance Authority (CVA)** for type-safe component variants
- Components are installed directly via shadcn CLI and customized as needed

### Type Safety
- TypeScript strict mode patterns
- Path aliases with `~` prefix (e.g., `~components/Button`, `~hooks/useAuth`)
- Define types in `src/types/` or colocate with components

### Component Placement
- **Reusable UI primitives** → `src/components/ui/` (shadcn components)
- **Feature-specific reusable** → `src/components/` (organized by feature)
- **Page-specific** → Colocate with page in `src/app/`

### Other Libraries
- **Notistack** for toast notifications
- **i18next** for internationalization
- **React Icons / Lucide** for icons

## Prototyping Best Practices

### Mock Data
- Store all mock data in `src/mocks/`
- Use realistic data structures that mirror what a real API would return
- Export typed mock data for reuse across components

### Rapid Iteration
- Focus on UI/UX experimentation over production-ready code
- Use mock data and services to simulate backend behavior
- Prioritize visual feedback and interactivity
- Experiment with different design patterns and user flows
- No need for tests - prototype and iterate quickly

### Component Development
- Build components in isolation when possible
- Use TypeScript interfaces for props
- Keep components focused and single-purpose
- Use shadcn/ui components from `src/components/ui/` as building blocks

## Quality Standards

For prototyping, focus on:
- No console errors or warnings
- TypeScript strict mode compliance
- ESLint passing (`pnpm lint`)
- Responsive design (mobile, tablet, desktop)
- Basic accessibility considerations (proper semantic HTML, ARIA labels when needed)

Note: Comprehensive testing and full WCAG compliance are not required for prototypes.

## Performance Optimization

- Dynamic imports for code splitting
- React.memo() for expensive components
- Next.js Image component for optimized images
- File size limits enforced

## Important Conventions

### Frontend Development
- **CRITICAL**: ALL frontend development work (components, pages, features, UI elements, styling) MUST be done through the `frontend-feature-builder` subagent
  - Use `Task` tool with `subagent_type=frontend-feature-builder` for any frontend implementation
  - The subagent ensures adherence to Next.js App Router patterns, TypeScript strict mode, basic accessibility standards, and all project-specific conventions
  - Tests are NOT required for prototype development

### React Components
- Never use `export default function ComponentName() {...}`
- Always use `const ComponentName: React.FC<PropsInterface> = () => {...}`
- Export as named exports

### Git Commits
- **Format**: Conventional Commits with optional emoji prefix
  - Valid: `feat: add user dashboard`, `🐛 fix: resolve navigation bug`
- **Scopes**: Use feature names or areas (e.g., `ui`, `chat`, `onboarding`)
- **Commitizen**: Use `pnpm commit` for guided commit creation
- **Hooks**: Cannot commit/push directly to `main` branch

### Package Management
- **Package manager**: pnpm with version pinned via `packageManager` field
- **Corepack**: Ensures consistent package manager versions across environments
- **No direct main commits**: All changes via feature branches and PRs

## Environment Variables

- `NEXT_PUBLIC_BUILD_ID`, `NEXT_PUBLIC_BUILD_DATE`, `NEXT_PUBLIC_BUILD_SHA`: Build metadata
- `NEXT_EXPORT_BUILD=true`: Enables static export mode
- `NEXT_STANDALONE_BUILD=true`: Enables standalone output mode

## Troubleshooting

### Build Errors
- Run `pnpm typecheck` and `pnpm lint:fix` first
- Check for missing dependencies or imports
- Verify all path aliases resolve correctly

### Dependency Issues
- Check Knip output (`pnpm knip`) for unused dependencies
- Ensure all dependencies are properly installed with `pnpm install`

### File Size Errors
- Optimize images and use dynamic imports for large components
- Consider code splitting for heavy dependencies

### Git Hooks
- **Pre-commit failing**: Address linting, type errors, or file size issues before committing
- **Commit message rejected**: Ensure format is `type(scope): description` or `emoji type(scope): description`

### Type Errors
- Ensure strict mode compliance
- Check that all component props have proper TypeScript interfaces
- Verify path aliases in `tsconfig.json` (`~` maps to `src/`)

## Useful Resources

- **Next.js Docs**: https://nextjs.org/docs
- **shadcn/ui**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Radix UI**: https://www.radix-ui.com/
