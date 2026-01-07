# Implementation Plan: Smart-Silo Storage Referee

## Overview

This implementation plan converts the Smart-Silo Storage Referee design into discrete coding tasks. The approach focuses on building the professional shell first, then implementing input components, IoT visualization, calculation engine, and finally the comparison and verdict systems. Each task builds incrementally to ensure a working application at every step.

## Tasks

- [x] 1. Project Setup and Core Infrastructure
  - Initialize React TypeScript project with Vite
  - Configure Tailwind CSS with custom color palette (Deep Navy #0F172A, Gold #F59E0B)
  - Set up project structure with components, hooks, services, types, and utils directories
  - Install required dependencies: react-gauge-chart, AWS SDK, fast-check for testing
  - _Requirements: 8.1, 8.5_

- [x] 2. Professional Shell Layout Implementation
  - [x] 2.1 Create Sidebar component with collapsible functionality
    - Implement expanded (260px) and collapsed (80px) states
    - Add ChevronLeft/ChevronRight toggle at top-right
    - Apply Deep Navy background with 1px gold right border
    - _Requirements: 1.1, 1.2, 1.4, 1.5_

  - [ ]* 2.2 Write property test for sidebar content reflow
    - **Property 1: Sidebar Content Reflow**
    - **Validates: Requirements 1.3**

  - [x] 2.3 Create MainLayout component with reflow behavior
    - Implement flex-box layout that adjusts to sidebar state changes
    - Add smooth transitions using Tailwind transition-all
    - Ensure main content never overlaps with sidebar
    - _Requirements: 1.3, 8.1, 8.2_

  - [ ]* 2.4 Write unit tests for layout components
    - Test sidebar expanded/collapsed states
    - Test toggle functionality
    - Test responsive behavior
    - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [x] 3. Contextual Input Panel Components
  - [x] 3.1 Create CropSelector component with icon cards
    - Implement selectable cards for Wheat, Chili, Tomato with gold-stroked icons
    - Add click interaction with gold glow selection effect
    - Manage selected crop state and trigger price updates
    - _Requirements: 2.2, 2.3_

  - [ ]* 3.2 Write property test for crop selection visual feedback
    - **Property 2: Crop Selection Visual Feedback**
    - **Validates: Requirements 2.3**

  - [x] 3.3 Create DistanceSlider component
    - Implement custom range slider with gold styling
    - Add large number display that updates with slider movement
    - Set range 0-200 KM with appropriate step increments
    - _Requirements: 2.4_

  - [ ]* 3.4 Write property test for distance slider synchronization
    - **Property 3: Distance Slider Synchronization**
    - **Validates: Requirements 2.4**

  - [x] 3.5 Create VolumeInput component
    - Implement number input with "Quintals" suffix
    - Add gold border focus state styling
    - Include input validation for positive numbers
    - _Requirements: 2.5_

  - [x] 3.6 Create Contextual Input Panel layout
    - Arrange three input components in responsive grid (grid-cols-1 lg:grid-cols-3)
    - Ensure proper spacing and alignment
    - _Requirements: 2.1_

- [ ] 4. Checkpoint - Basic UI Structure Complete
  - Ensure all layout and input components render correctly
  - Verify sidebar animations and input interactions work
  - Ask the user if questions arise

- [x] 5. IoT Environmental Data Visualization
  - [x] 5.1 Create TemperatureGauge component
    - Implement circular speedometer using react-gauge-chart
    - Configure blue-to-red gradient for 0-50°C range
    - Add smooth needle animations for value updates
    - _Requirements: 3.1, 3.2_

  - [x] 5.2 Create HumidityGauge component
    - Implement circular speedometer for 0-100% humidity range
    - Configure semantic color zones (green 0-65%, amber 66-80%, red 81%+)
    - Add real-time value updates
    - _Requirements: 3.1, 3.3, 3.4, 3.5_

  - [ ]* 5.3 Write property test for humidity-based color mapping
    - **Property 4: Humidity-Based Color Mapping**
    - **Validates: Requirements 3.3, 3.4, 3.5**

  - [x] 5.3 Create IoT service for data simulation
    - Implement AWS IoT Core connection simulation
    - Generate realistic temperature and humidity data streams
    - Handle connection states and error conditions
    - _Requirements: 3.6_

  - [ ]* 5.4 Write property test for IoT data stream processing
    - **Property 5: IoT Data Stream Processing**
    - **Validates: Requirements 3.6**

  - [x] 5.5 Create GaugeContainer component
    - Layout two gauges side-by-side
    - Add loading states and error handling
    - Implement fallback to manual entry mode when IoT unavailable
    - _Requirements: 3.1, 7.3_

- [x] 6. Market Data Integration and Calculation Engine
  - [x] 6.1 Create market data service
    - Implement S3 data fetching with proper error handling
    - Define market data structure for crops and storage costs
    - Add optional chaining and null safety throughout
    - _Requirements: 4.5, 7.2, 7.4_

  - [ ]* 6.2 Write property test for market data integration
    - **Property 6: Market Data Integration**
    - **Validates: Requirements 4.5**

  - [x] 6.3 Implement calculation engine
    - Create risk assessment algorithm for humidity-based penalties
    - Implement transport cost scaling based on distance
    - Build profit calculation considering all cost factors
    - _Requirements: 5.1, 5.2, 5.3_

  - [ ]* 6.4 Write property tests for calculation algorithms
    - **Property 7: Humidity Risk Penalty Calculation** - **Validates: Requirements 5.1**
    - **Property 8: Transport Cost Scaling** - **Validates: Requirements 5.2**
    - **Property 9: Profit Calculation Consistency** - **Validates: Requirements 5.3**

  - [x] 6.5 Create carbon footprint analysis
    - Implement environmental impact assessment
    - Assign "High" for cold storage, "Zero" for solar drying
    - _Requirements: 5.4_

  - [ ]* 6.6 Write property test for carbon footprint assignment
    - **Property 10: Carbon Footprint Assignment**
    - **Validates: Requirements 5.4**

- [x] 7. Comparison Matrix and Decision Logic
  - [x] 7.1 Create StorageOption component
    - Display individual storage option with metrics
    - Show estimated profit, risk penalty, carbon footprint
    - Apply appropriate styling for each metric type
    - _Requirements: 4.2, 4.3, 4.4_

  - [x] 7.2 Create ComparisonMatrix component
    - Layout two StorageOption components with "vs" divider
    - Implement real-time updates based on input changes
    - Handle loading states with skeleton loaders
    - _Requirements: 4.1, 7.1_

  - [x] 7.3 Implement recommendation algorithm
    - Create decision logic based on financial optimization and risk minimization
    - Ensure consistent recommendations across all input scenarios
    - _Requirements: 5.5_

  - [ ]* 7.4 Write property test for recommendation logic consistency
    - **Property 11: Recommendation Logic Consistency**
    - **Validates: Requirements 5.5**

- [-] 8. Verdict Card and Reporting System
  - [x] 8.1 Create VerdictCard component
    - Implement full-width footer card with 4px gold left border
    - Add "Download Decision Report" button with gold styling
    - _Requirements: 6.1, 6.4_

  - [x] 8.2 Implement dynamic explanation generation
    - Create explanation strings that include humidity impact, transport costs, and risk factors
    - Ensure explanations are comprehensive and specific to each recommendation
    - _Requirements: 6.2, 6.3_

  - [ ]* 8.3 Write property test for comprehensive explanation generation
    - **Property 12: Comprehensive Explanation Generation**
    - **Validates: Requirements 6.2, 6.3**

  - [x] 8.4 Implement real-time recommendation updates
    - Connect verdict card to input changes and environmental data updates
    - Ensure automatic recalculation and display updates
    - _Requirements: 6.5_

  - [ ]* 8.5 Write property test for real-time recommendation updates
    - **Property 13: Real-time Recommendation Updates**
    - **Validates: Requirements 6.5**

- [ ] 9. Error Handling and Resilience
  - [x] 9.1 Create SkeletonLoader component
    - Implement animated loading placeholders for all data sections
    - Ensure graceful loading states throughout application
    - _Requirements: 7.1_

  - [x] 9.2 Create ErrorBoundary component
    - Implement React error boundaries to prevent crashes
    - Add user-friendly error messages with retry options
    - _Requirements: 7.5_

  - [x] 9.3 Add comprehensive error handling
    - Implement fallback modes for IoT and market data failures
    - Add connection monitoring and retry logic
    - Ensure application never crashes during data fetching
    - _Requirements: 7.3, 7.4, 7.5_

- [ ] 10. Responsive Design and Accessibility
  - [x] 10.1 Implement responsive grid layouts
    - Ensure all components adapt to different screen sizes
    - Test and refine mobile viewport behavior
    - _Requirements: 8.3_

  - [ ]* 10.2 Write property test for responsive layout adaptation
    - **Property 14: Responsive Layout Adaptation**
    - **Validates: Requirements 8.3**

  - [-] 10.3 Add accessibility features
    - Implement high-contrast colors and appropriate sizing
    - Add ARIA labels and keyboard navigation support
    - _Requirements: 8.5_

- [ ] 11. Integration and Final Wiring
  - [ ] 11.1 Connect all components in main application
    - Wire input components to calculation engine
    - Connect IoT data to environmental gauges
    - Link calculations to comparison matrix and verdict card
    - _Requirements: All integration requirements_

  - [ ] 11.2 Add state management with React Context
    - Implement global state for crop selection, environmental data, and calculations
    - Ensure efficient re-rendering and data flow
    - _Requirements: All state management requirements_

  - [ ]* 11.3 Write integration tests
    - Test end-to-end data flow from inputs to recommendations
    - Verify component interactions and state updates
    - _Requirements: All integration requirements_

- [ ] 12. Final Checkpoint - Complete Application Testing
  - Ensure all property tests pass with minimum 100 iterations each
  - Verify all unit tests pass and provide good coverage
  - Test application with various input combinations and edge cases
  - Ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Checkpoints ensure incremental validation and user feedback opportunities