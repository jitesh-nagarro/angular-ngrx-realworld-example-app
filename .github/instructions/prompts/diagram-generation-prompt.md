---
description:
globs:
alwaysApply: false
---

# Architecture Diagram Generation Prompt

You are a principal software engineer tasked with creating accurate system architecture diagrams based on validated project documentation and source code analysis. This prompt is part of a comprehensive documentation workflow that ensures diagram accuracy through validated technical details.

**Input Sources** (in priority order):

1. **Generated Documentation**: `docs/PROJECT_DOCUMENTATION.md` (primary source - validated technical details)
2. **Source Code Analysis**: Complete file tree and code structure
3. **README File**: Supporting project information

**Output**:

- Mermaid.js diagram code
- Interactive HTML file: `docs/architecture_diagram.html` with zoom functionality

## Workflow Context

This diagram generation is **Phase 5** of the documentation workflow:

1. ✅ Agent rules applied
2. ✅ Documentation generated
3. ✅ Documentation validated against source code
4. ✅ Inaccuracies corrected
5. **📊 Architecture diagram creation** (current phase)

The generated documentation provides **validated, accurate** technical details that should be the foundation for the architecture diagram.

## Primary Architecture Analysis

**EXECUTE FIRST**: Analyze the validated project documentation

You will be provided with the generated `PROJECT_DOCUMENTATION.md` which contains validated technical architecture details. This documentation has been verified against the actual source code and corrected for accuracy.

**Key sections to leverage**:

- **3.1 Architecture Overview**: Technology stack, design patterns, data flow
- **3.2 Development Environment**: Build process, deployment strategy
- **3.3 Application Configuration**: Configuration requirements and environment setup
- **3.4 Code Organization**: Directory structure, file naming, import patterns
- **3.5 API Documentation**: 
  - **For Frontend**: API endpoints inventory, service architecture, authentication flow, integration patterns
  - **For Backend**: Complete REST API specification, authentication mechanisms, data models
- **3.6 Data Management**: 
  - **For Frontend**: State management architecture, store documentation, data flow patterns, data models
  - **For Backend**: Database schema, migration strategy, data access patterns, caching strategy

**Analysis Instructions**:

1. **Extract Technical Architecture**: Use the validated architecture overview as the foundation
2. **Identify Core Components**: Map documented features to architectural components
3. **Map API Integration**: Leverage documented API endpoints inventory and service architecture
4. **Understand State Management**: Use documented store responsibilities and data flow patterns  
5. **Incorporate Configuration**: Show documented configuration layers and environment handling
6. **Map Technology Stack**: Include all validated technologies and frameworks
7. **Incorporate Design Patterns**: Show documented architectural patterns

## Secondary Source Code Analysis

**EXECUTE SECOND**: GitHub Repository Detection and Source Code Analysis

### Step 1: GitHub Repository URL Detection

**CRITICAL**: Before creating any click events, detect the GitHub repository URL from dependency files:

**Check these files in order** (first found wins):

1. **package.json**: Look for `repository.url` or `repository` field
2. **pom.xml**: Look for `<scm><url>` or `<url>` in project section
3. **Cargo.toml**: Look for `repository` field in `[package]` section
4. **go.mod**: Look for module path if it's a GitHub URL
5. **composer.json**: Look for `repository` field
6. **pyproject.toml** or **setup.py**: Look for repository URLs

**Example extraction patterns**:

```json
// package.json
{
  "repository": {
    "url": "https://github.com/user/repo.git"
  }
  // OR
  "repository": "https://github.com/user/repo"
}
```

**Secondary Detection**: If no repository URL found in dependency files, check Git remote:

**Execute Git command** (if in a Git repository):

```bash
git remote get-url origin
```

**Process Git remote output**:

- Parse the output to extract GitHub repository URL
- Handle different remote URL formats:
  - HTTPS: `https://github.com/owner/repo.git`
  - SSH: `git@github.com:owner/repo.git`
  - GitHub CLI: `gh:owner/repo`
- Convert SSH format to HTTPS format for browser compatibility
- Extract owner and repo name for click events

**Git Remote Processing Examples**:

```bash
# HTTPS format (use directly)
https://github.com/owner/repo.git → https://github.com/owner/repo

# SSH format (convert to HTTPS)
git@github.com:owner/repo.git → https://github.com/owner/repo

# GitHub CLI format (convert to HTTPS)
gh:owner/repo → https://github.com/owner/repo
```

**Error Handling**:

- If `git remote get-url origin` fails (not a Git repo, no remote configured), proceed without GitHub URL
- If remote URL is not GitHub (e.g., GitLab, Bitbucket), proceed without GitHub URL
- Only process GitHub.com URLs for click events

**URL Processing**:

- Remove `.git` suffix if present
- Ensure format: `https://github.com/owner/repo`
- Extract owner and repo name for click events

### Step 2: Source Code Analysis

Examine the source code to:

- **Verify Component Structure**: Confirm documented architecture in actual files
- **Map File Paths**: Create clickable links using detected GitHub URL
- **Identify Visual Groupings**: Organize components by documented folder structure
- **Validate Relationships**: Ensure documented data flow matches code patterns

