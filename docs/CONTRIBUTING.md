# Contributing to React Native Sign Here

Thank you for your interest in contributing to React Native Sign Here! This document provides guidelines and information for contributors.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Getting Started

Before you start contributing, please:

1. Read this entire document
2. Check the [README.md](../README.md) for project overview
3. Look at existing issues and pull requests to understand current work
4. Join our community discussions

## Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- Yarn or npm
- React Native development environment
- TypeScript knowledge

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/react-native-sign-here.git
cd react-native-sign-here

# Install dependencies
yarn install

# Run tests to ensure everything works
yarn test
```

### Development Commands

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run linting
yarn lint

# Run type checking
yarn type-check

# Build the project
yarn build
```

## Code Style

Adhering to established coding guidelines is essential for developing efficient, maintainable, and scalable software. These guidelines promote consistency across codebases, making it easier for teams to collaborate and for new developers to understand existing code. By following standardized patterns, such as those outlined in the [Coding guidelines](https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md), developers can reduce errors and enhance code readability.

* [Coding guidelines](https://github.com/amwebexpert/chrome-extensions-collection/blob/master/packages/coding-guide-helper/public/markdowns/table-of-content.md)


### TypeScript

- Use TypeScript for all new code
- Follow strict TypeScript configuration
- Provide proper type definitions
- Use interfaces for object shapes
- Prefer `const` over `let` when possible

### React/React Native

- Use functional components with hooks
- Follow React naming conventions
- Use proper prop types and interfaces
- Keep components focused and reusable

### File Structure

- Follow the existing project structure
- Place new components in `src/components/`
- Place utilities in `src/utils/`
- Place types in `src/types/`
- Update `src/index.ts` for new exports

### Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for components and types
- Use kebab-case for file names
- Use UPPER_SNAKE_CASE for constants

## Testing

### Writing Tests

- Write tests for all new functionality
- Use Jest and React Native Testing Library
- Test both success and error cases
- Aim for good test coverage

### Running Tests

```bash
# Run all tests
yarn test

# Run tests with coverage
yarn test:coverage

# Run specific test file
yarn test path/to/test-file.test.ts
```

## Pull Request Process

### Before Submitting

1. **Fork the repository** and create a feature branch
2. **Make your changes** following the code style guidelines
3. **Write tests** for new functionality
4. **Update documentation** if needed
5. **Run all tests** and ensure they pass
6. **Check linting** and fix any issues

### Pull Request Guidelines

1. **Use descriptive titles** for your pull requests
2. **Provide a clear description** of what the PR does
3. **Reference related issues** using keywords like "Fixes #123"
4. **Include screenshots** for UI changes
5. **Add tests** for new functionality
6. **Update documentation** if needed

### Pull Request Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment details** (OS, React Native version, etc.)
5. **Screenshots or videos** if applicable
6. **Code examples** if relevant

### Issue Template

```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., iOS 15, Android 12]
- React Native version: [e.g., 0.70.0]
- Library version: [e.g., 1.0.0]

## Additional Information
Any other relevant information
```

## Feature Requests

When requesting features, please:

1. **Describe the feature** clearly
2. **Explain the use case** and why it's needed
3. **Provide examples** of how it would work
4. **Consider alternatives** and discuss trade-offs
5. **Check existing issues** to avoid duplicates

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and constructive
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Other conduct inappropriate for a professional environment

## Getting Help

If you need help with contributing:

1. Check the [README.md](../README.md)
2. Look at existing issues and discussions
3. Ask questions in issues or discussions
4. Join our community channels

## License

By contributing to React Native Sign Here, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to React Native Sign Here! 🎉 