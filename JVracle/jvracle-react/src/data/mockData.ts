// JVracle Mock Data - Comprehensive Oracle Opera Alternative
// All realistic demo data for hotel management system

export interface Property {
  id: string;
  name: string;
  code: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  settings: {
    timezone: string;
    currency: string;
    checkInTime: string;
    checkOutTime: string;
    taxRate: number;
    serviceChargeRate: number;
  };
  totalRooms: number;
  floors: number;
  amenities: string[];
}

export interface RoomType {
  id: string;
  code: string;
  name: string;
  description: string;
  maxOccupancy: number;
  baseRate: number;
  amenities: string[];
  smokingAllowed: boolean;
  bedConfiguration: string;
  roomSize: number;
  view: string;
}

export interface Room {
  id: string;
  number: string;
  floor: number;
  roomTypeId: string;
  status: 'occupied' | 'vacant-clean' | 'vacant-dirty' | 'out-of-order' | 'maintenance';
  housekeepingStatus: 'clean' | 'dirty' | 'inspected' | 'maintenance';
  currentGuestId?: string;
  nextReservationId?: string;
  lastCleaned: Date;
  lastInspected: Date;
  notes: string[];
  maintenanceIssues: string[];
  features: string[];
}

export interface Guest {
  id: string;
  profileNumber: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  dateOfBirth?: Date;
  nationality: string;
  passportNumber?: string;
  loyaltyTier: 'None' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond';
  loyaltyPoints: number;
  vipNotes: string[];
  preferences: {
    roomType: string;
    floor: string;
    smokingPreference: boolean;
    bedType: string;
    pillowType: string;
    specialRequests: string[];
  };
  stayHistory: {
    totalStays: number;
    totalSpent: number;
    averageRate: number;
    lastStay: Date;
  };
  marketingOptIn: boolean;
  blacklisted: boolean;
  creditLimit: number;
  paymentMethods: string[];
}

export interface Reservation {
  id: string;
  confirmationNumber: string;
  guestId: string;
  propertyId: string;
  roomTypeId: string;
  roomId?: string;
  checkInDate: Date;
  checkOutDate: Date;
  adults: number;
  children: number;
  infants: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'no-show' | 'checked-in' | 'checked-out';
  rateCode: string;
  rateAmount: number;
  totalAmount: number;
  taxAmount: number;
  serviceChargeAmount: number;
  discountAmount: number;
  paymentStatus: 'pending' | 'authorized' | 'paid' | 'refunded';
  paymentMethod: string;
  source: string;
  marketSegment: string;
  corporateId?: string;
  groupId?: string;
  travelAgentId?: string;
  specialRequests: string[];
  packageCodes: string[];
  guaranteeType: string;
  cancellationPolicy: string;
  created: Date;
  modified: Date;
  createdBy: string;
  modifiedBy: string;
  notes: string[];
}

export interface RatePlan {
  id: string;
  code: string;
  name: string;
  description: string;
  roomTypeId: string;
  category: 'RACK' | 'CORP' | 'GOV' | 'ADVANCE' | 'PACKAGE' | 'GROUP';
  baseRate: number;
  currency: string;
  inclusions: string[];
  restrictions: {
    minStay: number;
    maxStay: number;
    advanceBooking: number;
    cutoffTime: string;
    daysOfWeek: number[];
  };
  cancellationPolicy: string;
  isActive: boolean;
  validFrom: Date;
  validTo: Date;
}

export interface Folio {
  id: string;
  folioNumber: string;
  reservationId: string;
  guestId: string;
  roomNumber: string;
  checkInDate: Date;
  checkOutDate?: Date;
  status: 'open' | 'closed' | 'transferred';
  balance: number;
  totalCharges: number;
  totalPayments: number;
  totalCredits: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  folioId: string;
  date: Date;
  time: string;
  type: 'room_charge' | 'tax' | 'service_charge' | 'fb_charge' | 'misc_charge' | 'payment' | 'adjustment' | 'refund';
  description: string;
  amount: number;
  quantity: number;
  unitPrice: number;
  departmentCode: string;
  revenueCode: string;
  reference: string;
  postedBy: string;
  notes: string;
}

