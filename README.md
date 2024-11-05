# Clean Architecture Todo App

### Introduction

This project is a Todo application built using **Clean Architecture** principles with TypeScript, React, and Appwrite.
Clean Architecture is a software design pattern that organizes code into layers, separating business logic, data
handling, and presentation. This modular structure aims to create a clear boundary between different parts of the
application, improving testability, maintainability, and flexibility.

In this application, the codebase is divided into three main layers: **Data**, **Domain**, and **Presentation**. Each
layer has a specific purpose, ensuring that the code is organized and adheres to the principles of Clean Architecture,
such as the **Dependency Inversion Principle** and **Separation of Concerns**.

### Layer Structure and Role of Each File

#### 1. Data Layer

- **Datasource**: Handles communication with external data sources, such as databases or APIs. This is where the
  application interacts directly with Appwrite to fetch, create, update, or delete data.
- **Model**: Represents the data structure received from the external source. Models are responsible for converting raw
  data from the datasource into the internal format used by the application’s business logic.
- **Repository Implementation**: Provides the actual implementation of the repository interface defined in the Domain
  layer. The repository acts as a bridge between the data source and the rest of the application, abstracting the
  details of data access.

**Why Separate Repository Implementation in Data?**

- The **Dependency Inversion Principle** states that high-level modules (business logic) should not depend on low-level
  modules (data access). By defining the repository interface in the Domain layer, we ensure that the Domain layer
  remains independent of the data source details. The Data layer implements this interface, allowing us to change data
  sources (e.g., switch from Appwrite to another database) without affecting the core logic.

#### 2. Domain Layer

- **Entity**: Defines the core data structures used within the application. Entities are plain TypeScript classes or
  interfaces that represent the data and are agnostic of the data source. Entities are used throughout the Domain and
  Presentation layers.
- **Repository Interface**: This defines the contract for data operations, such as fetching and saving todos. By
  defining the repository interface in the Domain layer, we enforce the Dependency Inversion Principle, as the Domain
  layer does not need to know about the actual data source implementation.
- **Use Cases**: Encapsulates specific business logic operations, such as creating, retrieving, or deleting a todo item.
  Use cases only interact with the repository interface, which allows the business logic to stay isolated from external
  dependencies.

**Why Have an Interface for Repository in Domain?**

- The repository interface serves as a boundary between the Domain and Data layers. This follows **Uncle Bob’s
  Dependency Rule**, which mandates that dependencies should always point inward, from outer layers to inner layers. By
  defining an interface in the Domain layer, we can create flexible and testable code, as the Domain logic remains
  independent of any specific data source implementation.

**Why Separate Entity from Model?**

- The **Single Responsibility Principle** dictates that each class or module should have one responsibility. The **Model
  ** is responsible for transforming raw data from an external source (e.g., JSON from an API) into the application’s
  structure. In contrast, the **Entity** represents the core structure and rules within the app, agnostic of external
  sources. This separation ensures that our Domain layer can work with a consistent data structure (Entity) while being
  insulated from changes in external data sources.

#### 3. Presentation Layer

- **Pages**: Contains the primary views of the application, each representing a page or screen that the user interacts
  with.
- **Components**: Contains reusable UI elements, such as buttons, form fields, and other elements that can be shared
  across different pages.
- **Hooks** (or state management files): Manages local or global state within the application. State management tools (
  like Redux or custom hooks) are used here to control the state and behavior of the UI. These files provide a bridge
  between the Presentation layer and the Domain layer’s use cases.

### Principles Supporting This Structure

This architecture follows several key principles and theories:

1. **Dependency Inversion Principle**: The Data layer depends on the Domain layer, not the other way around, allowing
   the application’s core logic to be independent of external systems.
2. **Separation of Concerns**: Each layer has a specific purpose, reducing interdependencies and making the code more
   modular and easier to maintain.
3. **Single Responsibility Principle**: Each component (e.g., Entity vs. Model) has one specific role, making it easier
   to change and debug without affecting other parts of the system.
4. **Uncle Bob’s Dependency Rule**: Higher-level layers (such as the Domain layer) should not depend on lower-level
   details (such as the datasource). Instead, they rely on abstractions (the repository interface), which are
   implemented by the Data layer.

## Dependency Injection

The project includes a dependency injection file that initializes the necessary instances and dependencies.

# Project Structure

```
src/
├── assets/
│   ├── icons/
├── core/
│   ├── error/
│   ├── routes/
│   ├── secrets/
│   └── service/
│   └── theme/
│   └── use_case/
├── features/
│   └── auth/
│       ├── data/
│       │   ├── datasource/
│       │   └── model/
│       │   └── repository/
│       ├── domain/
│       │   ├── entity/
│       │   ├── repository/
│       │   └── use_case/
│       └── presentation/
│           └── pages/
│           └── components/
│           └── hooks/
│   └── todo/
│       ├── data/
│       │   ├── datasource/
│       │   └── model/
│       │   └── repository/
│       ├── domain/
│       │   ├── entity/
│       │   ├── repository/
│       │   └── use_case/
│       └── presentation/
│           └── pages/
│           └── components/
│           └── hooks/
│   └── shared/
│       ├── data/
│       ├── domain/
│       └── presentation/
└── App.tsx
└── index.css
└── index.tsx
└── init_dependencies.ts
└── react-app-env.d.ts
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file with the necessary Appwrite credentials.

4. Start the development server:
   ```bash
   npm start
   ```

The app should now be running on `http://localhost:3000`.

