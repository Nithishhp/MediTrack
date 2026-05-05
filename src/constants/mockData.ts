import { Doctor, Medicine, Hospital, Pharmacy, Appointment, HealthRecord, VitalSign, Order, InventoryItem, Notification, HealthAnalytics } from '../types';

export const SPECIALIZATIONS = [
  'General Physician', 'Cardiologist', 'Dermatologist', 'Neurologist',
  'Orthopedic', 'Pediatrician', 'Gynecologist', 'Ophthalmologist',
  'ENT Specialist', 'Psychiatrist', 'Dentist', 'Urologist',
  'Pulmonologist', 'Gastroenterologist', 'Oncologist', 'Endocrinologist',
];

export const SYMPTOMS_LIST = [
  'Headache', 'Fever', 'Cough', 'Cold', 'Body Pain', 'Fatigue',
  'Nausea', 'Dizziness', 'Chest Pain', 'Breathing Difficulty',
  'Stomach Pain', 'Back Pain', 'Joint Pain', 'Skin Rash',
  'Sore Throat', 'Anxiety', 'Insomnia', 'Weight Loss',
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    email: 'dr.sarah@meditrack.com',
    phone: '+1234567890',
    role: 'doctor',
    firstName: 'Sarah',
    lastName: 'Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    isVerified: true,
    createdAt: '2024-01-15',
    specialization: 'Cardiologist',
    qualification: ['MBBS', 'MD Cardiology', 'FACC'],
    experience: 15,
    hospitalAffiliation: 'City Heart Hospital',
    consultationFee: 500,
    rating: 4.8,
    totalReviews: 234,
    isAvailableOnline: true,
    languages: ['English', 'Spanish'],
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with 15 years of experience in interventional cardiology and heart failure management.',
    location: { latitude: 37.7749, longitude: -122.4194, city: 'San Francisco', state: 'CA' },
  },
  {
    id: 'd2',
    email: 'dr.michael@meditrack.com',
    phone: '+1234567891',
    role: 'doctor',
    firstName: 'Michael',
    lastName: 'Chen',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    isVerified: true,
    createdAt: '2024-02-20',
    specialization: 'Neurologist',
    qualification: ['MBBS', 'DM Neurology'],
    experience: 12,
    hospitalAffiliation: 'Neuro Care Center',
    consultationFee: 600,
    rating: 4.9,
    totalReviews: 189,
    isAvailableOnline: true,
    languages: ['English', 'Mandarin'],
    bio: 'Specializing in neurological disorders including epilepsy, stroke, and neurodegenerative diseases.',
    location: { latitude: 37.7849, longitude: -122.4094, city: 'San Francisco', state: 'CA' },
  },
  {
    id: 'd3',
    email: 'dr.priya@meditrack.com',
    phone: '+1234567892',
    role: 'doctor',
    firstName: 'Priya',
    lastName: 'Patel',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    isVerified: true,
    createdAt: '2024-03-10',
    specialization: 'Dermatologist',
    qualification: ['MBBS', 'MD Dermatology'],
    experience: 8,
    consultationFee: 400,
    rating: 4.7,
    totalReviews: 156,
    isAvailableOnline: true,
    languages: ['English', 'Hindi'],
    bio: 'Expert in cosmetic dermatology, acne treatment, and skin allergy management.',
    location: { latitude: 37.7649, longitude: -122.4294, city: 'San Francisco', state: 'CA' },
  },
  {
    id: 'd4',
    email: 'dr.james@meditrack.com',
    phone: '+1234567893',
    role: 'doctor',
    firstName: 'James',
    lastName: 'Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    isVerified: true,
    createdAt: '2024-01-05',
    specialization: 'General Physician',
    qualification: ['MBBS', 'MD Internal Medicine'],
    experience: 20,
    hospitalAffiliation: 'General Health Clinic',
    consultationFee: 300,
    rating: 4.6,
    totalReviews: 312,
    isAvailableOnline: true,
    languages: ['English'],
    bio: 'Experienced general physician providing comprehensive primary care and preventive medicine.',
    location: { latitude: 37.7549, longitude: -122.4394, city: 'San Francisco', state: 'CA' },
  },
  {
    id: 'd5',
    email: 'dr.emily@meditrack.com',
    phone: '+1234567894',
    role: 'doctor',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    isVerified: true,
    createdAt: '2024-04-01',
    specialization: 'Pediatrician',
    qualification: ['MBBS', 'MD Pediatrics', 'DCH'],
    experience: 10,
    hospitalAffiliation: "Children's Care Hospital",
    consultationFee: 450,
    rating: 4.9,
    totalReviews: 278,
    isAvailableOnline: true,
    languages: ['English', 'Spanish'],
    bio: 'Dedicated pediatrician specializing in child development, vaccinations, and adolescent health.',
    location: { latitude: 37.7449, longitude: -122.4494, city: 'San Francisco', state: 'CA' },
  },
  {
    id: 'd6',
    email: 'dr.ahmed@meditrack.com',
    phone: '+1234567895',
    role: 'doctor',
    firstName: 'Ahmed',
    lastName: 'Khan',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    isVerified: true,
    createdAt: '2024-02-15',
    specialization: 'Orthopedic',
    qualification: ['MBBS', 'MS Orthopedics'],
    experience: 14,
    hospitalAffiliation: 'Bone & Joint Center',
    consultationFee: 550,
    rating: 4.5,
    totalReviews: 198,
    isAvailableOnline: false,
    languages: ['English', 'Arabic'],
    bio: 'Orthopedic surgeon specializing in joint replacement, sports injuries, and spinal disorders.',
    location: { latitude: 37.7349, longitude: -122.4594, city: 'San Francisco', state: 'CA' },
  },
];