// Mock Property Data
export const MOCK_PROPERTY: Property = {
  id: 'PROP001',
  name: 'Grand Luxury Resort & Spa',
  code: 'GLR',
  address: {
    street: '1500 Ocean Drive',
    city: 'Miami Beach',
    state: 'Florida',
    country: 'United States',
    postalCode: '33139'
  },
  settings: {
    timezone: 'America/New_York',
    currency: 'USD',
    checkInTime: '15:00',
    checkOutTime: '11:00',
    taxRate: 0.125,
    serviceChargeRate: 0.18
  },
  totalRooms: 305,
  floors: 15,
  amenities: ['WiFi', 'Pool', 'Spa', 'Fitness Center', 'Restaurant', 'Bar', 'Concierge', 'Valet Parking', 'Beach Access', 'Business Center']
};

// Mock Room Types
export const MOCK_ROOM_TYPES: RoomType[] = [
  {
    id: 'RT001',
    code: 'STD',
    name: 'Standard King',
    description: 'Elegant king room with city view',
    maxOccupancy: 2,
    baseRate: 299.00,
    amenities: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron'],
    smokingAllowed: false,
    bedConfiguration: '1 King Bed',
    roomSize: 350,
    view: 'City View'
  },
  {
    id: 'RT002',
    code: 'DLX',
    name: 'Deluxe Ocean View',
    description: 'Spacious room with partial ocean view',
    maxOccupancy: 3,
    baseRate: 389.00,
    amenities: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron', 'Balcony'],
    smokingAllowed: false,
    bedConfiguration: '1 King Bed + Sofa Bed',
    roomSize: 425,
    view: 'Ocean View'
  },
  {
    id: 'RT003',
    code: 'STE',
    name: 'Executive Suite',
    description: 'Luxury suite with separate living area',
    maxOccupancy: 4,
    baseRate: 599.00,
    amenities: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron', 'Balcony', 'Jacuzzi', 'Separate Living Room'],
    smokingAllowed: false,
    bedConfiguration: '1 King Bed + Sofa Bed',
    roomSize: 650,
    view: 'Ocean View'
  },
  {
    id: 'RT004',
    code: 'PST',
    name: 'Presidential Suite',
    description: 'Ultra-luxury presidential suite',
    maxOccupancy: 6,
    baseRate: 1299.00,
    amenities: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron', 'Balcony', 'Jacuzzi', 'Separate Living Room', 'Dining Room', 'Kitchen', 'Butler Service'],
    smokingAllowed: false,
    bedConfiguration: '2 King Beds + Sofa Bed',
    roomSize: 1200,
    view: 'Panoramic Ocean View'
  }
];

// Mock Rate Plans
export const MOCK_RATE_PLANS: RatePlan[] = [
  {
    id: 'RATE001',
    code: 'RACK',
    name: 'Best Available Rate',
    description: 'Standard published rate',
    roomTypeId: 'RT001',
    category: 'RACK',
    baseRate: 299.00,
    currency: 'USD',
    inclusions: ['WiFi', 'Fitness Center Access'],
    restrictions: {
      minStay: 1,
      maxStay: 14,
      advanceBooking: 0,
      cutoffTime: '18:00',
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7]
    },
    cancellationPolicy: 'Free cancellation until 6 PM day of arrival',
    isActive: true,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31')
  },
  {
    id: 'RATE002',
    code: 'CORP',
    name: 'Corporate Rate',
    description: 'Special rate for corporate clients',
    roomTypeId: 'RT001',
    category: 'CORP',
    baseRate: 249.00,
    currency: 'USD',
    inclusions: ['WiFi', 'Fitness Center Access', 'Business Center Access'],
    restrictions: {
      minStay: 1,
      maxStay: 30,
      advanceBooking: 0,
      cutoffTime: '18:00',
      daysOfWeek: [1, 2, 3, 4, 5]
    },
    cancellationPolicy: 'Free cancellation until 6 PM day of arrival',
    isActive: true,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31')
  },
  {
    id: 'RATE003',
    code: 'ADVANCE',
    name: 'Advance Purchase',
    description: '14-day advance purchase rate',
    roomTypeId: 'RT001',
    category: 'ADVANCE',
    baseRate: 199.00,
    currency: 'USD',
    inclusions: ['WiFi', 'Fitness Center Access'],
    restrictions: {
      minStay: 2,
      maxStay: 7,
      advanceBooking: 14,
      cutoffTime: '18:00',
      daysOfWeek: [1, 2, 3, 4, 5, 6, 7]
    },
    cancellationPolicy: 'Non-refundable',
    isActive: true,
    validFrom: new Date('2024-01-01'),
    validTo: new Date('2025-12-31')
  }
];

