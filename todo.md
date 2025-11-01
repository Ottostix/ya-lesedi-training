# Ya Lesedi Restaurant Development Academy - TODO

## PRIORITY FIXES - CURRENT SPRINT

### Phase 1: Logo Integration & Professional Branding
- [ ] Process and crop Ya Lesedi logo beautifully
- [ ] Integrate logo into Login page
- [ ] Integrate logo into Dashboard header
- [ ] Integrate logo into Navigation/Sidebar
- [ ] Ensure logo displays consistently across all pages
- [ ] Update favicon with Ya Lesedi logo

### Phase 2: Quiz Functionality - Create Quiz Modal
- [ ] Fix Create Quiz button to open modal dialog
- [ ] Create quiz modal with form fields
- [ ] Add quiz templates for different categories:
  - [ ] South African Hospitality Standards
  - [ ] Restaurant-Specific F&B Menu Item Training
  - [ ] Cleaning Procedures
  - [ ] Storage Procedures
  - [ ] Temperature Control Procedures
  - [ ] South African Hospitality Labour Law
- [ ] Implement quiz creation form
- [ ] Add quiz preview functionality
- [ ] Store quizzes in local state/storage
- [ ] Display created quizzes in list
- [ ] Add edit quiz functionality
- [ ] Add delete quiz functionality

### Phase 3: Document Upload & Storage
- [ ] Fix document upload to access device file system
- [ ] Implement file input with proper file picker
- [ ] Add file validation (type, size)
- [ ] Implement document storage in app
- [ ] Display uploaded documents in list
- [ ] Add download functionality for documents
- [ ] Add delete document functionality
- [ ] Show file metadata (name, size, upload date)
- [ ] Add document preview capability

### Phase 4: Professional Layout & Typography
- [ ] Improve overall app typography (fonts, sizes, weights)
- [ ] Enhance color scheme consistency
- [ ] Improve spacing and padding throughout
- [ ] Update button styles for professional look
- [ ] Improve form input styling
- [ ] Add consistent card/container styling
- [ ] Improve navigation bar appearance
- [ ] Enhance dashboard layout
- [ ] Improve responsive design
- [ ] Add professional animations/transitions

### Phase 5: Production Deployment & Testing
- [ ] Test all quiz functionality
- [ ] Test document upload and storage
- [ ] Test all CRUD operations
- [ ] Verify logo displays correctly
- [ ] Test on mobile devices
- [ ] Test on tablets
- [ ] Test on desktop
- [ ] Verify all links work
- [ ] Check for console errors
- [ ] Deploy to production
- [ ] Verify production deployment

## BACKLOG - Future Enhancements

## Phase 6: Staff Management (Users Page)
- [x] Implement Users page (/users) with full CRUD
- [x] Create staff member form
- [x] Display staff list with filtering
- [x] Edit staff member details
- [x] Delete staff members
- [x] Assign roles to staff
- [x] Track staff training progress

## Phase 7: Analytics Dashboard (Stores Page)
- [x] Implement Analytics page (/stores)
- [x] Display real-time metrics
- [x] Show training completion rates
- [x] Display staff performance
- [x] Create charts and visualizations
- [x] Export analytics reports

## Phase 8: Training Modules
- [ ] Implement full Training Modules page
- [ ] Create modules with CRUD
- [ ] Assign modules to staff
- [ ] Track module completion
- [ ] Display module progress

## Phase 9: AI Quiz Generation
- [ ] Integrate OpenAI API
- [ ] Implement document parsing
- [ ] Generate quiz questions from documents
- [ ] Validate quiz quality
- [ ] Save generated quizzes

## Phase 10: Role-Based Access Control
- [ ] Implement RBAC for all pages
- [ ] Restrict features by role
- [ ] Master Admin - full access
- [ ] Store Manager - limited access
- [ ] Staff - read-only access
- [ ] Audit logging

## Phase 11: Cloud Integration
- [ ] Set up Firebase project
- [ ] Configure Firestore database
- [ ] Implement real-time data sync
- [ ] Set up cloud storage for files
- [ ] Configure authentication

## Known Issues
- ❌ **CRITICAL BUG**: Dashboard quick action buttons not navigating (buttons click but don't route to pages)
- GitHub push authentication failing (using local commits)
- Dev server connectivity issues
- Need to implement actual backend API integration
- Firebase credentials not yet configured
- OpenAI API key not yet configured
- Navigation fix in Dashboard.tsx using wouter not working on production

## Completed Features
- [x] Premium luxury login page with Ya Lesedi branding
- [x] Dashboard with stats and quick actions
- [x] Navigation structure with wouter
- [x] AI Quiz Generator component (UI only)
- [x] Role Management page (UI only)
- [x] Training Modules page (UI only)
- [x] Landing page with Ya Lesedi branding
- [x] RBAC service and context (framework)
- [x] Cloud integration services (framework)

