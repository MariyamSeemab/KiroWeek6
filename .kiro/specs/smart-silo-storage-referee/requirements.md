# Requirements Document

## Introduction

The Smart-Silo Storage Referee is an Agri-FinTech decision engine designed to eliminate post-harvest loss for Indian farmers by providing real-time, data-backed comparisons between storage options. The system analyzes Industrial Cold Storage versus On-Farm Solar Drying to help farmers make optimal financial and risk-based decisions.

## Glossary

- **Storage_Referee**: The core decision engine that compares storage options
- **Professional_Shell**: The main application layout with collapsible sidebar
- **Contextual_Input_Panel**: User interface for defining harvest parameters
- **IoT_Environmental_Hub**: Real-time sensor data visualization component
- **Comparison_Matrix**: Side-by-side financial breakdown display
- **Verdict_Card**: Final recommendation output component
- **Cold_Storage**: Industrial storage option with high cost, low spoilage risk, high shelf life
- **Solar_Drying**: On-farm storage option with zero energy cost, high weather risk, medium shelf life
- **FPO**: Farmer Producer Organization

## Requirements

### Requirement 1: Professional Shell Layout

**User Story:** As a farmer or FPO lead, I want a professional application interface with a collapsible sidebar, so that I can efficiently navigate the system while maximizing workspace for data visualization.

#### Acceptance Criteria

1. THE Professional_Shell SHALL display a sidebar with expanded state of 260px width showing full labels next to icons
2. THE Professional_Shell SHALL display a sidebar with collapsed state of 80px width showing only high-contrast gold icons
3. WHEN the sidebar state changes, THE Professional_Shell SHALL smoothly resize the main content area using flex-box layout
4. THE Professional_Shell SHALL provide a ChevronLeft/ChevronRight toggle positioned at the top-right of the sidebar
5. THE Professional_Shell SHALL use Deep Navy (#0F172A) background with 1px Gold border on the right edge of the sidebar

### Requirement 2: Contextual Input Panel

**User Story:** As a farmer, I want to define my harvest parameters through an intuitive interface, so that I can get personalized storage recommendations.

#### Acceptance Criteria

1. THE Contextual_Input_Panel SHALL display three input boxes in a horizontal grid layout (grid-cols-1 lg:grid-cols-3)
2. WHEN selecting crop type, THE Contextual_Input_Panel SHALL display selectable icon cards for Wheat, Chili, and Tomato with gold-stroked icons
3. WHEN a crop card is clicked, THE Contextual_Input_Panel SHALL apply a thick gold glow to indicate selection
4. THE Contextual_Input_Panel SHALL display distance input as a large number display that updates with a custom gold-styled range slider
5. THE Contextual_Input_Panel SHALL provide a harvest volume input box with gold border focus state and "Quintals" unit suffix

### Requirement 3: IoT Environmental Data Visualization

**User Story:** As a farmer, I want to see real-time environmental conditions that affect storage decisions, so that I can understand current risk factors.

#### Acceptance Criteria

1. THE IoT_Environmental_Hub SHALL display two circular speedometer gauges side-by-side for temperature and humidity
2. THE IoT_Environmental_Hub SHALL render temperature gauge with blue-to-red gradient visualization
3. WHEN humidity is 0-65%, THE IoT_Environmental_Hub SHALL display green color indicating safe for solar drying
4. WHEN humidity is 66-80%, THE IoT_Environmental_Hub SHALL display amber color indicating caution
5. WHEN humidity is 81%+, THE IoT_Environmental_Hub SHALL display red color indicating critical risk
6. THE IoT_Environmental_Hub SHALL simulate live data stream from AWS IoT Core

### Requirement 4: Storage Option Comparison

**User Story:** As a farmer, I want to see a detailed financial comparison between storage options, so that I can make informed decisions about my harvest.

#### Acceptance Criteria

1. THE Comparison_Matrix SHALL display two vertical columns with a "vs" divider for Cold Storage and Solar Drying options
2. THE Comparison_Matrix SHALL show estimated profit in large white text for each storage option
3. THE Comparison_Matrix SHALL display risk penalty as negative percentage in red for Solar Drying option
4. THE Comparison_Matrix SHALL show carbon footprint as "High" for Cold Storage and "Zero" for Solar Drying
5. THE Comparison_Matrix SHALL fetch market data from S3 storage for price calculations

### Requirement 5: Decision Engine Logic

**User Story:** As a farmer, I want the system to calculate optimal storage recommendations based on current conditions, so that I can minimize post-harvest losses and maximize profits.

#### Acceptance Criteria

1. WHEN humidity levels are high, THE Storage_Referee SHALL increase the Solar Drying risk penalty calculation
2. THE Storage_Referee SHALL factor in transport costs based on distance to cold storage facilities
3. THE Storage_Referee SHALL calculate estimated profits considering crop prices, storage costs, and risk factors
4. THE Storage_Referee SHALL provide carbon footprint analysis for environmental impact assessment
5. THE Storage_Referee SHALL generate recommendations based on financial optimization and risk minimization

### Requirement 6: Verdict and Reporting

**User Story:** As an FPO lead, I want a clear recommendation with detailed reasoning and downloadable report, so that I can make decisions and document them for stakeholders.

#### Acceptance Criteria

1. THE Verdict_Card SHALL display as a full-width footer card with 4px gold left-border
2. THE Verdict_Card SHALL provide a dynamic explanation string describing the recommendation reasoning
3. THE Verdict_Card SHALL include specific details about humidity impact, transport costs, and risk factors in the explanation
4. THE Verdict_Card SHALL provide a gold "Download Decision Report" button for generating reports
5. THE Verdict_Card SHALL update recommendations in real-time as input parameters or environmental conditions change

### Requirement 7: Data Resilience and Error Handling

**User Story:** As a user, I want the application to handle data loading and errors gracefully, so that I can continue using the system even when some data sources are unavailable.

#### Acceptance Criteria

1. WHEN market data is loading, THE Storage_Referee SHALL display skeleton loaders instead of empty or broken content
2. THE Storage_Referee SHALL use optional chaining for all market data access to prevent crashes
3. WHEN IoT sensor data is unavailable, THE Storage_Referee SHALL switch to manual environmental entry mode
4. THE Storage_Referee SHALL initialize all market data as null and handle loading states appropriately
5. THE Storage_Referee SHALL provide error boundaries to prevent application crashes during data fetching failures

### Requirement 8: Responsive Design and Animations

**User Story:** As a user on different devices, I want smooth animations and responsive design, so that I can use the application effectively on desktop and mobile devices.

#### Acceptance Criteria

1. THE Professional_Shell SHALL use Tailwind CSS transition-all for smooth sidebar animations
2. THE Professional_Shell SHALL ensure main container margin-left or width transitions match sidebar animation timing
3. THE Storage_Referee SHALL provide responsive grid layouts that adapt to different screen sizes
4. THE Storage_Referee SHALL maintain usability and readability across desktop and mobile viewports
5. THE Storage_Referee SHALL use high-contrast colors and appropriate sizing for accessibility