// Mock Guest Data
export const MOCK_GUESTS: Guest[] = [
  {
    id: 'GUEST001',
    profileNumber: 'GLR001234',
    title: 'Mr.',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-123-4567',
    address: {
      street: '123 Corporate Blvd',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      postalCode: '10001'
    },
    dateOfBirth: new Date('1975-06-15'),
    nationality: 'American',
    passportNumber: 'US123456789',
    loyaltyTier: 'Platinum',
    loyaltyPoints: 45680,
    vipNotes: ['Prefers high floor', 'Champagne welcome', 'Late checkout always approved'],
    preferences: {
      roomType: 'Suite',
      floor: 'High Floor',
      smokingPreference: false,
      bedType: 'King',
      pillowType: 'Hypoallergenic',
      specialRequests: ['Ocean view preferred', 'Quiet room', 'Extra towels']
    },
    stayHistory: {
      totalStays: 23,
      totalSpent: 42500.00,
      averageRate: 425.00,
      lastStay: new Date('2024-12-15')
    },
    marketingOptIn: true,
    blacklisted: false,
    creditLimit: 5000.00,
    paymentMethods: ['Amex *1234', 'Visa *5678']
  },
  {
    id: 'GUEST002',
    profileNumber: 'GLR001235',
    title: 'Ms.',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-987-6543',
    address: {
      street: '456 Business Ave',
      city: 'Chicago',
      state: 'IL',
      country: 'United States',
      postalCode: '60601'
    },
    dateOfBirth: new Date('1982-03-22'),
    nationality: 'American',
    loyaltyTier: 'Gold',
    loyaltyPoints: 18750,
    vipNotes: ['Vegetarian meals', 'Fitness enthusiast'],
    preferences: {
      roomType: 'Deluxe',
      floor: 'Any Floor',
      smokingPreference: false,
      bedType: 'King',
      pillowType: 'Memory Foam',
      specialRequests: ['Yoga mat in room', 'Healthy snacks in minibar']
    },
    stayHistory: {
      totalStays: 12,
      totalSpent: 18900.00,
      averageRate: 315.00,
      lastStay: new Date('2024-11-08')
    },
    marketingOptIn: true,
    blacklisted: false,
    creditLimit: 2500.00,
    paymentMethods: ['Visa *9876']
  },
  {
    id: 'GUEST003',
    profileNumber: 'GLR001236',
    title: 'Mr.',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@techcorp.com',
    phone: '+1-555-456-7890',
    address: {
      street: '789 Technology Way',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      postalCode: '94105'
    },
    dateOfBirth: new Date('1978-09-10'),
    nationality: 'American',
    loyaltyTier: 'Diamond',
    loyaltyPoints: 67890,
    vipNotes: ['CEO - highest service level', 'Business center access required'],
    preferences: {
      roomType: 'Suite',
      floor: 'High Floor',
      smokingPreference: false,
      bedType: 'King',
      pillowType: 'Firm',
      specialRequests: ['Multiple device charging', 'Business newspapers', 'Express laundry']
    },
    stayHistory: {
      totalStays: 35,
      totalSpent: 89400.00,
      averageRate: 510.00,
      lastStay: new Date('2024-12-20')
    },
    marketingOptIn: false,
    blacklisted: false,
    creditLimit: 10000.00,
    paymentMethods: ['Corporate Account', 'Amex *4321']
  }
];

