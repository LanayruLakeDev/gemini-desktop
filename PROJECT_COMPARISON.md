# Project System Integration Comparison

## Current Status: ❌ INCOMPLETE

Our GemiDesk project is missing key components and functionality compared to the reference ANP chat implementation.

## Missing Components

### 1. ❌ `ProjectSystemMessagePopup` Component
- **Purpose**: Edit project instructions/system prompts
- **Location**: `src/components/project-system-message-popup.tsx`
- **Functionality**: Allows users to set custom instructions for the project assistant

### 2. ❌ `CreateProjectWithThreadPopup` Component  
- **Purpose**: Create new project with first conversation
- **Location**: `src/components/create-project-with-thread-popup.tsx`
- **Functionality**: Streamlined project creation with immediate chat thread

## Missing Functionality in Project Page

### 1. ❌ Project Instructions Editor
- Cannot edit project system prompts
- "Add Instructions" card should open ProjectSystemMessagePopup
- Should save to project.instructions.systemPrompt

### 2. ❌ File Upload Integration
- "Add Files" card should work (currently shows notImplementedToast)
- Should integrate with file management system

### 3. ❌ Proper Chat Creation in Project Context
- New conversations should be created within the project
- Should use project's system prompt automatically
- Should save thread with correct projectId

### 4. ❌ Layout Issues
- Missing proper project page layout structure
- No proper styling for project context

## Missing Integration Points

### 1. ❌ Thread to Project Association
- New chats from project page should set projectId correctly
- Thread history should show project association

### 2. ❌ Project System Prompt Integration
- When chatting in a project, should use project instructions
- Should be passed to chat API correctly

### 3. ❌ Project Navigation
- Should have proper breadcrumb navigation
- Should maintain project context throughout chat

## Working Features ✅

1. ✅ Project sidebar display
2. ✅ Project CRUD operations (create, rename, delete)
3. ✅ Database schema (project table, projectId in threads)
4. ✅ Basic project page routing
5. ✅ Project dropdown menu

## TODO List (Priority Order)

### HIGH PRIORITY
1. [ ] Create `ProjectSystemMessagePopup` component
2. [ ] Fix project page layout and styling
3. [ ] Implement project instructions editing
4. [ ] Fix chat creation within project context
5. [ ] Ensure threads are saved with correct projectId

### MEDIUM PRIORITY  
6. [ ] Create `CreateProjectWithThreadPopup` component
7. [ ] Implement file upload for projects
8. [ ] Add proper project navigation/breadcrumbs
9. [ ] Integrate project system prompts in chat API

### LOW PRIORITY
10. [ ] Add project-specific settings
11. [ ] Implement project sharing features
12. [ ] Add project analytics/stats

## Files to Compare and Fix

1. **Project Page**: `src/app/(chat)/project/[id]/page.tsx`
2. **Project Components**: Missing popup components
3. **Chat Integration**: Ensure projectId flows correctly
4. **Store Integration**: Project state management
5. **API Integration**: Project system prompts in chat

## Notes
- Do NOT break existing functionality
- Maintain backward compatibility
- Add features, don't replace existing ones
- Test thoroughly before deployment
