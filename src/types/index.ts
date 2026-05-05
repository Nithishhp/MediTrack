// ==================== USER & AUTH ====================
export type UserRole = 'patient' | 'doctor' | 'pharmacist' | 'admin';

export interface User {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  allergies: string[];
  emergencyContact?: EmergencyContact;
  healthScore?: number;
  insuranceId?: string;
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  qualification: string[];
  experience: number;
  hospitalAffiliation?: string;
  consultationFee: number;
  rating: number;
  totalReviews: number;
  isAvailableOnline: boolean;
  languages: string[];
  bio: string;
  availableSlots?: TimeSlot[];
  location: Location;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

// ==================== APPOINTMENTS ====================
export type AppointmentStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
export type AppointmentType = 'in_person' | 'video' | 'chat';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctor?: Doctor;
  patient?: Patient;
  date: string;
  timeSlot: TimeSlot;
  type: AppointmentType;
  status: AppointmentStatus;
  symptoms?: string[];
  notes?: string;
  prescription?: Prescription;
  payment?: Payment;
  createdAt: string;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// ==================== CONSULTATION ====================
export interface Consultation {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  status: 'waiting' | 'active' | 'ended';
  recordingUrl?: string;
  isRecordingConsented: boolean;
  chatMessages: ChatMessage[];
  sharedFiles: SharedFile[];
  medicalNotes?: string;
  aiTranscript?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  fileUrl?: string;
}

export interface SharedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedBy: string;
  uploadedAt: string;
}

// ==================== PRESCRIPTION ====================
export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId?: string;
  medicines: PrescriptionMedicine[];
  diagnosis: string;
  notes?: string;
  imageUrl?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface PrescriptionMedicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  genericAlternative?: string;
  interactions?: DrugInteraction[];
}

export interface DrugInteraction {
  drug: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  description: string;
}

export interface OCRResult {
  medicines: PrescriptionMedicine[];
  rawText: string;
  confidence: number;
  warnings: string[];
  interactions: DrugInteraction[];
  allergyAlerts: string[];
  duplicates: string[];
}

// ==================== PHARMACY & MEDICINES ====================
export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  category: string;
  dosageForm: string;
  strength: string;
  price: number;
  discountPrice?: number;
  requiresPrescription: boolean;
  inStock: boolean;
  stockQuantity: number;
  expiryDate: string;
  image?: string;
  description: string;
  sideEffects: string[];
  rating: number;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  location: Location;
  phone: string;
  rating: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  deliveryAvailable: boolean;
  deliveryFee: number;
  medicines: PharmacyMedicine[];
}

export interface PharmacyMedicine {
  medicineId: string;
  medicine: Medicine;
  pharmacyId: string;
  price: number;
  inStock: boolean;
  quantity: number;
}

export interface CartItem {
  medicine: Medicine;
  pharmacy: Pharmacy;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  patientId: string;
  pharmacyId: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  status: OrderStatus;
  deliveryAddress: string;
  prescriptionId?: string;
  payment: Payment;
  estimatedDelivery?: string;
  trackingId?: string;
  createdAt: string;
}

export type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'dispatched' | 'delivered' | 'cancelled';

// ==================== PAYMENTS ====================
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  method: 'card' | 'upi' | 'wallet' | 'insurance';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
  createdAt: string;
}

// ==================== HEALTH RECORDS ====================
export interface HealthRecord {
  id: string;
  patientId: string;
  type: 'lab_report' | 'scan' | 'prescription' | 'discharge_summary' | 'vaccination' | 'other';
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  doctorName?: string;
  hospitalName?: string;
  date: string;
  tags: string[];
  isEncrypted: boolean;
}

export interface VitalSign {
  id: string;
  patientId: string;
  type: 'blood_pressure' | 'heart_rate' | 'temperature' | 'blood_sugar' | 'weight' | 'spo2';
  value: number;
  unit: string;
  secondaryValue?: number;
  recordedAt: string;
  note?: string;
}

export interface HealthAnalytics {
  healthScore: number;
  healthScoreTrend: 'up' | 'down' | 'stable';
  medicineAdherence: number;
  appointmentsCompleted: number;
  activeConditions: string[];
  riskFactors: RiskFactor[];
  monthlyVitals: VitalSign[];
  medicineConsumption: MedicineConsumption[];
  warnings: HealthWarning[];
}

export interface RiskFactor {
  condition: string;
  riskLevel: 'low' | 'moderate' | 'high';
  recommendation: string;
}

export interface MedicineConsumption {
  medicineName: string;
  taken: number;
  missed: number;
  adherenceRate: number;
}

export interface HealthWarning {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  actionRequired: boolean;
  createdAt: string;
}

// ==================== INVENTORY ====================
export interface InventoryItem {
  id: string;
  medicineId: string;
  medicine: Medicine;
  pharmacyId: string;
  quantity: number;
  reorderLevel: number;
  lastRestocked: string;
  expiryDate: string;
  batchNumber: string;
  supplier: string;
  costPrice: number;
  sellingPrice: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'expired';
}

export interface SalesData {
  date: string;
  revenue: number;
  orders: number;
  topSellingMedicines: { name: string; quantity: number; revenue: number }[];
}

// ==================== EMERGENCY ====================
export interface Hospital {
  id: string;
  name: string;
  address: string;
  location: Location;
  phone: string;
  emergencyPhone: string;
  distance?: number;
  hasEmergency: boolean;
  specialties: string[];
  rating: number;
  image?: string;
}

export interface AmbulanceBooking {
  id: string;
  patientId: string;
  pickupLocation: Location;
  hospitalId?: string;
  status: 'requested' | 'dispatched' | 'en_route' | 'arrived' | 'completed';
  estimatedArrival?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleNumber?: string;
}

// ==================== AI MODULE ====================
export interface SymptomCheck {
  symptoms: string[];
  predictedConditions: PredictedCondition[];
  urgencyLevel: 'low' | 'moderate' | 'high' | 'emergency';
  recommendedSpecialist: string;
  homeRemedies?: string[];
  dietRecommendations?: string[];
  exerciseSuggestions?: string[];
}

export interface PredictedCondition {
  name: string;
  probability: number;
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
}

// ==================== COMMON ====================
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'appointment' | 'medicine_reminder' | 'order' | 'health_alert' | 'emergency' | 'general';
  data?: Record<string, string>;
  isRead: boolean;
  createdAt: string;
}