// Mock Rooms Data
export const MOCK_ROOMS: Room[] = [
  // Floor 1 - Standard Rooms
  {
    id: 'ROOM101',
    number: '101',
    floor: 1,
    roomTypeId: 'RT001',
    status: 'occupied',
    housekeepingStatus: 'clean',
    currentGuestId: 'GUEST001',
    lastCleaned: new Date('2025-01-08T10:30:00'),
    lastInspected: new Date('2025-01-08T10:45:00'),
    notes: ['VIP guest - extra amenities provided'],
    maintenanceIssues: [],
    features: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron']
  },
  {
    id: 'ROOM102',
    number: '102',
    floor: 1,
    roomTypeId: 'RT001',
    status: 'vacant-clean',
    housekeepingStatus: 'inspected',
    nextReservationId: 'RES004',
    lastCleaned: new Date('2025-01-08T11:15:00'),
    lastInspected: new Date('2025-01-08T11:30:00'),
    notes: ['Ready for next guest'],
    maintenanceIssues: [],
    features: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron']
  },
  {
    id: 'ROOM103',
    number: '103',
    floor: 1,
    roomTypeId: 'RT001',
    status: 'vacant-dirty',
    housekeepingStatus: 'dirty',
    lastCleaned: new Date('2025-01-07T14:20:00'),
    lastInspected: new Date('2025-01-07T14:35:00'),
    notes: ['Departure cleanup needed'],
    maintenanceIssues: [],
    features: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron']
  },
  {
    id: 'ROOM104',
    number: '104',
    floor: 1,
    roomTypeId: 'RT001',
    status: 'maintenance',
    housekeepingStatus: 'maintenance',
    lastCleaned: new Date('2025-01-06T09:00:00'),
    lastInspected: new Date('2025-01-06T09:15:00'),
    notes: ['AC repair in progress'],
    maintenanceIssues: ['Air conditioning unit needs repair', 'Bathroom faucet dripping'],
    features: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron']
  },
  // Floor 2 - Deluxe Rooms
  {
    id: 'ROOM201',
    number: '201',
    floor: 2,
    roomTypeId: 'RT002',
    status: 'occupied',
    housekeepingStatus: 'clean',
    currentGuestId: 'GUEST002',
    lastCleaned: new Date('2025-01-08T09:45:00'),
    lastInspected: new Date('2025-01-08T10:00:00'),
    notes: ['Guest prefers extra towels'],
    maintenanceIssues: [],
    features: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron', 'Balcony', 'Ocean View']
  },
  {
    id: 'ROOM202',
    number: '202',
    floor: 2,
    roomTypeId: 'RT002',
    status: 'vacant-clean',
    housekeepingStatus: 'inspected',
    lastCleaned: new Date('2025-01-08T12:00:00'),
    lastInspected: new Date('2025-01-08T12:15:00'),
    notes: ['Premium amenities restocked'],
    maintenanceIssues: [],
    features: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron', 'Balcony', 'Ocean View']
  },
  // Floor 30 - Suites
  {
    id: 'ROOM3001',
    number: '3001',
    floor: 30,
    roomTypeId: 'RT003',
    status: 'occupied',
    housekeepingStatus: 'clean',
    currentGuestId: 'GUEST003',
    lastCleaned: new Date('2025-01-08T08:30:00'),
    lastInspected: new Date('2025-01-08T08:45:00'),
    notes: ['VIP suite - butler service active'],
    maintenanceIssues: [],
    features: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron', 'Balcony', 'Jacuzzi', 'Separate Living Room', 'Panoramic Ocean View']
  },
  {
    id: 'ROOM3050',
    number: '3050',
    floor: 30,
    roomTypeId: 'RT004',
    status: 'vacant-clean',
    housekeepingStatus: 'inspected',
    lastCleaned: new Date('2025-01-08T07:00:00'),
    lastInspected: new Date('2025-01-08T07:30:00'),
    notes: ['Presidential suite ready for VIP arrival'],
    maintenanceIssues: [],
    features: ['WiFi', 'Mini Bar', 'Coffee Machine', 'Safe', 'Iron', 'Balcony', 'Jacuzzi', 'Separate Living Room', 'Dining Room', 'Kitchen', 'Butler Service', 'Panoramic Ocean View']
  }
];

