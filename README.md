# Healthcare Management System Frontend

A modern, feature-rich healthcare management system built with Angular 19, leveraging Angular Material for a polished UI experience.

## Features

### Core Features
- **Patient Management**
  - Patient registration and profile management
  - Patient search and listing
  - Patient appointment history

- **Appointment Management**
  - Appointment scheduling and booking
  - Doctor appointment management
  - Patient appointment details
  - Appointment wrapper for consistent UI

- **Document Management**
  - Document upload functionality
  - Document organization and storage
  - Document viewing capabilities

- **User Authentication**
  - Secure login system
  - User registration
  - Profile management

### UI Components
- Responsive navigation bar
- Header component
- Edit profile dialog
- Upload document dialog
- Modern Material Design implementation

## Technical Stack

- **Framework**: Angular 19.2.0
- **UI Components**: Angular Material 19.2.8
- **State Management**: Built-in Angular features
- **Routing**: Angular Router
- **Forms**: Angular Reactive Forms
- **Testing**: Jasmine and Karma

## Project Structure

```
src/
├── app/
│   ├── appointments-wrapper/    # Appointment management components
│   ├── doctor-appointments/     # Doctor-specific appointment views
│   ├── documents/              # Document management components
│   ├── models/                # Data models and interfaces
│   ├── navbar/                # Navigation components
│   ├── patients/              # Patient management components
│   ├── profile/               # User profile components
│   ├── services/              # API and business logic services
│   └── ...                    # Other components and utilities
├── styles.css                # Global styles
└── custom-theme.scss         # Custom Material theme
```

## Getting Started

1. **Prerequisites**
   - Node.js (v18 or higher)
   - npm (v9 or higher)

2. **Installation**
   ```bash
   # Install dependencies
   npm install
   ```

3. **Development Server**
   ```bash
   # Start the development server
   ng serve
   ```
   The application will be available at `http://localhost:4200`

4. **Build**
   ```bash
   # Build the project
   ng build
   ```

5. **Running Tests**
   ```bash
   # Run unit tests
   ng test
   ```

## Frontend Architecture & Design

### Layout Structure
The application follows a modern, responsive layout structure:

```
<app-header>
  <!-- Main navigation and user information -->
</app-header>

<div class="layout-container">
  <app-navbar *ngIf="showNavbar">
    <!-- Main menu navigation -->
  </app-navbar>
  
  <div class="content-container">
    <router-outlet>
      <!-- Dynamic content based on route -->
    </router-outlet>
  </div>
</div>
```

### Design System

#### UI Components
- **Header Component**
  - Responsive navigation
  - User profile display
  - Quick action buttons
  - Material Design elevation

- **Navigation Bar**
  - Role-based conditional rendering
  - Material Design menu items
  - Collapsible on mobile devices
  - Smooth animations

- **Dialog Components**
  - Edit Profile Dialog
    - Form validation
    - Material Design inputs
    - Responsive layout
  - Upload Document Dialog
    - File drag & drop
    - Progress indicator
    - Validation feedback

#### Material Design Implementation
- **Color Scheme**
  - Custom theme defined in `custom-theme.scss`
  - Primary, secondary, and accent colors
  - Consistent color usage across components

- **Typography**
  - Material Design typography system
  - Responsive font sizes
  - Text hierarchy

- **Spacing & Layout**
  - Grid-based layout
  - Consistent spacing
  - Flexible container system

### Component Architecture

#### Core Components
- **Appointment Management**
  - `appointments-wrapper`: Main container
  - `doctor-appointments`: Doctor-specific views
  - `patient-appointments`: Patient-specific views
  - `patient-appointment-details`: Detailed view

- **Patient Management**
  - `patients`: List and search
  - `patient-profile`: Detailed view
  - Form validation
  - Data persistence

- **Document Management**
  - `documents`: Document listing
  - `upload-document-dialog`: File upload
  - Document categorization
  - Version control

#### Service Layer
- **Data Services**
  - REST API integration
  - Error handling
  - Caching
  - Authentication

- **Utility Services**
  - Date formatting
  - File handling
  - Validation
  - State management

### Development Workflow

#### Development Environment
- **Hot Module Replacement (HMR)**
  - Instant updates during development
  - No page refresh required
  - Component-level updates

- **TypeScript Support**
  - Strict type checking
  - Interface definitions
  - Type safety

- **Testing**
  - Unit tests with Jasmine
  - E2E testing with Cypress
  - Code coverage

#### Build Process
- **Optimization**
  - Tree-shaking
  - Lazy loading
  - Code splitting
  - Production optimization

- **Deployment**
  - Environment configuration
  - Build variants
  - Asset optimization

## Contributing Guidelines

### Code Style
1. **TypeScript Conventions**
   - Use strict mode
   - Follow interface-first approach
   - Maintain consistent naming

2. **Component Structure**
   - Single responsibility principle
   - Reusable components
   - Clear separation of concerns

3. **Testing Requirements**
   - Unit tests for all components
   - E2E tests for critical flows
   - Code coverage targets

### Development Process
1. **Branch Management**
   - Feature branches
   - Pull request workflow
   - Code review process

2. **Commit Guidelines**
   - Clear commit messages
   - Conventional commits
   - Atomic changes

3. **Code Review**
   - Security checks
   - Performance review
   - UX consistency

## License & Support

This project is licensed under the MIT License - see the LICENSE file for details.

For support, please:
1. Open an issue in the repository
2. Include detailed description
3. Provide reproduction steps
4. Attach relevant screenshots

## Development

The project uses Angular's standard development workflow with:
- Hot Module Replacement (HMR)
- TypeScript support
- Angular Material theming
- Component-based architecture

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For support, please open an issue in the repository or contact the development team.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
