# Angular NgRx NX RealWorld Example App Documentation

## 1. Project Overview

**Purpose**: A fully-featured social blogging platform (Medium.com clone) called "Conduit" that demonstrates real-world Angular development patterns with modern frameworks and best practices.

**Domain**: Social media/blogging platform for content creators and readers

**Target Users**: 
- Content creators who want to publish and manage articles
- Readers who want to discover, follow, and engage with content
- Developers learning modern Angular, NgRx, and Nx patterns

**Core Value Proposition**: Provides a complete reference implementation showcasing cutting-edge Angular features, state management with NgRx Signal Store, and monorepo architecture with Nx.

## 2. Functional Documentation

### 2.1 Feature Inventory

**Authentication & User Management**
- User role: All users
- Primary use case: Account creation, login/logout, profile management
- Key user flows: Register → Email verification → Login → Profile setup

**Article Management**
- User role: Authenticated users
- Primary use case: Create, edit, publish, and delete articles
- Key user flows: Login → Create article → Add content → Publish → View/Edit/Delete

**Content Discovery**
- User role: All users (authenticated and anonymous)
- Primary use case: Browse and filter articles by tags, author, or popularity
- Key user flows: Browse homepage → Filter by tags → View article → Read comments

**Social Features**
- User role: Authenticated users
- Primary use case: Follow other users, favorite articles, comment on articles
- Key user flows: View article → Follow author → Favorite article → Add comment

**Content Interaction**
- User role: Authenticated users
- Primary use case: Engage with content through comments and favorites
- Key user flows: Read article → Leave comment → Favorite for later → Follow author

### 2.2 User Journey Maps

**Authentication Flow**:
1. New user visits app → Registration page → Create account → Email verification → Login
2. Returning user → Login page → Enter credentials → Dashboard/Homepage

**Core Content Workflow**:
1. User logs in → Homepage with article feed → Browse by Global/Personal/Tags
2. Create content → Editor → Write article → Add tags → Publish
3. Engage → Read articles → Comment → Favorite → Follow authors

**Content Discovery Journey**:
1. Anonymous/authenticated user → Homepage → Browse global feed
2. Filter by tags → Click on articles → Read content → (Optional) Sign up to engage

### 2.3 Business Logic Rules

**Content Validation**:
- Articles require title and body content
- Article slugs are auto-generated and must be unique
- Tags are optional but recommended for discoverability

**User Permissions**:
- Anonymous users: Read articles and comments only
- Authenticated users: Full CRUD on own content, comment on any article
- Authors can edit/delete their own articles and comments only

**Social Interaction Rules**:
- Users cannot follow themselves
- Users cannot favorite their own articles
- Comment deletion only available to comment author
- Article deletion only available to article author

**Data Constraints**:
- User email addresses must be unique
- Article slugs are automatically generated from titles
- JWT tokens required for all authenticated operations
- Cookie-based authentication with automatic token refresh

## 3. Technical Documentation

### 3.1 Architecture Overview

**Technology Stack**:
- Angular 20.0.3 with Zoneless change detection
- TypeScript 5.8.3
- NgRx Signals Store 20.0.0-beta.0 for state management
- Nx 21.2.3 monorepo workspace
- Jest 29.7.0 for unit testing
- Playwright for end-to-end testing
- SASS for styling

**Project Structure**: Nx monorepo with domain-driven library organization following a clear two-dimensional classification system

**Design Patterns**:
- Domain-driven design with feature-based library separation
- Smart/dumb component pattern for clear separation of concerns
- Dependency injection using the modern `inject()` function
- Reactive programming with RxJS and Angular Signals
- Immutable state management with NgRx Signal Store

**Data Flow**:
- Unidirectional data flow through NgRx Signal Store
- Components inject stores directly using `inject()` function
- API calls handled by dedicated service layer
- State updates through `patchState()` for immutability
- Real-time UI updates via Angular Signals

**Frontend Architecture**:
- Standalone components (no NgModules) for simplified architecture
- Lazy loading for all major routes using `loadComponent` and `loadChildren`
- Feature-based routing with guards for authentication
- Functional resolvers for data preloading (`ResolveFn<T>`)
- Component composition for modularity and reusability

### 3.2 Development Environment

**Prerequisites**:
- Node.js 18+ (verified with 18.19.21)
- npm 8+ or compatible package manager
- Git for version control

**Installation Steps**:
```bash
# Clone the repository
git clone <repository-url>
cd angular-ngrx-realworld-example-app

# Install dependencies
npm install

# Start development server
npm run start
```