// Mock Reservations Data
export const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: 'RES001',
    confirmationNumber: 'JV2025-4521',
    guestId: 'GUEST001',
    propertyId: 'PROP001',
    roomTypeId: 'RT002',
    roomId: 'ROOM201',
    checkInDate: new Date('2025-01-08'),
    checkOutDate: new Date('2025-01-12'),
    adults: 2,
    children: 0,
    infants: 0,
    status: 'checked-in',
    rateCode: 'RACK',
    rateAmount: 389.00,
    totalAmount: 1867.84,
    taxAmount: 194.50,
    serviceChargeAmount: 139.86,
    discountAmount: 0,
    paymentStatus: 'authorized',
    paymentMethod: 'Amex *1234',
    source: 'Direct Website',
    marketSegment: 'Leisure',
    specialRequests: ['High floor', 'Ocean view', 'Late checkout'],
    packageCodes: [],
    guaranteeType: 'Credit Card',
    cancellationPolicy: 'Free cancellation until 6 PM day of arrival',
    created: new Date('2025-01-01T10:30:00'),
    modified: new Date('2025-01-08T15:30:00'),
    createdBy: 'SYSTEM',
    modifiedBy: 'FRONTDESK01',
    notes: ['VIP guest - champagne welcome arranged', 'Late checkout approved until 2 PM']
  },
  {
    id: 'RES002',
    confirmationNumber: 'JV2025-4522',
    guestId: 'GUEST002',
    propertyId: 'PROP001',
    roomTypeId: 'RT001',
    checkInDate: new Date('2025-01-10'),
    checkOutDate: new Date('2025-01-13'),
    adults: 1,
    children: 0,
    infants: 0,
    status: 'confirmed',
    rateCode: 'CORP',
    rateAmount: 249.00,
    totalAmount: 841.11,
    taxAmount: 93.38,
    serviceChargeAmount: 134.46,
    discountAmount: 0,
    paymentStatus: 'authorized',
    paymentMethod: 'Visa *9876',
    source: 'Corporate Portal',
    marketSegment: 'Corporate',
    specialRequests: ['Business center access', 'Healthy minibar options'],
    packageCodes: ['CORP_BREAKFAST'],
    guaranteeType: 'Credit Card',
    cancellationPolicy: 'Free cancellation until 6 PM day of arrival',
    created: new Date('2025-01-03T14:15:00'),
    modified: new Date('2025-01-03T14:15:00'),
    createdBy: 'PORTAL',
    modifiedBy: 'PORTAL',
    notes: ['Corporate account - XYZ Corp', 'Breakfast included']
  },
  {
    id: 'RES003',
    confirmationNumber: 'JV2025-4523',
    guestId: 'GUEST003',
    propertyId: 'PROP001',
    roomTypeId: 'RT003',
    roomId: 'ROOM3001',
    checkInDate: new Date('2025-01-07'),
    checkOutDate: new Date('2025-01-10'),
    adults: 2,
    children: 0,
    infants: 0,
    status: 'checked-in',
    rateCode: 'RACK',
    rateAmount: 599.00,
    totalAmount: 2023.47,
    taxAmount: 224.63,
    serviceChargeAmount: 323.46,
    discountAmount: 0,
    paymentStatus: 'paid',
    paymentMethod: 'Corporate Account',
    source: 'Direct Phone',
    marketSegment: 'Corporate',
    specialRequests: ['Butler service', 'Business newspapers', 'Express laundry'],
    packageCodes: ['EXEC_SUITE_PACKAGE'],
    guaranteeType: 'Corporate Account',
    cancellationPolicy: 'Free cancellation until 6 PM day of arrival',
    created: new Date('2025-01-05T16:45:00'),
    modified: new Date('2025-01-07T15:00:00'),
    createdBy: 'AGENT01',
    modifiedBy: 'FRONTDESK01',
    notes: ['CEO level guest - highest service standards', 'Butler assigned - James Thompson']
  },
  {
    id: 'RES004',
    confirmationNumber: 'JV2025-4524',
    guestId: 'GUEST001',
    propertyId: 'PROP001',
    roomTypeId: 'RT002',
    roomId: 'ROOM202',
    checkInDate: new Date('2025-01-15'),
    checkOutDate: new Date('2025-01-18'),
    adults: 2,
    children: 1,
    infants: 0,
    status: 'confirmed',
    rateCode: 'ADVANCE',
    rateAmount: 199.00,
    totalAmount: 672.21,
    taxAmount: 74.63,
    serviceChargeAmount: 107.46,
    discountAmount: 0,
    paymentStatus: 'paid',
    paymentMethod: 'Visa *5678',
    source: 'Booking.com',
    marketSegment: 'Leisure',
    specialRequests: ['Crib required', 'Connecting rooms if available', 'Early check-in'],
    packageCodes: [],
    guaranteeType: 'Prepaid',
    cancellationPolicy: 'Non-refundable',
    created: new Date('2024-12-28T09:20:00'),
    modified: new Date('2024-12-28T09:20:00'),
    createdBy: 'BOOKING_COM',
    modifiedBy: 'BOOKING_COM',
    notes: ['Family with infant - crib arranged', 'First time guests - welcome amenity prepared']
  }
];

