# Online Art Exhibition Website

## Overview

This project is a comprehensive online art exhibition platform built with React and Express. It features a bilingual (Thai/English) interface showcasing artwork collections across five distinct categories. The application provides both public viewing capabilities and administrative functions for content management, with secure authentication protecting admin areas.

The platform displays curated artwork collections including visual arts career materials, pop-up art, sculpture, cubism, and Thai pop art. Users can browse through organized galleries, view detailed artwork information, and administrators can add or manage artworks through protected interfaces.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application uses React with TypeScript, implementing a component-based architecture with the following key design decisions:

- **Routing**: Wouter library for lightweight client-side routing instead of React Router for better performance
- **State Management**: React Query (@tanstack/react-query) for server state management, avoiding complex global state solutions
- **UI Framework**: Custom component library built on Radix UI primitives with Tailwind CSS for consistent styling
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Authentication**: Session-based authentication using sessionStorage for admin access control

### Backend Architecture
The server implements a REST API using Express.js with the following architectural choices:

- **API Design**: RESTful endpoints following standard HTTP methods (GET, POST, PUT, DELETE)
- **Storage Strategy**: In-memory storage implementation with interface abstraction for future database integration
- **Error Handling**: Centralized error handling middleware with consistent error responses
- **Development Setup**: Vite integration for hot module replacement and development tooling

### Data Storage Solutions
Currently uses in-memory storage with a well-defined interface pattern:

- **Storage Interface**: Abstract IStorage interface allows easy swapping between storage implementations
- **Data Structure**: Organized by category with typed schemas for artwork entities
- **Migration Ready**: Drizzle ORM configuration prepared for PostgreSQL database integration
- **Schema Validation**: Zod schemas ensure data consistency between client and server

### Authentication and Authorization
Simple but effective authentication system:

- **Admin Password**: Single admin password for accessing protected routes
- **Session Management**: SessionStorage-based authentication state
- **Route Protection**: Component-level authentication checks with modal prompts
- **Access Control**: Admin functions (add/edit/delete) require authentication

## External Dependencies

### UI and Styling
- **Radix UI**: Comprehensive primitive components for accessibility and consistent behavior
- **Tailwind CSS**: Utility-first CSS framework for responsive design and theming
- **Lucide React**: Icon library for consistent iconography
- **Google Fonts**: Prompt and Sarabun fonts for proper Thai language typography

### Development and Build Tools
- **Vite**: Fast build tool and development server with React plugin
- **TypeScript**: Type safety and better developer experience
- **ESBuild**: Fast JavaScript bundling for production builds

### Data and Validation
- **Zod**: Runtime type validation and schema definition
- **Drizzle ORM**: Database toolkit prepared for PostgreSQL integration
- **React Hook Form**: Performant form library with validation integration

### HTTP and State Management
- **React Query**: Server state management, caching, and synchronization
- **Wouter**: Minimal routing library for single-page application navigation

### Database Integration (Configured)
- **PostgreSQL**: Database configuration ready via Drizzle and Neon serverless
- **Connection**: Environment-based database URL configuration for deployment

### Additional Utilities
- **Date-fns**: Date manipulation and formatting utilities
- **Class Variance Authority**: Utility for managing component variants
- **CLSX/Tailwind Merge**: Conditional CSS class management