**Configuration**: 
- Environment variables configured in `apps/conduit/src/environments/`
- API URL: `https://real-world-app-39656dff2ddc.herokuapp.com/api` (both dev and prod)
- No additional environment variables required for basic setup

**Common Commands**:
```bash
# Development
npm run start              # Start development server (http://localhost:4200)

# Testing  
nx run-many -t test       # Run all unit tests
nx run conduit-e2e:e2e    # Run end-to-end tests

# Building
npm run build             # Build for production
ng build                  # Alternative build command

# Code Quality
nx run-many -t lint       # Lint all projects
npm run format            # Format code with Prettier

# Nx Workspace
nx dep-graph             # View dependency graph
nx affected:test         # Test only affected projects
nx affected:build        # Build only affected projects
```

### 3.3 Application Configuration

**Environment Configuration**:

**Development Environment** (`environment.ts`):
```typescript
export const environment = {
  production: false,
  api_url: 'https://real-world-app-39656dff2ddc.herokuapp.com/api',
};
```

**Production Environment** (`environment.prod.ts`):
```typescript
export const environment = {
  production: true,
  api_url: 'https://real-world-app-39656dff2ddc.herokuapp.com/api',
};
```

**Required Configuration**:
- **API_URL**: Configured via environment files and injected through DI token
- **HTTP Client**: Configured with interceptors for error handling
- **Router**: Configured with lazy loading and guards

**Configuration Sources**:
- **Environment Files**: `apps/conduit/src/environments/` for environment-specific settings
- **Dependency Injection**: `API_URL` token for API endpoint configuration
- **App Config**: `app.config.ts` for application bootstrap configuration

**Configuration Validation**:
- **Startup Validation**: Environment-based API URL injection validates at bootstrap
- **HTTP Interceptors**: Error handling interceptor validates API responses
- **Route Guards**: AuthGuard validates authentication state before route access

### 3.4 Code Organization

**Directory Structure**:
```
apps/conduit/                 # Main application
├── src/app/                 # Application root
│   ├── layout/              # Layout components (navbar, footer)
│   ├── app.component.ts     # Root component
│   └── app.config.ts        # Application configuration

libs/                        # Feature libraries
├── articles/                # Article domain
│   ├── data-access/        # Article services and stores
│   ├── feature-article/     # Article view component
│   ├── feature-article-edit/# Article editor component
│   └── feature-articles-list/# Article list component
├── auth/                    # Authentication domain
│   ├── data-access/        # Auth services and store
│   └── feature-auth/       # Login/register components
├── core/                    # Shared utilities
│   ├── api-types/          # TypeScript interfaces
│   ├── data-access/        # Shared state utilities
│   ├── error-handler/      # Error handling store
│   ├── forms/              # Form error handling
│   └── http-client/        # API service
└── profile/, home/, settings/, ui/ # Additional domains
```

**File Naming Conventions**:
- `*.component.ts` for Angular components
- `*.service.ts` for services
- `*.store.ts` for NgRx Signal stores  
- `*.model.ts` for TypeScript interfaces
- `*.spec.ts` for unit tests
- All files use kebab-case naming

**Import/Export Patterns**:
- Path mapping configured in `tsconfig.base.json` with `@realworld/*` aliases
- Each library exports public API through `index.ts` barrel files
- Strict dependency boundaries enforced by Nx

**Library Classification System**:

**By Scope (Domain)**:
- `auth` - Authentication features
- `articles` - Article management  
- `profile` - User profile features
- `home` - Homepage features
- `core` - Shared utilities across domains

**By Type**:
- `feature-*` - Smart components with state management
- `data-access` - Services, stores, and API integration
- `ui` - Presentational components
- `api-types` - TypeScript interfaces
- `forms` - Form-related utilities

### 3.5 API Documentation

**External API Integration**:
- **RealWorld API**: `https://real-world-app-39656dff2ddc.herokuapp.com/api`
- **Authentication**: JWT token-based with cookie storage
- **Content Type**: JSON for all requests/responses

**API Endpoints Inventory**:

**Authentication Endpoints**:
- `POST /api/users/login` - User login with email/password
- `POST /api/users` - User registration
- `GET /api/user` - Get current user profile
- `PUT /api/user` - Update user profile

**Article Endpoints**:
- `GET /api/articles` - List articles (with filtering/pagination)
- `GET /api/articles/feed` - Get personalized article feed
- `POST /api/articles` - Create new article
- `GET /api/articles/:slug` - Get specific article
- `PUT /api/articles/:slug` - Update article
- `DELETE /api/articles/:slug` - Delete article
- `POST /api/articles/:slug/favorite` - Favorite article
- `DELETE /api/articles/:slug/favorite` - Unfavorite article