// Mock Folios Data
export const MOCK_FOLIOS: Folio[] = [
  {
    id: 'FOLIO001',
    folioNumber: 'FOL-2025-001',
    reservationId: 'RES001',
    guestId: 'GUEST001',
    roomNumber: '201',
    checkInDate: new Date('2025-01-08'),
    status: 'open',
    balance: 456.75,
    totalCharges: 1867.84,
    totalPayments: 1500.00,
    totalCredits: 88.91,
    transactions: [
      {
        id: 'TXN001',
        folioId: 'FOLIO001',
        date: new Date('2025-01-08'),
        time: '15:30',
        type: 'room_charge',
        description: 'Room Charge - Deluxe Ocean View',
        amount: 389.00,
        quantity: 1,
        unitPrice: 389.00,
        departmentCode: 'ROOM',
        revenueCode: 'RM01',
        reference: 'JV2025-4521',
        postedBy: 'FRONTDESK01',
        notes: 'Check-in room charge'
      },
      {
        id: 'TXN002',
        folioId: 'FOLIO001',
        date: new Date('2025-01-08'),
        time: '15:31',
        type: 'tax',
        description: 'Room Tax 12.5%',
        amount: 48.63,
        quantity: 1,
        unitPrice: 48.63,
        departmentCode: 'TAX',
        revenueCode: 'TX01',
        reference: 'JV2025-4521',
        postedBy: 'SYSTEM',
        notes: 'Automatic tax posting'
      }
    ]
  }
];

// Housekeeping Data
export interface HousekeepingTask {
  id: string;
  roomNumber: string;
  taskType: 'checkout_cleaning' | 'maintenance_cleaning' | 'inspection' | 'deep_cleaning';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  estimatedDuration: number;
  actualDuration?: number;
  startTime?: Date;
  completedTime?: Date;
  notes: string[];
  checklistItems: {
    item: string;
    completed: boolean;
    notes?: string;
  }[];
}

export const MOCK_HOUSEKEEPING_TASKS: HousekeepingTask[] = [
  {
    id: 'HK001',
    roomNumber: '103',
    taskType: 'checkout_cleaning',
    priority: 'high',
    assignedTo: 'Maria Rodriguez',
    status: 'pending',
    estimatedDuration: 45,
    notes: ['Guest departed this morning', 'Extra cleaning needed'],
    checklistItems: [
      { item: 'Strip and remake beds', completed: false },
      { item: 'Clean bathroom', completed: false },
      { item: 'Vacuum floors', completed: false },
      { item: 'Dust furniture', completed: false },
      { item: 'Restock amenities', completed: false },
      { item: 'Check minibar', completed: false }
    ]
  },
  {
    id: 'HK002',
    roomNumber: '104',
    taskType: 'maintenance_cleaning',
    priority: 'urgent',
    assignedTo: 'James Wilson',
    status: 'in_progress',
    estimatedDuration: 90,
    startTime: new Date('2025-01-08T10:00:00'),
    notes: ['AC repair completed', 'Deep cleaning required'],
    checklistItems: [
      { item: 'Post-maintenance sanitization', completed: true },
      { item: 'Test all systems', completed: true },
      { item: 'Full room cleaning', completed: false },
      { item: 'Inspection required', completed: false }
    ]
  }
];

// Revenue Management Data
export interface RevenueData {
  date: Date;
  occupancyRate: number;
  adr: number;
  revpar: number;
  totalRevenue: number;
  roomRevenue: number;
  fbRevenue: number;
  otherRevenue: number;
  roomsSold: number;
  roomsAvailable: number;
}

export const MOCK_REVENUE_DATA: RevenueData[] = [
  {
    date: new Date('2025-01-01'),
    occupancyRate: 85.2,
    adr: 325.50,
    revpar: 277.33,
    totalRevenue: 98750.00,
    roomRevenue: 84588.50,
    fbRevenue: 12450.00,
    otherRevenue: 1711.50,
    roomsSold: 260,
    roomsAvailable: 305
  },
  {
    date: new Date('2025-01-02'),
    occupancyRate: 78.4,
    adr: 298.75,
    revpar: 234.22,
    totalRevenue: 85230.00,
    roomRevenue: 71479.00,
    fbRevenue: 11850.00,
    otherRevenue: 1901.00,
    roomsSold: 239,
    roomsAvailable: 305
  }
];

// Channel Manager Data
export interface ChannelData {
  id: string;
  name: string;
  type: 'OTA' | 'GDS' | 'Direct' | 'Corporate';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: Date;
  bookingsToday: number;
  revenueToday: number;
  commission: number;
  connectionHealth: number;
}