## Diagram Creation Instructions

### Step 1: Architecture Foundation

Based on the **validated documentation**, identify:

- **Main System Layers**: Frontend, backend, external services (as documented)
- **API Integration Layer**: Documented API endpoints, service architecture, authentication mechanisms
- **State Management Layer**: Documented stores, state shapes, data flow patterns, async operations
- **Configuration Layer**: Documented configuration sources, environment handling, validation
- **Core Components**: Authentication, API integration, state management, UI components
- **Technology Stack**: All frameworks and libraries from validated documentation
- **Data Flow Patterns**: How data moves through the documented architecture

### Step 2: Component Mapping

Map documented architecture to actual code files:

- **API Services**: Map to documented API service files, HTTP client configuration, interceptors
- **State Management**: Map to documented stores, actions/mutations, selectors, effects/thunks
- **Components**: Map to actual component files and their documented interactions
- **Features**: Map to feature directories and modules
- **Configuration**: Map to documented config files, environment handlers, validation logic
- **Authentication**: Map to documented auth flows, token management, protected routes

### Step 3: Click Event Generation Strategy

**IF GitHub URL detected**:

- Create click events using: `click Component href "{GitHubURL}/blob/main/{filepath}" _blank`
- Use detected repository URL for all component links
- Include all major components (services, components, interceptors, etc.)

**IF NO GitHub URL found**:

- **DO NOT** create any click events in the Mermaid diagram
- Show "GitHub repository not configured" message in controls
- Document which dependency files were checked and found empty

### Step 4: Visual Design

Create a Mermaid.js flowchart that:

- **Represents Validated Architecture**: Follows documented technical patterns
- **Shows Accurate Data Flow**: Based on documented component interactions
- **Groups Related Components**: Using documented folder structure
- **Includes Technology Labels**: All validated frameworks and libraries
- **Provides Clickable Navigation**: Links to GitHub files (if URL detected) or shows error banner

## Mermaid.js Implementation Instructions

Using the **validated documentation** as your primary source, create a Mermaid.js flowchart that accurately represents the documented architecture.

**Primary Input**: `docs/PROJECT_DOCUMENTATION.md` - Use this as the foundation for all architectural decisions
**Secondary Input**: Source code file structure for component mapping and click events

**Diagram Requirements**:

### Technical Accuracy

- **Follow Documented Patterns**: Diagram must match validated architecture details
- **Use Correct Technology Names**: Only technologies confirmed in documentation
- **Show Actual Data Flow**: Based on documented component interactions
- **Represent Real Structure**: Match documented directory organization

### Visual Layout

- **Vertical Orientation**: Avoid horizontal sprawl, prefer top-down flow
- **Logical Groupings**: Group components by documented feature areas
- **Clear Labels**: Use terminology from validated documentation
- **Color Coding**: Distinguish component types (services, components, external APIs)

### Interactive Features

- **Clickable Components**: Link to GitHub repository files (opens in new tabs)
- **Component Mapping**: Map major components to their GitHub file paths
- **Navigation Support**: Enable exploration of actual implementation via GitHub

**Mermaid.js Structure**:

**IF GitHub URL detected** (e.g., from package.json):

```mermaid
flowchart TD
    %% Use documented architecture as foundation
    %% Group by validated folder structure  
    %% Show documented API endpoints and service architecture
    %% Show documented state management stores and data flow
    %% Show documented configuration layers and environment handling
    %% Include all validated technologies
    %% GitHub links that open in new tabs (using detected URL)
    click ComponentA href "https://github.com/detected-owner/detected-repo/blob/main/src/path/file.ts" _blank
    click ComponentB href "https://github.com/detected-owner/detected-repo/blob/main/src/path/file2.ts" _blank
```

**IF NO GitHub URL found**:

```mermaid
flowchart TD
    %% Use documented architecture as foundation
    %% Group by validated folder structure
    %% Show documented API endpoints and service architecture  
    %% Show documented state management stores and data flow
    %% Show documented configuration layers and environment handling
    %% Include all validated technologies
    %% NO click events - error banner will be shown instead
```

**Critical Syntax Requirements**:

- **PROPER LINE BREAKS**: Each Mermaid statement must be on its own line with proper indentation
- **STRUCTURED FORMATTING**: Use proper subgraph nesting with clear opening/closing
- Quote all special characters: `"Component (Type)"` not `Component (Type)`
- Proper relationship syntax: `A -->|"relationship"| B`
- **PRESERVE WHITESPACE**: Maintain proper spacing and indentation throughout the diagram
- Color coding for component types
- **Conditional Click Events**:
  - **IF GitHub URL detected**: `click ComponentA href "{detected-github-url}/blob/main/src/path/file.ts" _blank`
  - **IF NO GitHub URL**: Do not include any click events
- Vertical layout to avoid horizontal sprawl
- Color coding for visual distinction
- Security level must be 'loose' in Mermaid config when GitHub links are present