**Comment Endpoints**:
- `GET /api/articles/:slug/comments` - Get article comments
- `POST /api/articles/:slug/comments` - Add comment
- `DELETE /api/articles/:slug/comments/:id` - Delete comment

**Profile Endpoints**:
- `GET /api/profiles/:username` - Get user profile
- `POST /api/profiles/:username/follow` - Follow user
- `DELETE /api/profiles/:username/follow` - Unfollow user

**Tag Endpoints**:
- `GET /api/tags` - Get all available tags

**API Service Architecture**:
- **ApiService**: Central HTTP client in `@realworld/core/http-client`
- **Base URL Configuration**: Injected via `API_URL` token
- **HTTP Headers**: JSON content-type with credentials
- **Domain Services**: Feature-specific services (AuthService, ArticlesService, etc.)

**Request/Response Patterns**:
- **Headers**: `Content-Type: application/json`, `Accept: application/json`
- **Credentials**: `withCredentials: true` for cookie-based auth
- **Error Handling**: Centralized through HTTP interceptor
- **Authentication**: JWT token automatically included via cookies

**Authentication Flow**:
- **Token Management**: Cookie-based storage with automatic inclusion
- **Session Handling**: Persistent login state via AuthStore
- **Protected Routes**: AuthGuard validates authentication before access
- **Data Preloading**: Functional resolvers preload user/article data
- **Logout**: Clears authentication state and redirects to login

### 3.6 Data Management

**State Management Architecture**: NgRx Signal Store with reactive state management

**Store Structure**:

**AuthStore** (`@realworld/auth/data-access`):
- **State**: `{ user: User, loggedIn: boolean }`
- **Methods**: `getUser()`, `login()`, `register()`, `updateUser()`, `logout()`
- **Call State**: Tracks loading/error states for user operations

**ArticleStore** (`@realworld/articles/data-access`):
- **State**: `{ data: Article, comments: Comment[] }`
- **Methods**: `getArticle()`, `getComments()`, `addComment()`, `deleteComment()`, `publishArticle()`, `editArticle()`, `deleteArticle()`
- **Social Actions**: `followUser()`, `unfollowUser()`, `favouriteArticle()`, `unFavouriteArticle()`

**ArticlesListStore** (`@realworld/articles/data-access`):
- **State**: `{ articles: ArticleList, listConfig: ArticlesListConfig }`
- **Methods**: `loadArticles()`, `favouriteArticle()`, `unFavouriteArticle()`, `setListConfig()`, `setListPage()`
- **Computed**: `totalPages()` for pagination

**ProfileStore** (`@realworld/profile/data-access`):
- **State**: `{ username: string, bio: string, image: string, following: boolean }`
- **Methods**: `getProfile()`, `followUser()`, `unfollowUser()`

**HomeStore** (`@realworld/home/feature-home`):
- **State**: `{ tags: string[] }`
- **Methods**: `getTags()`
- **Hooks**: Auto-loads tags on initialization

**FormErrorsStore** (`@realworld/core/forms`):
- **State**: `{ _errors: Errors }`
- **Methods**: `setErrors()`
- **Computed**: `errors()` - formats errors for display

**ErrorHandlerStore** (`@realworld/core/error-handler`):
- **State**: `{ code: number, message: string }`
- **Methods**: `handleError401()`, `handleError404()`

**Data Flow Patterns**:
- **Component to Store**: Direct injection using `inject()` function
- **Async Operations**: `rxMethod()` for handling RxJS streams
- **State Updates**: `patchState()` for immutable updates
- **Error Handling**: Centralized through `FormErrorsStore` and `ErrorHandlerStore`
- **Loading States**: `withCallState()` feature for tracking async operation status

**Data Models**: TypeScript interfaces in `@realworld/core/api-types`

**Core Entities**:
```typescript
interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}
```

**State Management Patterns**:
- **Immutability**: All state updates use `patchState()` for immutable changes
- **Reactivity**: Angular Signals provide automatic change detection
- **Side Effects**: `rxMethod()` handles API calls with `tapResponse()` for error handling
- **State Composition**: `withState()`, `withMethods()`, `withComputed()`, `withCallState()` features

**Local Storage & Persistence**: Authentication state persisted via browser cookies

**Data Synchronization**: Real-time UI updates through Angular Signals with automatic change detection when state changes

**Functional Resolvers**: Modern Angular resolvers for data preloading

**Route Resolvers**:
- **profileResolver**: Preloads user profile data before profile route activation
- **profileArticlesResolver**: Loads user's authored articles for profile page
- **profileFavoritesResolver**: Loads user's favorited articles for favorites tab
- **articleEditResolver**: Preloads article data for editing workflow