export const MOCK_CHANNELS: ChannelData[] = [
  {
    id: 'CH001',
    name: 'Booking.com',
    type: 'OTA',
    status: 'connected',
    lastSync: new Date('2025-01-08T14:30:00'),
    bookingsToday: 12,
    revenueToday: 4850.00,
    commission: 15.0,
    connectionHealth: 98
  },
  {
    id: 'CH002',
    name: 'Expedia',
    type: 'OTA',
    status: 'connected',
    lastSync: new Date('2025-01-08T14:25:00'),
    bookingsToday: 8,
    revenueToday: 3200.00,
    commission: 18.0,
    connectionHealth: 95
  },
  {
    id: 'CH003',
    name: 'Direct Website',
    type: 'Direct',
    status: 'connected',
    lastSync: new Date('2025-01-08T14:35:00'),
    bookingsToday: 15,
    revenueToday: 6750.00,
    commission: 0,
    connectionHealth: 100
  }
];

// Housekeeping Staff
export interface HousekeepingStaff {
  id: string;
  name: string;
  role: 'Head Housekeeper' | 'Housekeeper' | 'Maintenance';
  shift: string;
  status: 'active' | 'on_leave' | 'inactive';
  tasksAssigned: number;
  tasksCompleted: number;
  efficiency: number;
  phone: string;
}

export const MOCK_HOUSEKEEPING_STAFF: HousekeepingStaff[] = [
  {
    id: 'HK001',
    name: 'Maria Rodriguez',
    role: 'Head Housekeeper',
    shift: 'Morning (6 AM - 2 PM)',
    status: 'active',
    tasksAssigned: 8,
    tasksCompleted: 6,
    efficiency: 95,
    phone: '+1-555-001-0001'
  },
  {
    id: 'HK002',
    name: 'James Wilson',
    role: 'Housekeeper',
    shift: 'Morning (6 AM - 2 PM)',
    status: 'active',
    tasksAssigned: 12,
    tasksCompleted: 9,
    efficiency: 88,
    phone: '+1-555-001-0002'
  },
  {
    id: 'HK003',
    name: 'Ana Martinez',
    role: 'Housekeeper',
    shift: 'Evening (2 PM - 10 PM)',
    status: 'active',
    tasksAssigned: 10,
    tasksCompleted: 8,
    efficiency: 92,
    phone: '+1-555-001-0003'
  },
  {
    id: 'HK004',
    name: 'David Chen',
    role: 'Maintenance',
    shift: 'Morning (7 AM - 3 PM)',
    status: 'active',
    tasksAssigned: 3,
    tasksCompleted: 2,
    efficiency: 98,
    phone: '+1-555-001-0004'
  }
];

// Financial Data
export interface CityLedgerAccount {
  id: string;
  accountNumber: string;
  accountName: string;
  accountType: string;
  contactPerson: string;
  creditLimit: number;
  currentBalance: number;
  paymentTerms: number;
  status: string;
}

export const MOCK_CITY_LEDGER: CityLedgerAccount[] = [
  {
    id: 'CL001',
    accountNumber: 'CL-001',
    accountName: 'TechCorp Inc.',
    accountType: 'Corporate',
    contactPerson: 'Michael Davis',
    creditLimit: 50000,
    currentBalance: 15750.00,
    paymentTerms: 30,
    status: 'Active',
  },
];

export interface GLAccount {
  accountCode: string;
  accountName: string;
  accountType: string;
  balance: number;
  debitTotal: number;
  creditTotal: number;
  lastActivity: Date;
}

export const MOCK_GL_ACCOUNTS: GLAccount[] = [
  {
    accountCode: '1001',
    accountName: 'Cash - Operating Account',
    accountType: 'Asset',
    balance: 75300,
    debitTotal: 485750,
    creditTotal: 410450,
    lastActivity: new Date('2025-07-08'),
  },
];

export interface TaxConfiguration {
  id: string;
  taxName: string;
  taxCode: string;
  rate: number;
  type: string;
  applicableServices: string[];
  effectiveDate: Date;
}

export const MOCK_TAXES: TaxConfiguration[] = [
    {
      id: 'TAX001',
      taxName: 'City Tax',
      taxCode: 'CITY',
      rate: 3.5,
      type: 'Percentage',
      applicableServices: ['Room', 'Food & Beverage'],
      effectiveDate: new Date('2025-01-01'),
    },
];

export interface CurrencyRate {
  currency: string;
  currencyName: string;
  buyRate: number;
  sellRate: number;
  lastUpdated: Date;
}