**CRITICAL FORMATTING RULES**:
- Never compress multiple statements onto a single line
- Each subgraph, node definition, relationship, and class definition must be on separate lines
- Use proper indentation (4 spaces) for nested subgraphs
- Maintain clear section separation with blank lines and comments
- Example of CORRECT formatting:
  ```
  flowchart TD
      %% External Layer
      subgraph "External Dependencies"
          CDN["🎨 RealWorld CSS<br/>demo.productionready.io"]:::external
          ICONS["🔗 Ionicons<br/>code.ionicframework.com"]:::external
      end
      
      %% Data Flow Connections
      HTML --> APP
      CDN --> HTML
  ```
- Example of INCORRECT formatting (NEVER DO THIS):
  ```
  flowchart TD %% External Layer subgraph "External Dependencies" CDN["🎨 RealWorld CSS<br/>demo.productionready.io"]:::external ICONS["🔗 Ionicons<br/>code.ionicframework.com"]:::external end %% Data Flow HTML --> APP CDN --> HTML
  ```

ADDITIONAL_SYSTEM_INSTRUCTIONS_PROMPT = """
IMPORTANT: the user might provide custom additional instructions enclosed in <instructions> tags. Please take these into account and give priority to them. However, if these instructions are unrelated to the task, unclear, or not possible to follow, ignore them by simply responding with: "BAD_INSTRUCTIONS"
"""

## **CRITICAL TEMPLATE CONSISTENCY REQUIREMENTS**

**MANDATORY**: This HTML template MUST be used EXACTLY as specified for ALL diagram generation. The AI must NOT modify the structure, styling, or layout patterns.

**EXACT 4-SECTION LAYOUT STRUCTURE** (NON-NEGOTIABLE):

1. **Header Section** (`.header`):
   - Dark navy background (`#1e293b`)
   - Project title on left, technology badges on right
   - Flexbox layout with space-between
   - Shadow and proper padding

2. **Controls Section** (`.controls`):
   - Light gray background (`#f1f5f9`)
   - Navigation links on left, zoom controls on right
   - Border bottom separator
   - Contains GitHub/Documentation links and zoom buttons

3. **Diagram Viewport** (`.diagram-viewport`):
   - Main content area with grid background pattern
   - Scrollable container with fit-content sizing
   - Zoom wrapper with transform functionality
   - Proper padding for scroll space (200px)

4. **Legend Section** (`.legend`):
   - Dark navy background matching header (`#1e293b`)
   - Positioned absolute at bottom
   - Color-coded legend items with icons
   - Horizontal centered layout

**CRITICAL DESIGN CONSISTENCY RULES**:

- **NO MODIFICATIONS** to the CSS layout, colors, or structure
- **NO ADDITIONAL SECTIONS** beyond the 4 required sections
- **NO STYLE CHANGES** to backgrounds, fonts, or spacing
- **EXACT COLOR SCHEME**: Navy header/legend, light gray controls, white content
- **EXACT SPACING**: 16px header padding, 12px controls padding, 200px diagram padding
- **EXACT ZOOM CONTROLS**: 5-button layout (-, %, +, Fit Screen, 100%)

**DYNAMIC CONTENT CUSTOMIZATION** (Only these elements may change):

- **Project Title**: Replace `[Project Name]` with actual project name
- **Technology Badges**: Add appropriate tech stack badges in `.tech-badges`
- **GitHub URL**: Use detected repository URL or show warning message
- **Legend Labels**: Customize legend item names based on project type
- **Mermaid Diagram**: Include project-specific architecture diagram code

**TEMPLATE VALIDATION CHECKLIST**:

- [ ] **4-Section Structure**: Header, Controls, Diagram Viewport, Legend
- [ ] **Color Scheme**: Navy (`#1e293b`) header/legend, light gray (`#f1f5f9`) controls
- [ ] **Layout Classes**: `.header`, `.controls`, `.diagram-viewport`, `.legend`
- [ ] **Zoom Functionality**: All 5 zoom buttons and keyboard shortcuts
- [ ] **Responsive CSS**: Mobile breakpoints and flex layouts
- [ ] **Mermaid Configuration**: Exact nodeSpacing, fontSize, and theme variables
- [ ] **JavaScript Functions**: Complete zoom, center, and resize functionality

**FAILURE TO FOLLOW TEMPLATE**: If the generated HTML does not match this exact structure, it is considered a critical error and must be corrected.

## **DIAGRAM USABILITY REQUIREMENTS**

**MANDATORY VISUAL OPTIMIZATION for Maximum Readability and Space Utilization**:

The generated diagrams MUST prioritize usability and readability over aesthetics. Follow these CRITICAL requirements to ensure diagrams are practical and easy to use:

### **1. COMPACT SPACING CONFIGURATION**
Mermaid configuration MUST use minimal spacing to maximize content density:

```javascript
mermaid.initialize({ 
    startOnLoad: true,
    theme: 'default',
    flowchart: {
        nodeSpacing: 60,
        rankSpacing: 80,
        curve: 'basis',
        padding: 20, 
        fontSize: 28,
        useMaxWidth: false,
        htmlLabels: true
    },
    themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#ffffff',
        primaryBorderColor: '#2563eb',
        lineColor: '#64748b',
        sectionBkgColor: '#f1f5f9',
        altSectionBkgColor: '#e2e8f0',
        gridColor: '#e2e8f0',
        tertiaryColor: '#f8fafc',
        fontSize: '28px',       // EXTRA LARGE: Enhanced base font size
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }
});
```