export const MOCK_MEDICINES: Medicine[] = [
  {
    id: 'm1', name: 'Paracetamol 500mg', genericName: 'Acetaminophen', manufacturer: 'PharmaCorp',
    category: 'Pain Relief', dosageForm: 'Tablet', strength: '500mg', price: 5.99, discountPrice: 4.49,
    requiresPrescription: false, inStock: true, stockQuantity: 500, expiryDate: '2027-06-15',
    description: 'Used for temporary relief of mild to moderate pain and fever.', sideEffects: ['Nausea', 'Liver damage with overdose'], rating: 4.5,
  },
  {
    id: 'm2', name: 'Amoxicillin 250mg', genericName: 'Amoxicillin', manufacturer: 'MediPharma',
    category: 'Antibiotic', dosageForm: 'Capsule', strength: '250mg', price: 12.99,
    requiresPrescription: true, inStock: true, stockQuantity: 200, expiryDate: '2026-12-30',
    description: 'A penicillin-type antibiotic used to treat bacterial infections.', sideEffects: ['Diarrhea', 'Rash', 'Nausea'], rating: 4.3,
  },
  {
    id: 'm3', name: 'Metformin 500mg', genericName: 'Metformin HCl', manufacturer: 'DiaCare Labs',
    category: 'Diabetes', dosageForm: 'Tablet', strength: '500mg', price: 8.99, discountPrice: 6.99,
    requiresPrescription: true, inStock: true, stockQuantity: 350, expiryDate: '2027-03-20',
    description: 'Used to control blood sugar levels in type 2 diabetes.', sideEffects: ['Stomach upset', 'Diarrhea', 'Metallic taste'], rating: 4.6,
  },
  {
    id: 'm4', name: 'Atorvastatin 10mg', genericName: 'Atorvastatin Calcium', manufacturer: 'HeartCare Pharma',
    category: 'Cholesterol', dosageForm: 'Tablet', strength: '10mg', price: 15.99,
    requiresPrescription: true, inStock: true, stockQuantity: 180, expiryDate: '2027-08-10',
    description: 'Used to lower cholesterol and reduce risk of heart disease.', sideEffects: ['Muscle pain', 'Headache', 'Joint pain'], rating: 4.4,
  },
  {
    id: 'm5', name: 'Cetirizine 10mg', genericName: 'Cetirizine HCl', manufacturer: 'AllergyCure',
    category: 'Allergy', dosageForm: 'Tablet', strength: '10mg', price: 6.49, discountPrice: 4.99,
    requiresPrescription: false, inStock: true, stockQuantity: 420, expiryDate: '2027-05-25',
    description: 'Antihistamine used for allergy symptoms like sneezing and runny nose.', sideEffects: ['Drowsiness', 'Dry mouth'], rating: 4.7,
  },
  {
    id: 'm6', name: 'Omeprazole 20mg', genericName: 'Omeprazole', manufacturer: 'GastroHealth',
    category: 'Gastric', dosageForm: 'Capsule', strength: '20mg', price: 9.99,
    requiresPrescription: false, inStock: true, stockQuantity: 300, expiryDate: '2027-01-15',
    description: 'Proton pump inhibitor used to treat GERD and stomach ulcers.', sideEffects: ['Headache', 'Stomach pain', 'Nausea'], rating: 4.5,
  },
  {
    id: 'm7', name: 'Ibuprofen 400mg', genericName: 'Ibuprofen', manufacturer: 'PainRelief Inc',
    category: 'Pain Relief', dosageForm: 'Tablet', strength: '400mg', price: 7.49,
    requiresPrescription: false, inStock: true, stockQuantity: 600, expiryDate: '2027-09-30',
    description: 'NSAID used for pain, inflammation, and fever.', sideEffects: ['Stomach upset', 'Dizziness'], rating: 4.4,
  },
  {
    id: 'm8', name: 'Amlodipine 5mg', genericName: 'Amlodipine Besylate', manufacturer: 'CardioMed',
    category: 'Blood Pressure', dosageForm: 'Tablet', strength: '5mg', price: 11.99,
    requiresPrescription: true, inStock: false, stockQuantity: 0, expiryDate: '2027-04-18',
    description: 'Calcium channel blocker used to treat high blood pressure.', sideEffects: ['Swelling', 'Dizziness', 'Flushing'], rating: 4.3,
  },
];