**Resolver Pattern**:
```typescript
export const profileResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot) => {
  const username = route.params['username'];
  const profileStore = inject(ProfileStore);
  profileStore.getProfile(username);
  return of(true);
};
```

**Benefits**:
- **Improved UX**: Data loads before route activation
- **Error Handling**: Route activation can be prevented on data load failure  
- **Store Integration**: Resolvers trigger store methods for data fetching
- **Type Safety**: Full TypeScript support with `ResolveFn<T>`

## 4. Development Guidelines

### 4.1 Code Standards

**Angular-Specific Guidelines**:
- Use standalone components exclusively (no NgModules)
- Implement lazy loading for all feature routes
- Use the `inject()` function for dependency injection
- Apply async pipe for observables in templates
- Use new Angular control flow (`@if`, `@for`, `@switch`)

**TypeScript Standards**:
- Define interfaces for all data structures
- Avoid `any` type - utilize TypeScript's type system
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Organize imports: external libraries, Angular, local modules

**File Organization**:
- Use kebab-case for all file names
- Follow naming conventions: `*.component.ts`, `*.service.ts`, `*.store.ts`
- Export public APIs through `index.ts` barrel files
- Maintain strict dependency boundaries between libraries

**Code Style**:
- Use single quotes for strings
- 2-space indentation
- No trailing whitespace
- Use `const` for immutable variables
- Template strings for interpolation

### 4.2 Testing Strategy

**Unit Testing**:
- Jest 29.7.0 as testing framework
- `jest-preset-angular` for Angular-specific testing utilities
- Test coverage for components, services, and stores
- Mock external dependencies and HTTP calls

**Testing Commands**:
```bash
nx run-many -t test          # Run all unit tests
nx test <project>            # Run specific project tests
nx test --coverage           # Generate coverage report
```

**End-to-End Testing**:
- Playwright for E2E test automation
- Test configuration in `apps/conduit-e2e/`
- Authentication helpers for user login/registration
- Page object model for maintainable tests

**E2E Commands**:
```bash
nx run conduit-e2e:e2e      # Run E2E tests
nx run conduit-e2e:e2e --ui # Run with Playwright UI
```

### 4.3 Performance Considerations

**Angular Optimizations**:
- **Zoneless Change Detection**: Improved performance by eliminating Zone.js overhead
- **OnPush Change Detection**: All components use `ChangeDetectionStrategy.OnPush`
- **Lazy Loading**: All routes loaded on-demand to reduce initial bundle size
- **Tree Shaking**: Standalone components improve bundle optimization

**Build Optimizations**:
- **Code Splitting**: Automatic with Angular's build system
- **Bundle Analysis**: Available through Nx build tools
- **Asset Optimization**: Images and static assets optimized during build

**Performance Monitoring**:
- **Bundle Size Budgets**: Configured in `angular.json` with warnings/errors
- **Build Caching**: Nx provides intelligent caching for faster builds
- **Affected-Only Operations**: Nx runs tests/builds only on changed code

## 5. Deployment & Operations

### 5.1 Build Process

**Development Build**:
```bash
npm run start               # Development server with hot reload
ng serve                    # Alternative dev server command
```

**Production Build**:
```bash
npm run build              # Production build with optimizations
ng build --configuration production  # Explicit production build
```

**Build Optimization Features**:
- **Asset Optimization**: Minification and compression
- **Bundle Optimization**: Tree shaking and dead code elimination
- **Environment Configuration**: Automatic environment file replacement
- **Source Maps**: Disabled in production for security
- **Bundle Size Budgets**: Configured warnings (2MB initial) and errors (5MB max)

**Build Artifacts**:
- Output directory: `dist/apps/conduit/`
- Static files ready for hosting on any web server
- Environment-specific configurations applied automatically

### 5.2 Deployment Process

**Frontend Deployment**:
- **Static Hosting**: Compatible with Netlify, Vercel, AWS S3, GitHub Pages
- **Build Output**: Standard HTML/CSS/JS files in `dist/` directory
- **Environment Variables**: Configured at build time through environment files
- **CDN Integration**: Static assets can be served from CDN

**Current Deployment**:
- **Live Demo**: https://angular-ngrx-nx-realworld-example-app-lyart.vercel.app
- **Platform**: Vercel with automatic deployment from Git
- **API Integration**: Uses hosted RealWorld API backend

**Deployment Commands**:
```bash
npm run build              # Build for production
# Deploy dist/apps/conduit/ to static hosting provider
```

### 5.3 Monitoring & Debugging

