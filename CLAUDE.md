# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is an AI-native Product Management workspace designed to transform Cursor/Claude Code into a strategic PM copilot. It provides structured workflows, frameworks, and templates for product discovery, strategy, and execution - all optimized for document-centric AI collaboration.

**Language:** All content is in Korean (한국어)

**Key Philosophy:**
- Document-centric workflows (work in evolving documents, not ephemeral chats)
- Selective context (use `@` mentions to provide only relevant information)
- Structured discovery (systematic user research and opportunity mapping)
- Iterative improvement (documents that get smarter with each AI interaction)

## File Structure & Purpose

### `.mdc` Files (Markdown with Context)
These are special instructions/rules files that guide AI behavior for specific PM workflows. They use YAML frontmatter with `alwaysApply: true/false` to control when they activate.

**Key `.mdc` files by category:**

**Strategic Frameworks:**
- `company-level-context/product-vision-and-strateggy/product-strategy-review.mdc` - PRISM-aligned strategy evaluation with 5 dimensions and evidence readiness gates
- `company-level-context/product-vision-and-strateggy/product-vision-review.mdc` - Vision assessment using 4-criteria scoring (0-5 scale)
- `company-level-context/okrs/okr-sparring-partner.mdc` - Context-aware OKR coaching considering org scale and maturity

**Continuous Discovery Habits:**
- `frameworks/continuous-discovery-habits/create-interview-snapshots.mdc` - Extract structured insights from qualitative interviews
- `frameworks/continuous-discovery-habits/synthesize-interview-snapshots.mdc` - Cross-interview pattern analysis
- `frameworks/continuous-discovery-habits/create-opportunities.mdc` - Identify product opportunities from research
- `frameworks/continuous-discovery-habits/generate-solutions.mdc` - AI-assisted ideation and solution development
- `frameworks/continuous-discovery-habits/indentify-and-test-assumptions.mdc` - Assumption mapping and test planning

**Product Development:**
- `guides/product/create-prd.mdc` - Generate comprehensive PRDs through clarifying questions
- `guides/product/generate-tasks.mdc` - Break PRDs into parent tasks → subtasks (two-phase process)
- `guides/product/process-task-list.mdc` - Systematic task execution guidance

**Other Workflows:**
- `guides/meetings/1-1s.mdc` - 1-on-1 meeting structure
- `guides/writing/writing.mdc` - Writing guidelines
- `copilots/pm-strategic-copilot.mdc` - Always-on PM coaching mode (`alwaysApply: true`)

### Initiative Structure
Each product initiative follows a standardized folder structure:

```
initiatives/[initiative-name]/
├── README.md                    # Initiative overview, status, stakeholders
├── user-interviews/
│   ├── snapshots/              # Individual interview insights
│   ├── synthesis/              # Cross-interview patterns
│   └── transcripts/            # Raw interview data
├── opportunities/              # Identified opportunities and pain points
├── assumptions/                # Assumption logs and test cards
├── solutions/                  # Solution exploration and proposals
├── product-analytics/          # Data analysis and metrics
├── prd/                       # Product Requirements Documents
└── tasks/                     # Implementation task lists
```

## Common Workflows

### 1. Setting Up New Initiative
**Trigger:** User wants to start a new product initiative

**Process:**
1. Reference `@initiatives/_templates/setup-new-initiative.mdc`
2. Collect: initiative name (kebab-case), owner, brief description, timeline, stakeholders
3. Copy entire structure from `initiatives/_templates/initiative-template/`
4. Customize README.md with specifics
5. Preserve all `.gitkeep` files to maintain folder structure

### 2. User Research → Insights
**Typical flow:**
1. Raw interview transcripts → `user-interviews/transcripts/`
2. Use `@frameworks/continuous-discovery-habits/create-interview-snapshots.mdc`
   - Extracts specific behavioral stories (not generalizations)
   - Creates experience maps
   - Identifies opportunities
   - Output: `user-interviews/snapshots/snapshot-[name]-[date].md`
3. Use `@synthesize-interview-snapshots.mdc` to find cross-interview patterns

### 3. PRD Development
**Two-phase process:**
1. Use `@guides/product/create-prd.mdc`
   - AI asks clarifying questions (problem, users, success criteria)
   - Generates structured PRD with: Goals, User Stories, Functional Requirements, Non-Goals, Success Metrics
   - Target audience: Junior developers
   - Output: `prd/prd-[feature-name].md`