export const MOCK_PHARMACIES: Pharmacy[] = [
  {
    id: 'p1', name: 'MedPlus Pharmacy', address: '123 Market St, San Francisco, CA',
    location: { latitude: 37.7749, longitude: -122.4194 }, phone: '+1555000111',
    rating: 4.6, isOpen: true, openTime: '08:00', closeTime: '22:00',
    deliveryAvailable: true, deliveryFee: 2.99, medicines: [],
  },
  {
    id: 'p2', name: 'HealthFirst Drugstore', address: '456 Mission St, San Francisco, CA',
    location: { latitude: 37.7849, longitude: -122.4094 }, phone: '+1555000222',
    rating: 4.4, isOpen: true, openTime: '07:00', closeTime: '23:00',
    deliveryAvailable: true, deliveryFee: 1.99, medicines: [],
  },
  {
    id: 'p3', name: 'CareMart Pharmacy', address: '789 Howard St, San Francisco, CA',
    location: { latitude: 37.7649, longitude: -122.4294 }, phone: '+1555000333',
    rating: 4.8, isOpen: true, openTime: '09:00', closeTime: '21:00',
    deliveryAvailable: true, deliveryFee: 3.99, medicines: [],
  },
];

export const MOCK_HOSPITALS: Hospital[] = [
  {
    id: 'h1', name: 'City General Hospital', address: '100 Medical Center Dr', phone: '+1555111000',
    emergencyPhone: '+1555111911', location: { latitude: 37.7749, longitude: -122.4194 },
    distance: 1.2, hasEmergency: true, specialties: ['Emergency', 'Cardiology', 'Neurology', 'Trauma'],
    rating: 4.5,
  },
  {
    id: 'h2', name: "St. Mary's Medical Center", address: '450 Stanyan St', phone: '+1555222000',
    emergencyPhone: '+1555222911', location: { latitude: 37.7679, longitude: -122.4534 },
    distance: 2.5, hasEmergency: true, specialties: ['Emergency', 'Orthopedics', 'Pediatrics'],
    rating: 4.7,
  },
  {
    id: 'h3', name: 'Pacific Heights Clinic', address: '2100 Webster St', phone: '+1555333000',
    emergencyPhone: '+1555333911', location: { latitude: 37.7907, longitude: -122.4328 },
    distance: 3.8, hasEmergency: true, specialties: ['Emergency', 'Surgery', 'Oncology'],
    rating: 4.3,
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1', patientId: 'patient1', doctorId: 'd1', doctor: MOCK_DOCTORS[0],
    date: '2026-02-25', timeSlot: { id: 'ts1', startTime: '10:00', endTime: '10:30', isAvailable: false },
    type: 'video', status: 'confirmed', symptoms: ['Chest Pain', 'Fatigue'],
    createdAt: '2026-02-20',
  },
  {
    id: 'a2', patientId: 'patient1', doctorId: 'd4', doctor: MOCK_DOCTORS[3],
    date: '2026-02-28', timeSlot: { id: 'ts2', startTime: '14:00', endTime: '14:30', isAvailable: false },
    type: 'in_person', status: 'pending', symptoms: ['Headache', 'Fever'],
    createdAt: '2026-02-21',
  },
  {
    id: 'a3', patientId: 'patient1', doctorId: 'd3', doctor: MOCK_DOCTORS[2],
    date: '2026-02-15', timeSlot: { id: 'ts3', startTime: '11:00', endTime: '11:30', isAvailable: false },
    type: 'video', status: 'completed', symptoms: ['Skin Rash'],
    createdAt: '2026-02-10',
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1', patientId: 'patient1', pharmacyId: 'p1',
    items: [
      { medicine: MOCK_MEDICINES[0], pharmacy: MOCK_PHARMACIES[0], quantity: 2, price: 4.49 },
      { medicine: MOCK_MEDICINES[4], pharmacy: MOCK_PHARMACIES[0], quantity: 1, price: 4.99 },
    ],
    totalAmount: 13.97, deliveryFee: 2.99, status: 'dispatched',
    deliveryAddress: '789 Oak St, San Francisco, CA',
    payment: { id: 'pay1', amount: 16.96, currency: 'USD', method: 'card', status: 'completed', createdAt: '2026-02-18' },
    estimatedDelivery: '2026-02-22 15:00', trackingId: 'TRK001', createdAt: '2026-02-18',
  },
  {
    id: 'o2', patientId: 'patient1', pharmacyId: 'p2',
    items: [
      { medicine: MOCK_MEDICINES[2], pharmacy: MOCK_PHARMACIES[1], quantity: 1, price: 6.99 },
    ],
    totalAmount: 6.99, deliveryFee: 1.99, status: 'delivered',
    deliveryAddress: '789 Oak St, San Francisco, CA',
    payment: { id: 'pay2', amount: 8.98, currency: 'USD', method: 'upi', status: 'completed', createdAt: '2026-02-10' },
    createdAt: '2026-02-10',
  },
];