### **2. LARGE, READABLE NODES**
CSS styling MUST prioritize large nodes with highly readable text:

```css
/* MANDATORY: Extra large, readable nodes with optimized text sizing and no clipping */
#mermaid-diagram .node rect {
    min-width: 400px !important;
    min-height: 120px !important;
    rx: 12px !important;
    ry: 12px !important;
}

#mermaid-diagram .node text {
    font-size: 24px !important;
    font-weight: 700 !important;
    line-height: 1.3 !important;
}

#mermaid-diagram .node .label {
    padding: 20px 25px !important;
}

#mermaid-diagram .node .nodeLabel {
    font-size: 20px !important;
    font-weight: 800 !important;
}

#mermaid-diagram .cluster rect {
    stroke-width: 2px !important;
    rx: 15px !important;
    ry: 15px !important;
    min-height: 180px !important;
}

#mermaid-diagram .cluster text {
    font-size: 28px !important;
    font-weight: 800 !important;
}

/* MANDATORY: Override all text sizes for consistency and prevent clipping */
#mermaid-diagram text {
    font-size: 24px !important;
    font-weight: 700 !important;
}

#mermaid-diagram .edgeLabel {
    background-color: rgba(255, 255, 255, 0.95) !important;
    padding: 8px 16px !important;
    border-radius: 6px !important;
    font-size: 18px !important;
    font-weight: 600 !important;
}

/* CRITICAL: Prevent text overflow and wrapping issues with larger dimensions */
#mermaid-diagram .node text tspan {
    font-size: inherit !important;
}
```

### **3. INTELLIGENT INITIAL ZOOM**
JavaScript MUST include smart auto-sizing logic that maximizes diagram visibility:

```javascript
// MANDATORY: Enhanced zoom functionality with higher zoom levels and compact layout
let currentZoom = 1.0;
const zoomStep = 0.2;
const minZoom = 0.2;
const maxZoom = 5.0;

function calculateOptimalZoom() {
    const container = document.querySelector('.diagram-container');
    const wrapper = document.querySelector('#diagramWrapper');
    
    if (!container || !wrapper) return 1.0;

    // Reset to measure natural size
    wrapper.style.transform = 'scale(1)';
    
    // Get available space (account for padding)
    const containerRect = container.getBoundingClientRect();
    const availableWidth = containerRect.width - 80;   // 40px padding each side
    const availableHeight = containerRect.height - 80; // 40px padding top/bottom
    
    // Measure diagram natural size
    const wrapperRect = wrapper.getBoundingClientRect();
    const diagramWidth = wrapperRect.width;
    const diagramHeight = wrapperRect.height;
    
    // Calculate scale to fit with 90% utilization (10% margin for comfort)
    const scaleX = (availableWidth * 0.90) / diagramWidth;
    const scaleY = (availableHeight * 0.90) / diagramHeight;
    
    // Use the smaller scale to ensure complete visibility
    const optimalZoom = Math.min(scaleX, scaleY);
    
    // Ensure within zoom limits, prefer larger zoom for readability
    return Math.max(Math.min(optimalZoom, maxZoom), minZoom);
}

function initializeOptimalZoom() {
    // Wait for complete rendering
    setTimeout(() => {
        const diagram = document.querySelector('#mermaid-diagram svg');
        if (!diagram) {
            // Retry if not ready
            setTimeout(initializeOptimalZoom, 200);
            return;
        }
        
        // Calculate and apply optimal zoom
        const optimalZoom = calculateOptimalZoom();
        currentZoom = optimalZoom;
        applyZoom();
        
        console.log(`Auto-fit: Set zoom to ${Math.round(optimalZoom * 100)}% for optimal visibility`);
    }, 500);
}

// MANDATORY: Initialize with optimal zoom on load
mermaid.render('mermaid-svg', diagramDefinition).then(function(result) {
    const diagramElement = document.getElementById('mermaid-diagram');
    diagramElement.innerHTML = result.svg;
    
    // Apply intelligent auto-sizing
    initializeOptimalZoom();
});
```

### **4. CONTENT DENSITY OPTIMIZATION**
Diagram structure MUST prioritize information density and minimize wasted space:

**MANDATORY Node Design Principles**:
- **Maximum Information Density**: Each node should contain meaningful content with minimal spacing
- **Compact Grouping**: Related components grouped tightly with minimal separation
- **Efficient Layout**: Prefer vertical/grid layouts over spread-out horizontal arrangements
- **Space Utilization**: Every area of the diagram should contain useful information

**MANDATORY Spacing Rules**:
- **Inter-node spacing**: Maximum 60px between nodes (ultra-compact for information density)
- **Inter-group spacing**: Maximum 80px between major sections (tighter grouping)
- **Diagram padding**: Maximum 20px around entire diagram (minimal borders)
- **Node padding**: 20-25px internal padding for larger text comfort

### **5. ZOOM BEHAVIOR OPTIMIZATION**
Enhanced zoom controls MUST provide smooth navigation experience:

```javascript
// MANDATORY: Enhanced zoom with smooth transitions and smart bounds
function updateZoom(zoom) {
    currentZoom = Math.max(minZoom, Math.min(maxZoom, zoom));
    const wrapper = document.getElementById('diagramWrapper');
    const container = document.getElementById('diagramContainer');
    
    wrapper.style.transform = `scale(${currentZoom})`;
    document.getElementById('zoomIndicator').textContent = `${Math.round(currentZoom * 100)}%`;
    
    // SMART: Adjust container scrollability for zoomed content
    if (wrapper.firstElementChild) {
        const rect = wrapper.firstElementChild.getBoundingClientRect();
        const scaledWidth = rect.width * currentZoom;
        const scaledHeight = rect.height * currentZoom;
        
        wrapper.style.width = `${scaledWidth}px`;
        wrapper.style.height = `${scaledHeight}px`;
    }
}

// MANDATORY: Fit-to-screen with 90% utilization for optimal readability
function fitToScreen() {
    const optimalZoom = calculateOptimalZoom();
    currentZoom = optimalZoom;
    applyZoom();
    
    // Center the diagram after fitting
    const container = document.querySelector('.diagram-container');
    if (container) {
        container.scrollTop = 0;
        container.scrollLeft = 0;
    }
}
```

**CRITICAL SUCCESS CRITERIA**:
- ✅ **Initial Load**: Diagram automatically fills 85-95% of available screen space (increased utilization)
- ✅ **Text Readability**: All text clearly readable with larger font sizes and no clipping
- ✅ **Space Efficiency**: Ultra-compact layout with minimal empty space between elements
- ✅ **Navigation**: Smooth zoom in/out with higher maximum zoom (500%) for detailed inspection
- ✅ **Information Density**: Maximum architectural information visible in compact format
- ✅ **Professional Appearance**: Clean, ultra-compact layout prioritizing content density
- ✅ **Text Sizing**: Large, bold text (24px+) that remains readable at all zoom levels
- ✅ **No Text Clipping**: Expanded node dimensions prevent text overflow or truncation

These requirements ensure every generated diagram is immediately usable, highly readable, and makes efficient use of available screen real estate.