2. Generate tasks: `@guides/product/generate-tasks.mdc`
   - **Phase 1:** Create parent tasks, wait for user "Go"
   - **Phase 2:** Break into subtasks with relevant file paths
   - Output: `tasks/tasks-[prd-file-name].md`

### 4. Strategic Review
**For strategy documents:**
- Use `@company-level-context/product-vision-and-strateggy/product-strategy-review.mdc`
- Evidence readiness check (automatic gate: Proceed ≥ 3 core items, else Hold)
- PRISM 5-dimension scoring (0-5): Problem Diagnosis, Reframe Opportunity, Intentional Bets, Systemized Execution, Momentum
- Output prioritized improvements

**For vision statements:**
- Use `@company-level-context/product-vision-and-strateggy/product-vision-review.mdc`
- 4-criteria scoring: Lofty & Inspiring, Realistic & Attainable, Constraint-Free, Grounded in User Problem

## AI Behavior Guidelines

### Always-On Copilot Mode
`copilots/pm-strategic-copilot.mdc` is set to `alwaysApply: true`, meaning:
- Act as professional product coach and advisor
- Challenge assumptions, highlight blind spots, offer structured alternatives
- Provide multiple perspectives (strategic, operational, customer-centric, investor-focused)
- Transform unstructured notes into actionable outputs
- Coach toward world-class product thinking: clarity, prioritization, sharp market positioning
- Anticipate next needs proactively

### Tone & Style
- Professional, direct, concise, impact-focused
- Avoid generic advice - contextualize everything to the organization
- Ask clarifying questions when uncertain (don't assume)
- Prefer structured outputs (tables, frameworks, checklists)

### Quality Standards for Outputs
**Interview Snapshots:**
- Focus on specific behaviors (not opinions or intentions)
- Capture emotional moments and context details
- All stories must be concrete examples
- Experience maps must follow logical flow

**PRDs:**
- Must ask clarifying questions before drafting
- Target junior developers (explicit, unambiguous)
- Focus on "what" and "why", not "how"

**Task Lists:**
- Two-phase generation (parent → subtasks)
- Identify relevant existing files to modify
- Include test file paths where applicable

## Development Commands

**No build/test/lint commands** - This is a documentation/framework repository with no executable code.

## File Naming Conventions

- **Initiatives:** kebab-case (e.g., `mobile-app-redesign`, `candidate-magiclink`)
- **Snapshots:** `snapshot-[participant-name]-[date].md`
- **PRDs:** `prd-[feature-name].md`
- **Tasks:** `tasks-[prd-file-name].md`

## Integration Points

When working on initiatives, understand the workflow connections:
- User research → `create-interview-snapshots.mdc` → `opportunities/`
- Opportunities → `generate-solutions.mdc` → `solutions/`
- Solutions → `indentify-and-test-assumptions.mdc` → `assumptions/`
- Refined solution → `create-prd.mdc` → `prd/`
- PRD → `generate-tasks.mdc` → `tasks/`
- Tasks → `process-task-list.mdc` for systematic execution

## Special Considerations

### Evidence-Guided Approach
Many frameworks include evidence requirements. When reviewing strategy or generating PRDs, always look for:
- Recent signals (customer conversations, support tickets, competitive moves)
- Tagged risky assumptions
- Success metrics (OMTM or qualitative heuristics)
- Baseline metrics or estimation

### Context Accumulation
Documents in this workspace are meant to evolve:
- Each AI interaction should improve clarity and depth
- Previous discussions inform current context
- Build cumulative outputs (vision docs, initiative trackers, research summaries)

### Archive Management
Completed initiatives should be moved to `initiatives/99.archive/` (note the numbering prefix for sorting)

### Hold Prefix Exclusion
**IMPORTANT:** Any files or folders with the `[hold]` prefix should be completely ignored:
- Do NOT reference, read, or use content from `[hold]*` files/folders
- These represent work-in-progress or paused items that are not ready for use
- Already excluded in `.gitignore` to prevent version control tracking

## References

This workspace is inspired by:
- [Cursor isn't just for coding: how AI-native PMs work](https://maven.com/p/0a96cb) (Maven course)
- [AI Dev Tasks](https://github.com/snarktank/ai-dev-tasks) (structured workflow framework)
- [Continuous Discovery Habits](https://www.youtube.com/watch?v=9RFaz9ZBXpk) (Teresa Torres)
- [Evidence-Guided](https://www.youtube.com/watch?v=aJWSn-tz3jQ) (Itamar Gilad)