export const MOCK_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'hr1', patientId: 'patient1', type: 'lab_report', title: 'Complete Blood Count',
    description: 'Routine CBC test results', fileUrl: '', fileType: 'pdf',
    doctorName: 'Dr. James Wilson', hospitalName: 'City General Hospital',
    date: '2026-02-10', tags: ['blood', 'routine'], isEncrypted: true,
  },
  {
    id: 'hr2', patientId: 'patient1', type: 'scan', title: 'Chest X-Ray',
    description: 'Annual chest x-ray screening', fileUrl: '', fileType: 'image',
    doctorName: 'Dr. Sarah Johnson', hospitalName: 'City Heart Hospital',
    date: '2026-01-20', tags: ['chest', 'x-ray', 'screening'], isEncrypted: true,
  },
  {
    id: 'hr3', patientId: 'patient1', type: 'prescription', title: 'Cardiology Prescription',
    description: 'Prescription from follow-up visit', fileUrl: '', fileType: 'pdf',
    doctorName: 'Dr. Sarah Johnson', date: '2026-01-15', tags: ['cardiology', 'followup'], isEncrypted: true,
  },
  {
    id: 'hr4', patientId: 'patient1', type: 'vaccination', title: 'Flu Vaccine 2026',
    description: 'Annual influenza vaccination', fileUrl: '', fileType: 'pdf',
    hospitalName: 'Community Health Center', date: '2026-01-05', tags: ['vaccine', 'flu'], isEncrypted: true,
  },
];

