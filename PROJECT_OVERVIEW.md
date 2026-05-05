# MediTrack - Project Overview

MediTrack is a full-featured AI-powered mobile healthcare platform built with React Native + Expo (TypeScript). It serves as an all-in-one medical app for patients, doctors, pharmacists, and admins.

---

## Tech Stack

- React Native 0.81 + Expo SDK 54 + Expo Router v6
- TypeScript, React Context for state (Auth, App, Cart)
- Camera, location, maps, notifications, secure storage, haptics, animations
- Rich mock data (6 doctors, 8 medicines, 3 pharmacies, 3 hospitals, etc.)
- Frontend-only with mock data — no backend integration yet

---

## Core Features (39 screens total)

### 1. Authentication (3 screens)
- Login (email/password + social login via Google, Apple, Facebook)
- Registration with role selection (patient/doctor/pharmacist)
- Forgot password flow
- Quick demo login for testing

### 2. Home Dashboard (1 screen)
- Time-based personalized greeting
- AI Health Assistant banner
- 8 Quick Action tiles: Find Doctor, Consult Now, Prescription, Order Meds, Health AI, Emergency, Records, Analytics
- Today's vitals summary
- Upcoming appointments
- Top-rated doctors carousel

### 3. Doctor Discovery & Booking (5 screens)
- Search by name or specialization (16 specialties)
- Sort by rating, experience, or fee
- Full doctor profiles (bio, qualifications, languages, hospital)
- AI Doctor Recommendation — select symptoms and get matched to the right specialist
- Appointment booking with date/time slot picker, consultation type (video/in-person), and symptom pre-selection

### 4. Video Consultation (2 screens)
- Full-screen video call UI with live timer
- Mute/unmute, camera toggle, in-call chat, file sharing
- Recording toggle with indicator
- AI medical notes transcription during the call

### 5. Prescription Management (2 screens)
- Upload via camera scan, photo gallery, or PDF
- AI-powered prescription analysis:
  - OCR text extraction (with confidence score)
  - Drug interaction detection (severity levels)
  - Allergy cross-checking against patient profile
  - Generic alternative suggestions (with cost savings %)
  - Duplicate detection
  - Auto dosage reminder setup

### 6. Pharmacy / Medicine Ordering (4 screens)
- Browse medicines by category (8 categories)
- Medicine detail with price comparison across 3 pharmacies
- Side effects list, stock info, prescription-required badges
- Shopping cart with quantity controls, delivery fee logic (free over $25)
- Order history with tracking and reorder capability

### 7. Health Module (5 screens)
- Health Score (0-100) with trend tracking
- AI Health Assistant — symptom checker returning:
  - Urgency level (low/moderate/high/emergency)
  - Predicted conditions with probability %
  - Recommended specialist
  - Home remedies, diet, and exercise suggestions
- Health Analytics — medicine adherence %, risk assessments, AI early warnings
- Health Records — encrypted EHR storage (lab reports, scans, prescriptions, vaccinations)
- Vitals Logging — 6 vital types (BP, heart rate, temperature, blood sugar, SpO2, weight) with normal range display and history

### 8. Emergency Module (1 screen)
- SOS button — one-tap 911 call
- Ambulance booking with live tracking (driver name, vehicle, ETA, progress bar)
- Location sharing with emergency contacts
- Nearby hospitals list with distance, ratings, emergency call, and map directions

### 9. Inventory Management - Pharmacist Role (1 screen)
- Dashboard: total items, stock levels, sales analytics, profit margin
- Expiry alerts for items expiring within 3 months
- Reorder level warnings with auto-restock notifications
- AI stock predictions — demand forecasting with urgency badges

### 10. Notifications (1 screen)
- Color-coded by type (appointment, medicine reminder, order, health alert, emergency)
- Unread indicators, mark as read, mark all as read

### 11. Profile & Settings (1 screen)
- Personal info with blood group, allergies, verified status
- Account, health, pharmacy, and support menu sections
- Dark mode toggle

---

## AI Features Summary

| Feature                    | What It Does                                          |
| -------------------------- | ----------------------------------------------------- |
| AI Health Assistant        | Symptom analysis with conditions, urgency, remedies   |
| AI Doctor Recommendation   | Maps symptoms to best specialist                      |
| AI Prescription Scanner    | OCR + drug interactions + allergy alerts + generics   |
| AI Medical Transcription   | Real-time notes during video calls                    |
| AI Early Warnings          | Proactive trend-based health alerts                   |
| AI Stock Predictions       | Pharmacy demand forecasting                           |

---

## User Roles

| Role       | Description                                      |
| ---------- | ------------------------------------------------ |
| Patient    | Primary consumer of all health services           |
| Doctor     | Provides consultations and prescriptions          |
| Pharmacist | Manages pharmacy inventory and orders             |
| Admin      | Platform administration                           |

---

## Navigation Architecture

### Bottom Tab Bar (5 tabs)
1. Home — Dashboard
2. Appointments — Appointment management
3. Pharmacy — Medicine ordering (with cart badge)
4. Health — Health hub
5. Profile — Account settings

### Route Groups
```
app/
  (tabs)/            - main tab screens
  auth/              - login, register, forgot-password
  doctor/            - search, profile, ai-recommendation, book-appointment, appointment-detail
  consultation/      - start, video
  prescription/      - upload, analysis
  pharmacy/          - cart, medicine-detail, orders
  health/            - ai-assistant, analytics, records, vitals
  emergency/         - SOS screen
  inventory/         - pharmacist stock dashboard
  notifications/     - notification center
```

---

## Mock Data

| Dataset       | Count | Details                                                        |
| ------------- | ----- | -------------------------------------------------------------- |
| Doctors       | 6     | Cardiologist, Neurologist, Dermatologist, GP, Pediatrician, Orthopedic |
| Medicines     | 8     | Paracetamol, Amoxicillin, Metformin, Atorvastatin, etc.       |
| Pharmacies    | 3     | MedPlus, HealthFirst Drugstore, CareMart Pharmacy              |
| Hospitals     | 3     | City General, St. Mary's, Pacific Heights Clinic               |
| Appointments  | 3     | Confirmed video, pending in-person, completed video            |
| Orders        | 2     | One dispatched (with tracking), one delivered                  |
| Health Records| 4     | CBC lab report, chest X-ray, prescription, flu vaccine         |
| Vitals        | 6     | BP, HR, Temp, Blood Sugar, SpO2, Weight                       |
| Inventory     | 5     | Mix of in-stock, low-stock, out-of-stock                      |
| Notifications | 4     | Appointment, medicine reminder, order, health alert            |
