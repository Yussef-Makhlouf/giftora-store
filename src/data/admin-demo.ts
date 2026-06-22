export const adminDemoData = {
  intro: "This dashboard preview demonstrates the administrative and operational management capabilities of the Giftora e-commerce system. This MVP interface shows how store owners can monitor sales, track inventory, and manage orders in a production environment.",
  
  metrics: [
    {
      label: "Total Products",
      value: "10",
      icon: "Package",
      trend: null
    },
    {
      label: "Total Orders",
      value: "45",
      icon: "ShoppingBag",
      trend: "+12% this month"
    },
    {
      label: "Pending Orders",
      value: "8",
      icon: "Clock",
      trend: null
    },
    {
      label: "Completed Orders",
      value: "37",
      icon: "CheckCircle",
      trend: "+8 this week"
    },
    {
      label: "Monthly Revenue",
      value: "2,450 KD",
      icon: "DollarSign",
      trend: "+18% vs last month"
    },
    {
      label: "Low Stock Items",
      value: "3",
      icon: "AlertTriangle",
      trend: "Needs attention"
    }
  ],
  
  recentOrders: [
    {
      id: "ORD-1048",
      customerName: "Fatima Al-Sabah",
      date: "2026-06-22",
      total: "25 KD",
      status: "Completed",
      items: 1
    },
    {
      id: "ORD-1047",
      customerName: "Ahmed Al-Mutairi",
      date: "2026-06-22",
      total: "18 KD",
      status: "Processing",
      items: 1
    },
    {
      id: "ORD-1046",
      customerName: "Sara Al-Rashid",
      date: "2026-06-21",
      total: "42 KD",
      status: "Completed",
      items: 3
    },
    {
      id: "ORD-1045",
      customerName: "Mohammed Al-Dosari",
      date: "2026-06-21",
      total: "20 KD",
      status: "Shipped",
      items: 1
    },
    {
      id: "ORD-1044",
      customerName: "Noura Al-Fahad",
      date: "2026-06-20",
      total: "15 KD",
      status: "Completed",
      items: 1
    },
    {
      id: "ORD-1043",
      customerName: "Khalid Al-Shammari",
      date: "2026-06-20",
      total: "37 KD",
      status: "Processing",
      items: 2
    },
    {
      id: "ORD-1042",
      customerName: "Hessa Al-Ajmi",
      date: "2026-06-19",
      total: "22 KD",
      status: "Completed",
      items: 1
    },
    {
      id: "ORD-1041",
      customerName: "Bader Al-Anzi",
      date: "2026-06-19",
      total: "13 KD",
      status: "Completed",
      items: 2
    }
  ],
  
  inventory: [
    {
      id: "gb-001",
      productName: "Graduation Gift Box",
      sku: "GB-001",
      category: "Gift Boxes",
      stock: 15,
      status: "In Stock"
    },
    {
      id: "gb-002",
      productName: "Birthday Celebration Box",
      sku: "GB-002",
      category: "Gift Boxes",
      stock: 22,
      status: "In Stock"
    },
    {
      id: "gb-003",
      productName: "Thank You Gift Box",
      sku: "GB-003",
      category: "Gift Boxes",
      stock: 18,
      status: "In Stock"
    },
    {
      id: "gb-004",
      productName: "Self-Care Gift Box",
      sku: "GB-004",
      category: "Gift Boxes",
      stock: 12,
      status: "In Stock"
    },
    {
      id: "gb-005",
      productName: "Chocolate & Flowers Box",
      sku: "GB-005",
      category: "Gift Boxes",
      stock: 20,
      status: "In Stock"
    },
    {
      id: "mg-001",
      productName: "Personalized Mug",
      sku: "MG-001",
      category: "Mugs",
      stock: 50,
      status: "In Stock"
    },
    {
      id: "nb-001",
      productName: "Personalized Notebook",
      sku: "NB-001",
      category: "Notebooks",
      stock: 35,
      status: "In Stock"
    },
    {
      id: "ac-001",
      productName: "Custom Name Keychain",
      sku: "AC-001",
      category: "Accessories",
      stock: 60,
      status: "In Stock"
    },
    {
      id: "gb-006",
      productName: "Office Gift Set",
      sku: "GB-006",
      category: "Gift Boxes",
      stock: 14,
      status: "In Stock"
    },
    {
      id: "gb-007",
      productName: "Couple Gift Box",
      sku: "GB-007",
      category: "Gift Boxes",
      stock: 8,
      status: "Low Stock"
    }
  ],
  
  quickActions: [
    {
      title: "Add Product",
      description: "Create new product listing",
      icon: "PlusCircle"
    },
    {
      title: "View Orders",
      description: "Manage all customer orders",
      icon: "ShoppingBag"
    },
    {
      title: "Update Inventory",
      description: "Adjust stock quantities",
      icon: "Package"
    },
    {
      title: "Manage Categories",
      description: "Edit product categories",
      icon: "Tags"
    },
    {
      title: "Export Sales Report",
      description: "Download revenue data",
      icon: "Download"
    },
    {
      title: "Customer Support",
      description: "View support tickets",
      icon: "MessageCircle"
    }
  ]
};