export const MOCK_VITALS: VitalSign[] = [
  { id: 'v1', patientId: 'patient1', type: 'blood_pressure', value: 120, secondaryValue: 80, unit: 'mmHg', recordedAt: '2026-02-22' },
  { id: 'v2', patientId: 'patient1', type: 'heart_rate', value: 72, unit: 'bpm', recordedAt: '2026-02-22' },
  { id: 'v3', patientId: 'patient1', type: 'temperature', value: 98.6, unit: '°F', recordedAt: '2026-02-22' },
  { id: 'v4', patientId: 'patient1', type: 'blood_sugar', value: 95, unit: 'mg/dL', recordedAt: '2026-02-22' },
  { id: 'v5', patientId: 'patient1', type: 'spo2', value: 98, unit: '%', recordedAt: '2026-02-22' },
  { id: 'v6', patientId: 'patient1', type: 'weight', value: 70, unit: 'kg', recordedAt: '2026-02-22' },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'inv1', medicineId: 'm1', medicine: MOCK_MEDICINES[0], pharmacyId: 'p1',
    quantity: 500, reorderLevel: 100, lastRestocked: '2026-02-15', expiryDate: '2027-06-15',
    batchNumber: 'BTH001', supplier: 'PharmaCorp Distributors', costPrice: 3.50, sellingPrice: 5.99, status: 'in_stock',
  },
  {
    id: 'inv2', medicineId: 'm2', medicine: MOCK_MEDICINES[1], pharmacyId: 'p1',
    quantity: 45, reorderLevel: 50, lastRestocked: '2026-02-01', expiryDate: '2026-12-30',
    batchNumber: 'BTH002', supplier: 'MediPharma Supply', costPrice: 8.00, sellingPrice: 12.99, status: 'low_stock',
  },
  {
    id: 'inv3', medicineId: 'm7', medicine: MOCK_MEDICINES[6], pharmacyId: 'p1',
    quantity: 0, reorderLevel: 80, lastRestocked: '2026-01-10', expiryDate: '2027-09-30',
    batchNumber: 'BTH003', supplier: 'PainRelief Inc', costPrice: 4.50, sellingPrice: 7.49, status: 'out_of_stock',
  },
  {
    id: 'inv4', medicineId: 'm3', medicine: MOCK_MEDICINES[2], pharmacyId: 'p1',
    quantity: 350, reorderLevel: 75, lastRestocked: '2026-02-10', expiryDate: '2027-03-20',
    batchNumber: 'BTH004', supplier: 'DiaCare Labs', costPrice: 5.50, sellingPrice: 8.99, status: 'in_stock',
  },
  {
    id: 'inv5', medicineId: 'm8', medicine: MOCK_MEDICINES[7], pharmacyId: 'p1',
    quantity: 12, reorderLevel: 30, lastRestocked: '2026-01-20', expiryDate: '2026-03-18',
    batchNumber: 'BTH005', supplier: 'CardioMed Supply', costPrice: 7.00, sellingPrice: 11.99, status: 'low_stock',
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1', userId: 'patient1', title: 'Appointment Confirmed',
    body: 'Your appointment with Dr. Sarah Johnson on Feb 25 at 10:00 AM is confirmed.',
    type: 'appointment', isRead: false, createdAt: '2026-02-20T10:00:00',
  },
  {
    id: 'n2', userId: 'patient1', title: 'Medicine Reminder',
    body: 'Time to take Metformin 500mg - Morning dose',
    type: 'medicine_reminder', isRead: false, createdAt: '2026-02-22T08:00:00',
  },
  {
    id: 'n3', userId: 'patient1', title: 'Order Dispatched',
    body: 'Your order #TRK001 from MedPlus Pharmacy has been dispatched.',
    type: 'order', isRead: true, createdAt: '2026-02-19T14:30:00',
  },
  {
    id: 'n4', userId: 'patient1', title: 'Health Alert',
    body: 'Your blood pressure readings show an upward trend. Consider consulting your doctor.',
    type: 'health_alert', isRead: false, createdAt: '2026-02-21T09:00:00',
  },
];