export const MOCK_CURRENCY_RATES: CurrencyRate[] = [
  {
    currency: 'EUR',
    currencyName: 'Euro',
    buyRate: 1.085,
    sellRate: 1.095,
    lastUpdated: new Date(),
  },
];

// Event Management
export interface EventBooking {
  id: string;
  eventName: string;
  eventType: string;
  clientName: string;
  eventDate: Date;
  attendeeCount: number;
  status: string;
  totalRevenue: number;
}

export const MOCK_EVENT_BOOKINGS: EventBooking[] = [
  {
    id: 'EVT001',
    eventName: 'Corporate Annual Meeting',
    eventType: 'Corporate',
    clientName: 'TechCorp Inc.',
    eventDate: new Date('2025-07-15'),
    attendeeCount: 150,
    status: 'Confirmed',
    totalRevenue: 45000,
  },
  {
    id: 'EVT002',
    eventName: 'Wedding Reception',
    eventType: 'Wedding',
    clientName: 'Smith Family',
    eventDate: new Date('2025-07-20'),
    attendeeCount: 120,
    status: 'Tentative',
    totalRevenue: 35000,
  },
];

export interface FunctionSpace {
  id: string;
  name: string;
  type: string;
  capacity: { theater: number; banquet: number; reception: number };
  hourlyRate: number;
  available: boolean;
}

export const MOCK_FUNCTION_SPACES: FunctionSpace[] = [
  {
    id: 'FS001',
    name: 'Grand Ballroom',
    type: 'Ballroom',
    capacity: { theater: 500, banquet: 350, reception: 600 },
    hourlyRate: 2500,
    available: true,
  },
];

export interface CateringMenu {
  id: string;
  name: string;
  category: string;
  description: string;
  pricePerPerson: number;
  minimumGuests: number;
}

export const MOCK_CATERING_MENUS: CateringMenu[] = [
  {
    id: 'CM001',
    name: 'Executive Lunch Package',
    category: 'Lunch',
    description: 'Premium lunch service for corporate events',
    pricePerPerson: 45,
    minimumGuests: 20,
  },
];

// Night Audit
export interface NightAuditTask {
  id: number;
  name: string;
  status: 'completed' | 'running' | 'pending' | 'error' | 'warning';
  time: string;
}

export const MOCK_NIGHT_AUDIT_TASKS: NightAuditTask[] = [
  { id: 1, name: 'System Backup', status: 'completed', time: '23:45' },
  { id: 2, name: 'Room Revenue Posting', status: 'completed', time: '23:50' },
  { id: 3, name: 'City Ledger Processing', status: 'completed', time: '23:55' },
  { id: 4, name: 'Credit Card Settlements', status: 'running', time: '00:15' },
  { id: 5, name: 'No-Show Processing', status: 'pending', time: '00:30' },
  { id: 6, name: 'Rate & Availability Update', status: 'pending', time: '00:45' },
  { id: 7, name: 'Report Generation', status: 'pending', time: '01:00' },
];

// Reports
export interface Report {
  id: string;
  name: string;
  description: string;
  category: 'Daily Operations' | 'Management' | 'Financial' | 'Operational' | 'Analytics';
  lastRun: Date;
  format: string;
}

export const MOCK_DAILY_REPORTS: Report[] = [
    {
      id: 'arrivals',
      name: 'Arrivals Report',
      description: 'Today\'s expected arrivals with room assignments',
      category: 'Daily Operations',
      lastRun: new Date(),
      format: 'PDF, Excel',
    },
];

export const MOCK_FINANCIAL_REPORTS: Report[] = [
    {
      id: 'daily-revenue',
      name: 'Daily Revenue Report',
      description: 'Room revenue, F&B, and other income',
      category: 'Financial',
      lastRun: new Date(),
      format: 'PDF, Excel',
    },
];

export const MOCK_OPERATIONAL_REPORTS: Report[] = [
    {
      id: 'occupancy-forecast',
      name: 'Occupancy Forecast',
      description: '30-day occupancy and revenue projection',
      category: 'Operational',
      lastRun: new Date(),
      format: 'PDF, Excel',
    },
];

export const MOCK_ANALYTICS_REPORTS: Report[] = [
    {
      id: 'revenue-analysis',
      name: 'Revenue Analytics',
      description: 'ADR, RevPAR, and yield management',
      category: 'Analytics',
      lastRun: new Date(),
      format: 'PDF, Excel, Dashboard',
    },
];

// All mock data exported individually above 