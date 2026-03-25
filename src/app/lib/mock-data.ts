export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  paymentStatus: "paid" | "pending" | "refunded";
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  prescription?: {
    id: string;
    verified: boolean;
    url: string;
  };
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  requiresPrescription: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  requiresPrescription: boolean;
  supplier: string;
  status: "active" | "inactive" | "out-of-stock";
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
  status: "active" | "inactive";
}

export const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: {
      id: "c1",
      name: "Anna Svensson",
      email: "anna.svensson@email.se",
      phone: "+46 70 123 45 67",
    },
    items: [
      {
        id: "i1",
        productId: "p1",
        name: "Alvedon 500mg (20 tablets)",
        quantity: 2,
        price: 45,
        requiresPrescription: false,
      },
      {
        id: "i2",
        productId: "p2",
        name: "Lipitor 20mg (30 tablets)",
        quantity: 1,
        price: 150,
        requiresPrescription: true,
      },
    ],
    status: "processing",
    total: 240,
    paymentStatus: "paid",
    createdAt: "2024-03-24T10:30:00",
    updatedAt: "2024-03-24T11:00:00",
    shippingAddress: {
      street: "Storgatan 12",
      city: "Stockholm",
      postalCode: "11451",
      country: "Sweden",
    },
    prescription: {
      id: "rx1",
      verified: true,
      url: "#",
    },
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customer: {
      id: "c2",
      name: "Erik Johansson",
      email: "erik.j@email.se",
      phone: "+46 70 234 56 78",
    },
    items: [
      {
        id: "i3",
        productId: "p3",
        name: "Voltaren Gel 50g",
        quantity: 1,
        price: 89,
        requiresPrescription: false,
      },
      {
        id: "i4",
        productId: "p4",
        name: "Omega-3 1000mg (60 capsules)",
        quantity: 2,
        price: 120,
        requiresPrescription: false,
      },
    ],
    status: "shipped",
    total: 329,
    paymentStatus: "paid",
    createdAt: "2024-03-23T14:20:00",
    updatedAt: "2024-03-24T09:15:00",
    shippingAddress: {
      street: "Kungsgatan 45",
      city: "Göteborg",
      postalCode: "41119",
      country: "Sweden",
    },
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customer: {
      id: "c3",
      name: "Maria Andersson",
      email: "maria.a@email.se",
      phone: "+46 70 345 67 89",
    },
    items: [
      {
        id: "i5",
        productId: "p5",
        name: "Treo 500mg (20 tablets)",
        quantity: 1,
        price: 42,
        requiresPrescription: false,
      },
    ],
    status: "delivered",
    total: 42,
    paymentStatus: "paid",
    createdAt: "2024-03-22T08:45:00",
    updatedAt: "2024-03-23T16:30:00",
    shippingAddress: {
      street: "Drottninggatan 78",
      city: "Malmö",
      postalCode: "21136",
      country: "Sweden",
    },
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customer: {
      id: "c4",
      name: "Lars Nilsson",
      email: "lars.n@email.se",
      phone: "+46 70 456 78 90",
    },
    items: [
      {
        id: "i6",
        productId: "p6",
        name: "Losec 20mg (28 tablets)",
        quantity: 1,
        price: 185,
        requiresPrescription: true,
      },
    ],
    status: "pending",
    total: 185,
    paymentStatus: "pending",
    createdAt: "2024-03-25T09:00:00",
    updatedAt: "2024-03-25T09:00:00",
    shippingAddress: {
      street: "Vasagatan 23",
      city: "Uppsala",
      postalCode: "75320",
      country: "Sweden",
    },
    prescription: {
      id: "rx2",
      verified: false,
      url: "#",
    },
  },
  {
    id: "5",
    orderNumber: "ORD-2024-005",
    customer: {
      id: "c5",
      name: "Sofia Berg",
      email: "sofia.berg@email.se",
      phone: "+46 70 567 89 01",
    },
    items: [
      {
        id: "i7",
        productId: "p7",
        name: "Loratadin 10mg (30 tablets)",
        quantity: 1,
        price: 68,
        requiresPrescription: false,
      },
      {
        id: "i8",
        productId: "p8",
        name: "Vitamin D 1000 IE (100 tablets)",
        quantity: 1,
        price: 95,
        requiresPrescription: false,
      },
    ],
    status: "processing",
    total: 163,
    paymentStatus: "paid",
    createdAt: "2024-03-24T15:30:00",
    updatedAt: "2024-03-25T08:00:00",
    shippingAddress: {
      street: "Linnégatan 56",
      city: "Stockholm",
      postalCode: "11457",
      country: "Sweden",
    },
  },
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Alvedon 500mg (20 tablets)",
    category: "Pain Relief",
    price: 45,
    stock: 450,
    sku: "ALV-500-20",
    requiresPrescription: false,
    supplier: "GSK",
    status: "active",
    description: "Paracetamol for pain and fever relief",
  },
  {
    id: "p2",
    name: "Lipitor 20mg (30 tablets)",
    category: "Cardiovascular",
    price: 150,
    stock: 120,
    sku: "LIP-20-30",
    requiresPrescription: true,
    supplier: "Pfizer",
    status: "active",
    description: "Atorvastatin for cholesterol management",
  },
  {
    id: "p3",
    name: "Voltaren Gel 50g",
    category: "Pain Relief",
    price: 89,
    stock: 230,
    sku: "VOL-GEL-50",
    requiresPrescription: false,
    supplier: "Novartis",
    status: "active",
    description: "Topical anti-inflammatory gel",
  },
  {
    id: "p4",
    name: "Omega-3 1000mg (60 capsules)",
    category: "Supplements",
    price: 120,
    stock: 340,
    sku: "OMG-1000-60",
    requiresPrescription: false,
    supplier: "Nordic Naturals",
    status: "active",
    description: "Essential fatty acids supplement",
  },
  {
    id: "p5",
    name: "Treo 500mg (20 tablets)",
    category: "Pain Relief",
    price: 42,
    stock: 15,
    sku: "TRO-500-20",
    requiresPrescription: false,
    supplier: "GSK",
    status: "active",
    description: "Paracetamol and caffeine for pain relief",
  },
  {
    id: "p6",
    name: "Losec 20mg (28 tablets)",
    category: "Digestive Health",
    price: 185,
    stock: 95,
    sku: "LOS-20-28",
    requiresPrescription: true,
    supplier: "AstraZeneca",
    status: "active",
    description: "Omeprazole for acid reflux",
  },
  {
    id: "p7",
    name: "Loratadin 10mg (30 tablets)",
    category: "Allergy",
    price: 68,
    stock: 280,
    sku: "LOR-10-30",
    requiresPrescription: false,
    supplier: "Teva",
    status: "active",
    description: "Antihistamine for allergy relief",
  },
  {
    id: "p8",
    name: "Vitamin D 1000 IE (100 tablets)",
    category: "Supplements",
    price: 95,
    stock: 0,
    sku: "VIT-D-1000",
    requiresPrescription: false,
    supplier: "Pfizer",
    status: "out-of-stock",
    description: "Vitamin D supplement",
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "c1",
    name: "Anna Svensson",
    email: "anna.svensson@email.se",
    phone: "+46 70 123 45 67",
    totalOrders: 12,
    totalSpent: 3450,
    joinedAt: "2023-05-15",
    status: "active",
  },
  {
    id: "c2",
    name: "Erik Johansson",
    email: "erik.j@email.se",
    phone: "+46 70 234 56 78",
    totalOrders: 8,
    totalSpent: 2150,
    joinedAt: "2023-08-22",
    status: "active",
  },
  {
    id: "c3",
    name: "Maria Andersson",
    email: "maria.a@email.se",
    phone: "+46 70 345 67 89",
    totalOrders: 5,
    totalSpent: 890,
    joinedAt: "2023-11-10",
    status: "active",
  },
  {
    id: "c4",
    name: "Lars Nilsson",
    email: "lars.n@email.se",
    phone: "+46 70 456 78 90",
    totalOrders: 15,
    totalSpent: 5200,
    joinedAt: "2023-02-28",
    status: "active",
  },
  {
    id: "c5",
    name: "Sofia Berg",
    email: "sofia.berg@email.se",
    phone: "+46 70 567 89 01",
    totalOrders: 3,
    totalSpent: 567,
    joinedAt: "2024-01-05",
    status: "active",
  },
];

export const analyticsData = {
  revenue: [
    { month: "Oct", value: 45000 },
    { month: "Nov", value: 52000 },
    { month: "Dec", value: 48000 },
    { month: "Jan", value: 61000 },
    { month: "Feb", value: 58000 },
    { month: "Mar", value: 67000 },
  ],
  orders: [
    { month: "Oct", value: 234 },
    { month: "Nov", value: 289 },
    { month: "Dec", value: 267 },
    { month: "Jan", value: 312 },
    { month: "Feb", value: 298 },
    { month: "Mar", value: 345 },
  ],
  categoryBreakdown: [
    { name: "Pain Relief", value: 35 },
    { name: "Supplements", value: 25 },
    { name: "Cardiovascular", value: 15 },
    { name: "Allergy", value: 12 },
    { name: "Digestive Health", value: 13 },
  ],
};