export const MOCK_HEALTH_ANALYTICS: HealthAnalytics = {
  healthScore: 82,
  healthScoreTrend: 'up',
  medicineAdherence: 88,
  appointmentsCompleted: 12,
  activeConditions: ['Mild Hypertension', 'Pre-Diabetes'],
  riskFactors: [
    { condition: 'Cardiovascular Disease', riskLevel: 'moderate', recommendation: 'Regular cardio exercises and low-sodium diet' },
    { condition: 'Type 2 Diabetes', riskLevel: 'moderate', recommendation: 'Monitor blood sugar, maintain healthy weight' },
    { condition: 'Vitamin D Deficiency', riskLevel: 'low', recommendation: '15 minutes of daily sunlight exposure' },
  ],
  monthlyVitals: [],
  medicineConsumption: [
    { medicineName: 'Metformin 500mg', taken: 56, missed: 4, adherenceRate: 93 },
    { medicineName: 'Amlodipine 5mg', taken: 52, missed: 8, adherenceRate: 87 },
    { medicineName: 'Atorvastatin 10mg', taken: 48, missed: 12, adherenceRate: 80 },
  ],
  warnings: [
    { id: 'w1', type: 'warning', title: 'Blood Pressure Trending Up', message: 'Your average systolic BP has increased by 8 mmHg in the last 2 weeks.', actionRequired: true, createdAt: '2026-02-21' },
    { id: 'w2', type: 'info', title: 'Upcoming Lab Test Due', message: 'Your quarterly HbA1c test is due next week.', actionRequired: false, createdAt: '2026-02-20' },
  ],
};

export const TIME_SLOTS = [
  { id: 'ts_09_00', startTime: '09:00', endTime: '09:30', isAvailable: true },
  { id: 'ts_09_30', startTime: '09:30', endTime: '10:00', isAvailable: true },
  { id: 'ts_10_00', startTime: '10:00', endTime: '10:30', isAvailable: false },
  { id: 'ts_10_30', startTime: '10:30', endTime: '11:00', isAvailable: true },
  { id: 'ts_11_00', startTime: '11:00', endTime: '11:30', isAvailable: true },
  { id: 'ts_11_30', startTime: '11:30', endTime: '12:00', isAvailable: false },
  { id: 'ts_14_00', startTime: '14:00', endTime: '14:30', isAvailable: true },
  { id: 'ts_14_30', startTime: '14:30', endTime: '15:00', isAvailable: true },
  { id: 'ts_15_00', startTime: '15:00', endTime: '15:30', isAvailable: true },
  { id: 'ts_15_30', startTime: '15:30', endTime: '16:00', isAvailable: false },
  { id: 'ts_16_00', startTime: '16:00', endTime: '16:30', isAvailable: true },
  { id: 'ts_16_30', startTime: '16:30', endTime: '17:00', isAvailable: true },
];