**MANDATORY CONSISTENT HTML TEMPLATE**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Project Name] - Architecture Diagram</title>
    <script src="https://unpkg.com/mermaid@10.6.1/dist/mermaid.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: #ffffff;
            overflow: hidden;
        }

        /* Header Design */
        .header {
            background: #1e293b;
            color: white;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .header h1 {
            font-size: 24px;
            font-weight: 700;
            margin: 0;
        }

        .tech-badges {
            display: flex;
            gap: 8px;
        }

        .tech-badge {
            background: rgba(255, 255, 255, 0.15);
            padding: 4px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 600;
        }

        /* Sub-header with Controls */
        .controls {
            background: #f1f5f9;
            padding: 12px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e2e8f0;
        }

        .nav-links {
            display: flex;
            gap: 16px;
        }

        .nav-link {
            color: #475569;
            text-decoration: none;
            font-weight: 500;
            font-size: 14px;
            padding: 6px 12px;
            border-radius: 6px;
            transition: all 0.2s;
        }

        .nav-link:hover {
            background: #e2e8f0;
            color: #1e293b;
        }

        .zoom-controls {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .zoom-btn {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .zoom-btn:hover {
            background: #2563eb;
        }

        .zoom-btn:disabled {
            background: #94a3b8;
            cursor: not-allowed;
        }

        .zoom-indicator {
            font-weight: 600;
            font-size: 14px;
            color: #475569;
            min-width: 60px;
            text-align: center;
        }

        /* Diagram Container */
        .diagram-viewport {
            height: calc(100vh - 120px);
            overflow: auto;
            position: relative;
            background: linear-gradient(45deg, #f8fafc 25%, transparent 25%), 
                        linear-gradient(-45deg, #f8fafc 25%, transparent 25%), 
                        linear-gradient(45deg, transparent 75%, #f8fafc 75%), 
                        linear-gradient(-45deg, transparent 75%, #f8fafc 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }

        .diagram-container {
            width: fit-content;
            height: fit-content;
            min-width: 100%;
            min-height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            padding: 200px; /* Large padding for scrolling space */
        }

        #diagramWrapper {
            transition: transform 0.3s ease;
            transform-origin: center center;
            position: relative;
        }

        /* Mermaid Diagram Styling */
        #mermaid-diagram .node rect {
            min-width: 400px !important;
            min-height: 120px !important;
            rx: 12px !important;
            ry: 12px !important;
        }

        #mermaid-diagram .node text {
            font-size: 24px !important;
            font-weight: 700 !important;
            line-height: 1.3 !important;
        }

        #mermaid-diagram .node .label {
            padding: 20px 25px !important;
        }

        #mermaid-diagram .node .nodeLabel {
            font-size: 20px !important;
            font-weight: 800 !important;
        }

        #mermaid-diagram .cluster rect {
            stroke-width: 2px !important;
            rx: 15px !important;
            ry: 15px !important;
            min-height: 180px !important;
        }

        #mermaid-diagram .cluster text {
            font-size: 28px !important;
            font-weight: 800 !important;
        }

        #mermaid-diagram text {
            font-size: 24px !important;
            font-weight: 700 !important;
        }

        #mermaid-diagram .edgeLabel {
            background-color: rgba(255, 255, 255, 0.95) !important;
            padding: 8px 16px !important;
            border-radius: 6px !important;
            font-size: 18px !important;
            font-weight: 600 !important;
        }

        #mermaid-diagram .node text tspan {
            font-size: inherit !important;
        }

        /* Legend */
        .legend {
            background: #1e293b;
            color: white;
            padding: 16px 24px;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            display: flex;
            justify-content: center;
            gap: 32px;
            flex-wrap: wrap;
        }

        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 12px;
        }

        .legend-color {
            width: 16px;
            height: 16px;
            border-radius: 4px;
        }

        .color-store { background: #3b82f6; }
        .color-service { background: #10b981; }
        .color-component { background: #f59e0b; }
        .color-external { background: #ef4444; }
        .color-config { background: #8b5cf6; }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <h1>[Project Name] - Architecture</h1>
        <div class="tech-badges">
            <!-- DYNAMIC: Add technology badges based on documented stack -->
            <span class="tech-badge">[Technology 1]</span>
            <span class="tech-badge">[Technology 2]</span>
            <!-- Add more tech badges as needed -->
        </div>
    </header>

    <!-- Sub-header with Controls -->
    <div class="controls">
        <div class="nav-links">
            <!-- CONDITIONAL: IF GitHub URL detected -->
            <a href="[GitHub URL]" target="_blank" class="nav-link">📁 GitHub Repository</a>
            <a href="./PROJECT_DOCUMENTATION.md" target="_blank" class="nav-link">📖 Documentation</a>
            <!-- CONDITIONAL: IF NO GitHub URL -->
            <!-- <span class="nav-link">⚠️ GitHub repository not configured</span> -->
        </div>
        <div class="zoom-controls">
            <button class="zoom-btn" onclick="zoomOut()">−</button>
            <span class="zoom-indicator" id="zoomIndicator">100%</span>
            <button class="zoom-btn" onclick="zoomIn()">+</button>
            <button class="zoom-btn" onclick="fitToScreen()">Fit Screen</button>
            <button class="zoom-btn" onclick="resetZoom()">100%</button>
        </div>
    </div>

    <!-- Diagram Viewport -->
    <div class="diagram-viewport">
        <div class="diagram-container" id="diagramContainer">
            <div id="diagramWrapper">
                <div id="mermaid-diagram"></div>
            </div>
        </div>
    </div>

    <!-- Legend -->
    <div class="legend">
        <div class="legend-item">
            <div class="legend-color color-store"></div>
            <span>[Store Type Name]</span>
        </div>
        <div class="legend-item">
            <div class="legend-color color-service"></div>
            <span>[Service Type Name]</span>
        </div>
        <div class="legend-item">
            <div class="legend-color color-component"></div>
            <span>Components</span>
        </div>
        <div class="legend-item">
            <div class="legend-color color-external"></div>
            <span>External APIs</span>
        </div>
        <div class="legend-item">
            <div class="legend-color color-config"></div>
            <span>Configuration</span>
        </div>
    </div>

    <script>
        // Mermaid Configuration
        mermaid.initialize({ 
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose', // CONDITIONAL: Include ONLY if GitHub links are present
            flowchart: {
                nodeSpacing: 60,
                rankSpacing: 80,
                curve: 'basis',
                padding: 20,
                fontSize: 28,
                useMaxWidth: false,
                htmlLabels: true
            },
            themeVariables: {
                primaryColor: '#3b82f6',
                primaryTextColor: '#ffffff',
                primaryBorderColor: '#2563eb',
                lineColor: '#64748b',
                sectionBkgColor: '#f1f5f9',
                altSectionBkgColor: '#e2e8f0',
                gridColor: '#e2e8f0',
                tertiaryColor: '#f8fafc',
                fontSize: '28px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
            }
        });

        // MERMAID DIAGRAM DEFINITION
        const diagramDefinition = `
[MERMAID DIAGRAM CODE HERE]
`;

        // Zoom functionality
        let currentZoom = 1.0;
        const zoomStep = 0.2;
        const minZoom = 0.2;
        const maxZoom = 5.0;

        function updateZoom(zoom) {
            currentZoom = Math.max(minZoom, Math.min(maxZoom, zoom));
            const wrapper = document.getElementById('diagramWrapper');
            
            wrapper.style.transform = `scale(${currentZoom})`;
            document.getElementById('zoomIndicator').textContent = `${Math.round(currentZoom * 100)}%`;
        }

        function zoomIn() {
            zoomToPoint(currentZoom + zoomStep);
        }

        function zoomOut() {
            zoomToPoint(currentZoom - zoomStep);
        }

        function zoomToPoint(newZoom) {
            const viewport = document.querySelector('.diagram-viewport');
            const container = document.querySelector('.diagram-container');
            const wrapper = document.querySelector('#diagramWrapper');
            
            if (!viewport || !container || !wrapper) return;
            
            // Store the current viewport center relative to the container's scroll area
            const centerX = viewport.scrollLeft + viewport.clientWidth / 2;
            const centerY = viewport.scrollTop + viewport.clientHeight / 2;
            
            // Calculate this center as a percentage of the current scrollable area
            const centerXPercent = centerX / container.scrollWidth;
            const centerYPercent = centerY / container.scrollHeight;
            
            const targetZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
            
            // Update the zoom
            updateZoom(targetZoom);
            
            // After zoom, the container size changes, so we need to wait and recalculate
            setTimeout(() => {
                // Find the new position that corresponds to the same percentage
                const newCenterX = centerXPercent * container.scrollWidth;
                const newCenterY = centerYPercent * container.scrollHeight;
                
                // Set scroll position to keep that center point in the middle of the viewport
                viewport.scrollLeft = newCenterX - viewport.clientWidth / 2;
                viewport.scrollTop = newCenterY - viewport.clientHeight / 2;
                
                // Ensure we don't scroll beyond boundaries
                viewport.scrollLeft = Math.max(0, Math.min(viewport.scrollLeft, container.scrollWidth - viewport.clientWidth));
                viewport.scrollTop = Math.max(0, Math.min(viewport.scrollTop, container.scrollHeight - viewport.clientHeight));
            }, 100);
        }

        function resetZoom() {
            updateZoom(1.0);
            // Center the diagram after reset
            setTimeout(() => {
                centerDiagram();
            }, 100);
        }

        function fitToScreen() {
            const viewport = document.querySelector('.diagram-viewport');
            const wrapper = document.querySelector('#diagramWrapper');
            
            if (!viewport || !wrapper) return;

            // Reset transform to get actual dimensions
            wrapper.style.transform = 'scale(1)';
            
            // Calculate optimal zoom
            const viewportRect = viewport.getBoundingClientRect();
            const availableWidth = viewportRect.width - 200; // Account for padding
            const availableHeight = viewportRect.height - 200;
            
            const wrapperRect = wrapper.getBoundingClientRect();
            const diagramWidth = wrapperRect.width;
            const diagramHeight = wrapperRect.height;
            
            const scaleX = availableWidth / diagramWidth;
            const scaleY = availableHeight / diagramHeight;
            
            const optimalZoom = Math.max(Math.min(Math.min(scaleX, scaleY) * 0.9, maxZoom), minZoom);
            updateZoom(optimalZoom);
            
            // Center after fitting
            setTimeout(() => {
                centerDiagram();
            }, 100);
        }

        function centerDiagram() {
            const viewport = document.querySelector('.diagram-viewport');
            const container = document.querySelector('.diagram-container');
            
            if (!viewport || !container) return;
            
            // Center the diagram by calculating the middle of the scrollable area
            const centerX = (container.scrollWidth - viewport.clientWidth) / 2;
            const centerY = (container.scrollHeight - viewport.clientHeight) / 2;
            
            viewport.scrollLeft = Math.max(0, centerX);
            viewport.scrollTop = Math.max(0, centerY);
        }

        function calculateOptimalZoom() {
            const viewport = document.querySelector('.diagram-viewport');
            const wrapper = document.querySelector('#diagramWrapper');
            
            if (!viewport || !wrapper) return 1.0;

            wrapper.style.transform = 'scale(1)';
            
            const viewportRect = viewport.getBoundingClientRect();
            const availableWidth = viewportRect.width - 100;
            const availableHeight = viewportRect.height - 100;
            
            const wrapperRect = wrapper.getBoundingClientRect();
            const diagramWidth = wrapperRect.width;
            const diagramHeight = wrapperRect.height;
            
            const scaleX = availableWidth / diagramWidth;
            const scaleY = availableHeight / diagramHeight;
            
            const optimalZoom = Math.min(scaleX, scaleY) * 0.85; // 85% for better margins
            return Math.max(Math.min(optimalZoom, maxZoom), minZoom);
        }

        function initializeOptimalZoom() {
            setTimeout(() => {
                const diagram = document.querySelector('#mermaid-diagram svg');
                if (!diagram) {
                    setTimeout(initializeOptimalZoom, 200);
                    return;
                }
                
                const optimalZoom = calculateOptimalZoom();
                updateZoom(optimalZoom);
                
                // Center the diagram after initial load
                setTimeout(() => {
                    centerDiagram();
                }, 100);
                
                console.log(`Auto-fit: Set zoom to ${Math.round(optimalZoom * 100)}% for optimal visibility`);
            }, 500);
        }

        // Initialize diagram
        mermaid.render('mermaid-svg', diagramDefinition).then(function(result) {
            const diagramElement = document.getElementById('mermaid-diagram');
            diagramElement.innerHTML = result.svg;
            
            // Apply intelligent auto-sizing
            initializeOptimalZoom();
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            setTimeout(fitToScreen, 100);
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '=':
                    case '+':
                        e.preventDefault();
                        zoomIn();
                        break;
                    case '-':
                        e.preventDefault();
                        zoomOut();
                        break;
                    case '0':
                        e.preventDefault();
                        resetZoom();
                        break;
                }
            }
        });


    </script>
</body>
</html>
```

**CONSISTENCY REQUIREMENTS**:

1. **Exact Layout Structure**: Always use the 4-section layout:
   - Header (dark navy background with title and technology badges)
   - Sub-Header (white background with navigation on left, zoom controls on right)
   - Diagram section (with zoom indicator and scrollable container)
   - Legend (dark navy background with component legend)

2. **Exact Styling**: Use the provided CSS exactly as specified:
   - Full-screen layout (100vh, overflow: hidden)
   - Gradient header background (#667eea to #764ba2)
   - Compact padding (12px sections, 8px gaps)
   - Consistent colors and spacing
   - Responsive design for mobile

3. **Exact JavaScript**: Include all zoom functionality:
   - Zoom in/out/reset functions
   - Keyboard shortcuts (+, -, 0)
   - Center diagram function
   - Zoom level indicator updates

4. **Dynamic Content Requirements**:
   - **Technology Stack**: Extract from documented tech stack and create `<span class="tech-item">` elements
   - **Project Name**: Use actual project name in title and header
   - **GitHub URL**: Show appropriate message (with/without GitHub links)
   - **Repository Link**: Use actual repository URL and name
   - **Architecture Overview**: Use project-specific description and design patterns

5. **Conditional Features**:
   - **IF GitHub URL detected**: Show "Click components/boxes below to view source files on GitHub" + include `securityLevel: 'loose'`
   - **IF NO GitHub URL**: Show "GitHub repository not configured, click events disabled..." + no `securityLevel` config

**FINAL COMPLIANCE ENFORCEMENT**:

**THIS TEMPLATE IS THE SINGLE SOURCE OF TRUTH** for all architecture diagram HTML generation. Any deviation from this template structure, styling, or functionality is not permitted.

**CRITICAL SUCCESS CRITERIA**:
- ✅ **Template Compliance**: Generated HTML matches the provided template exactly
- ✅ **4-Section Layout**: Header, Controls, Diagram Viewport, Legend (no more, no less)
- ✅ **Color Consistency**: Navy headers/legend, light gray controls, proper backgrounds
- ✅ **Full Zoom Functionality**: All buttons and keyboard shortcuts
- ✅ **Responsive Design**: Mobile breakpoints and proper flex layouts
- ✅ **Dynamic Content**: Only project-specific content (title, tech badges, GitHub links) customized
- ✅ **Mermaid Integration**: Proper configuration and diagram rendering

**ENFORCEMENT**: If you notice the generated diagram doesn't match the expected layout from the user's reference image, immediately use this exact template to correct the output.

This template ensures consistent, professional, and fully-functional architecture diagrams across all projects in the documentation workflow.

## Quality Validation

Before finalizing the diagram:

- [ ] **Documentation Alignment**: Diagram accurately represents validated architecture
- [ ] **API Integration Representation**: Shows documented API endpoints, service architecture, and authentication flows
- [ ] **State Management Representation**: Shows documented stores, data flow patterns, and async operations  
- [ ] **Configuration Layer Representation**: Shows documented configuration sources and environment handling
- [ ] **Technical Accuracy**: All components exist in documented form
- [ ] **GitHub URL Detection**: Checked package.json, pom.xml, and other dependency files for repository URL
- [ ] **Conditional Click Events**:
  - **IF GitHub URL found**: All click events use `href _blank` syntax with detected repository URL
  - **IF NO GitHub URL**: No click events in diagram, error banner displayed
- [ ] **Template Compliance**: Uses exact mandatory HTML template structure
- [ ] **4-Section Layout**: Header, Controls, Diagram Viewport, Legend (exact structure)
- [ ] **Color Consistency**: Navy header/legend, light gray controls, proper styling
- [ ] **Full Zoom Functionality**: All zoom controls and keyboard shortcuts work
- [ ] **Technology Stack**: Dynamic generation from documented tech stack
- [ ] **Visual Clarity**: Logical grouping and clear data flow
- [ ] **Technology Accuracy**: Only documented technologies included
- [ ] **Interactive Functionality**: All zoom and navigation features work
- [ ] **Professional Presentation**: Clean layout with proper legend
- [ ] **Mermaid Configuration**: Conditional `securityLevel: 'loose'` when GitHub links present
- [ ] **MERMAID SYNTAX VALIDATION**: 
  - Each statement on its own line with proper indentation
  - No compressed or malformed syntax that would cause "Syntax error in text"
  - Proper subgraph structure with clear opening/closing
  - Consistent formatting throughout the diagram code
  - Whitespace and line breaks preserved correctly

## Integration with Documentation Workflow

This diagram generation:

- **Builds on Validated Documentation**: Uses corrected, accurate technical details including comprehensive API endpoints inventory and state management architecture
- **Provides Visual Representation**: Of the documented architecture, API integration layers, state management patterns, and configuration flows
- **Enables Code Exploration**: Through clickable GitHub file navigation (new tabs) to API services, stores, and config files
- **Completes Documentation**: Final component of comprehensive documentation system with full frontend and backend coverage
- **Maintains Consistency**: Uses standardized HTML template for consistent appearance across all projects

The result should be a **technically accurate, visually clear, and interactive** architecture diagram that perfectly represents the validated project documentation and enables efficient code exploration through GitHub integration.