**Development Tools**:
- **Angular DevTools**: Browser extension for component inspection
- **Nx Console**: VS Code extension for Nx workspace management
- **Source Maps**: Available in development for debugging

**Error Tracking**:
- **HTTP Error Interceptor**: Centralized error handling for API calls
- **Error Handler Store**: Global error state management
- **Console Logging**: Development-time error reporting

**Performance Monitoring**:
- **Lighthouse**: Built-in Chrome DevTools for performance auditing
- **Bundle Analyzer**: Webpack bundle analysis for optimization
- **Network Tab**: Browser DevTools for API call monitoring

**Debugging Techniques**:
- **Browser DevTools**: Component inspection and state debugging
- **Redux DevTools**: Compatible with NgRx for state inspection
- **Network Monitoring**: API call tracking and response analysis

## 6. Quick Start Guides

### 6.1 For New Developers

**5-Step Onboarding**:

1. **Environment Setup**:
   ```bash
   # Verify Node.js version (18+)
   node --version
   # Clone repository
   git clone <repo-url>
   cd angular-ngrx-realworld-example-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run start
   # Navigate to http://localhost:4200
   ```

4. **Explore the Application**:
   - Register a new account
   - Create and publish an article
   - Browse the global feed
   - Test authentication flows

5. **Run Tests**:
   ```bash
   nx run-many -t test     # Unit tests
   nx run conduit-e2e:e2e  # E2E tests
   ```

**First Feature to Implement**: Add article favoriting functionality to the homepage article list
- Start with `libs/home/feature-home/`
- Use existing `ArticlesListStore.favouriteArticle()` method
- Follow smart/dumb component pattern
- Test changes with existing unit tests

**Common Pitfalls**:
- **Import Errors**: Use barrel exports from `index.ts` files, not direct file imports
- **State Management**: Always use `patchState()` for state updates, never mutate directly
- **Routing**: Remember that all routes are lazy-loaded - update route configurations carefully
- **Testing**: Mock all external dependencies, especially HTTP services

### 6.2 For QA Engineers

**Test Execution**:
```bash
# Run all unit tests
nx run-many -t test

# Run E2E tests
nx run conduit-e2e:e2e

# Run specific project tests
nx test auth-data-access
nx test articles-feature-article
```

**Key Testing Areas**:

**Authentication Flows**:
- User registration with validation
- Login/logout functionality
- Protected route access
- Session persistence across browser refresh

**Content Management**:
- Article creation, editing, deletion
- Comment posting and deletion
- Tag filtering and search
- Pagination functionality

**Social Features**:
- User following/unfollowing
- Article favoriting
- Profile viewing
- Feed personalization

**Error Scenarios**:
- Network failures and API errors
- Invalid form submissions
- Unauthorized access attempts
- Missing or malformed data

**Browser Compatibility**:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive design
- JavaScript-enabled environments required

**Test Data Management**:
- Use E2E helper functions in `apps/conduit-e2e/src/helpers/`
- API integration with test backend
- User registration/login utilities provided

## 7. Troubleshooting

### Common Issues

**Build Errors**:
- **Module Not Found**: Check `tsconfig.base.json` path mappings
- **Circular Dependencies**: Review import statements in barrel files
- **TypeScript Errors**: Ensure all types are properly defined and imported

**Runtime Errors**:
- **API Connection Issues**: Verify `environment.ts` API URL configuration
- **Authentication Failures**: Check cookie settings and JWT token handling
- **Route Guards**: Ensure `AuthGuard` properly validates user state

**Development Issues**:
- **Hot Reload Not Working**: Restart development server with `npm run start`
- **Test Failures**: Clear Jest cache with `nx reset` then re-run tests
- **Linting Errors**: Run `nx run-many -t lint --fix` to auto-fix issues

### Environment Issues

**Node.js Version**:
- Required: Node.js 18+
- Solution: Use nvm to switch to compatible version

**Dependency Issues**:
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Nx cache: `nx reset`
- Update dependencies: `npm update`

**Port Conflicts**:
- Default port 4200 may be in use
- Solution: `ng serve --port 4201` or kill existing processes

### Performance Issues

**Slow Build Times**:
- Enable Nx caching: `nx build --cache`
- Use affected commands: `nx affected:build`
- Check for circular dependencies

**Runtime Performance**:
- Enable OnPush change detection for components
- Use trackBy functions in *ngFor loops
- Optimize bundle size with lazy loading

**Memory Issues**:
- Increase Node.js memory: `node --max-old-space-size=8192`
- Monitor for memory leaks in RxJS subscriptions
- Use Chrome DevTools Memory tab for profiling
