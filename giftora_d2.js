const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, LevelFormat, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageBreak, PageNumber, Header, Footer,
  TabStopType, TabStopPosition
} = require('docx');
const fs = require('fs');

// ─── Color palette ───────────────────────────────────────────────────────────
const GOLD     = "B8860B";
const DARK     = "1A1A2E";
const MID_GRAY = "4A4A6A";
const LIGHT_BG = "FDF6EC";
const WHITE    = "FFFFFF";
const BORDER_C = "D4AF6E";
const HEADER_BG= "1A1A2E";
const ROW_ALT  = "FDF6EC";
const ACCENT   = "C17A67";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const sp = (before = 0, after = 0, line = null) => {
  const s = { before, after };
  if (line) s.line = line;
  return s;
};

const border = (color = BORDER_C, size = 6) => ({
  style: BorderStyle.SINGLE, size, color
});

const cellBorders = (color = BORDER_C) => ({
  top: border(color, 4), bottom: border(color, 4),
  left: border(color, 4), right: border(color, 4)
});

const cellMargins = { top: 100, bottom: 100, left: 140, right: 140 };

function heading1(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 32,
        color: DARK,
        font: "Times New Roman",
      })
    ],
    spacing: sp(360, 160),
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 6 }
    }
  });
}

function heading2(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 26,
        color: ACCENT,
        font: "Times New Roman",
      })
    ],
    spacing: sp(280, 120),
  });
}

function heading3(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: true,
        size: 24,
        color: MID_GRAY,
        font: "Times New Roman",
        italics: true
      })
    ],
    spacing: sp(200, 80),
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 24,
        color: opts.color || "2C2C2C",
        bold: opts.bold || false,
        font: "Times New Roman",
      })
    ],
    spacing: sp(100, 100),
    alignment: opts.align || AlignmentType.LEFT,
  });
}

function bullet(text, level = 0) {
  return new Paragraph({
    numbering: { reference: "bullets", level },
    children: [
      new TextRun({
        text,
        size: 24,
        color: "2C2C2C",
        font: "Times New Roman",
      })
    ],
    spacing: sp(60, 60),
  });
}

function emptyLine(n = 1) {
  return Array.from({ length: n }, () =>
    new Paragraph({ children: [new TextRun("")], spacing: sp(0, 0) })
  );
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ─── Header cell helper ──────────────────────────────────────────────────────
function hCell(text, width, color = HEADER_BG, textColor = WHITE) {
  return new TableCell({
    borders: cellBorders(BORDER_C),
    width: { size: width, type: WidthType.DXA },
    shading: { fill: color, type: ShadingType.CLEAR },
    margins: cellMargins,
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, bold: true, size: 22, color: textColor, font: "Times New Roman" })]
    })]
  });
}

function dCell(text, width, shade = false, bold = false, align = AlignmentType.LEFT) {
  return new TableCell({
    borders: cellBorders(BORDER_C),
    width: { size: width, type: WidthType.DXA },
    shading: { fill: shade ? ROW_ALT : WHITE, type: ShadingType.CLEAR },
    margins: cellMargins,
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, size: 22, bold, color: "2C2C2C", font: "Times New Roman" })]
    })]
  });
}

// ─── COVER PAGE ──────────────────────────────────────────────────────────────
const coverPage = [
  ...emptyLine(3),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "QMIS 351: E-Commerce Project", size: 28, color: MID_GRAY, font: "Times New Roman" })]
  }),
  ...emptyLine(1),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Deliverable 2", size: 44, bold: true, color: DARK, font: "Times New Roman" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: GOLD, space: 8 } },
    children: [new TextRun({ text: "System Functionalities & Logical Design", size: 34, bold: true, color: GOLD, font: "Times New Roman" })]
  }),
  ...emptyLine(2),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "🎁  Giftora", size: 52, bold: true, color: DARK, font: "Times New Roman" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Premium Personalized Gifting Platform — Kuwait", size: 26, color: ACCENT, italics: true, font: "Times New Roman" })]
  }),
  ...emptyLine(3),
  new Table({
    width: { size: 7200, type: WidthType.DXA },
    columnWidths: [2400, 4800],
    rows: [
      ["Course Name",     "QMIS 351: E-Commerce"],
      ["Section Number",  "Section ___"],
      ["Group Members",   "Member 1 — ID: _______\nMember 2 — ID: _______\nMember 3 — ID: _______\nMember 4 — ID: _______"],
      ["Instructor Name", "Dr. / Prof. ___________"],
      ["Submission Date", "9th of July, 2026"],
    ].map(([label, value], i) =>
      new TableRow({
        children: [
          new TableCell({
            borders: cellBorders(BORDER_C),
            width: { size: 2400, type: WidthType.DXA },
            shading: { fill: HEADER_BG, type: ShadingType.CLEAR },
            margins: cellMargins,
            children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 22, color: WHITE, font: "Times New Roman" })] })]
          }),
          new TableCell({
            borders: cellBorders(BORDER_C),
            width: { size: 4800, type: WidthType.DXA },
            shading: { fill: i % 2 === 0 ? WHITE : ROW_ALT, type: ShadingType.CLEAR },
            margins: cellMargins,
            children: value.split('\n').map(v =>
              new Paragraph({ children: [new TextRun({ text: v, size: 22, color: "2C2C2C", font: "Times New Roman" })] })
            )
          }),
        ]
      })
    )
  }),
  pageBreak()
];

// ─── SECTION 1: System Functionalities ───────────────────────────────────────
const functionalities = [
  {
    num: 1,
    name: "Homepage & Product Discovery",
    desc: "The homepage is the primary landing experience for all visitors. It showcases featured gift collections, seasonal promotions, and trending personalized products. It includes a hero banner, curated category tiles, bestseller highlights, and trust-building elements (reviews, delivery badges).",
    why: "Acts as the storefront window; sets the brand tone and guides customers toward relevant product categories, reducing bounce rate and increasing session depth."
  },
  {
    num: 2,
    name: "Product Catalog with Filtering & Search",
    desc: "A structured catalog organizing all Giftora products by category (Personalized Mugs, Custom Notebooks, Curated Gift Boxes, Accessory Packs). Customers can filter by price range, occasion type (Birthday, Corporate, Wedding), recipient, and customization availability. A full-text search bar supports keyword lookups.",
    why: "Enables customers to quickly locate exactly what they need from a broad inventory, reducing friction and increasing purchase intent."
  },
  {
    num: 3,
    name: "Product Personalization Engine",
    desc: "On each eligible product page, customers can input custom text, upload images or logos, select engraving styles, and instantly preview their customized product via a real-time digital mockup. Personalization options vary by product (mugs: name print; notebooks: cover text; boxes: message cards).",
    why: "Giftora's core differentiator. Personalization significantly raises the perceived value of each order and drives the premium pricing strategy outlined in the revenue model."
  },
  {
    num: 4,
    name: "Customer Registration & Login",
    desc: "Users can create accounts using email/password or via social sign-in (Google, Apple). Registered users gain access to order history, saved addresses, wishlist management, loyalty points, and faster repeat checkout.",
    why: "Account creation enables customer retention, personalized marketing, and order tracking—critical for building a loyal customer base in Kuwait's competitive gifting market."
  },
  {
    num: 5,
    name: "Shopping Cart",
    desc: "A persistent shopping cart that retains items across sessions. Displays product images, selected personalization details, unit prices, quantities, and running subtotal. Supports quantity edits, item removal, and saved-for-later functionality.",
    why: "A reliable cart reduces abandoned sessions and allows customers to curate multi-item orders—common for corporate (B2B) bulk purchases."
  },
  {
    num: 6,
    name: "Checkout & Order Placement",
    desc: "A multi-step checkout flow: (1) Delivery address selection/entry, (2) Shipping speed selection (Standard 2KD / Express 4KD / Same-Day 6KD), (3) Discount/promo code entry, (4) Order summary review, (5) Payment method selection and confirmation.",
    why: "A streamlined, transparent checkout process minimizes cart abandonment. Clear shipping options directly support Giftora's logistics revenue stream."
  },
  {
    num: 7,
    name: "Payment Processing",
    desc: "Integration with multiple payment gateways supporting KNET (Kuwait's national payment network), Visa/Mastercard, Apple Pay, and cash-on-delivery. All transactions are SSL-encrypted and PCI-DSS compliant.",
    why: "Offering localized payment methods—especially KNET—is non-negotiable for Kuwaiti consumers and directly drives conversion rates."
  },
  {
    num: 8,
    name: "Order Confirmation & Tracking",
    desc: "Upon successful payment, customers receive an automated email and WhatsApp confirmation containing order number, itemized summary, estimated delivery window, and a live tracking link connected to the courier partner's API.",
    why: "Post-purchase transparency reduces customer anxiety and support inquiries, while reinforcing Giftora's brand promise of reliability."
  },
  {
    num: 9,
    name: "Delivery & Shipping Information",
    desc: "A dedicated shipping information page details coverage areas (all Kuwait governorates), delivery tier options, estimated timeframes, and packaging standards. Special same-day cutoff times are clearly communicated.",
    why: "Kuwaiti customers prioritize fast, reliable delivery. Transparent delivery information is a key conversion factor and trust signal."
  },
  {
    num: 10,
    name: "Customer Service & Contact",
    desc: "A multi-channel support suite: (1) WhatsApp Business chat for real-time assistance and B2B consultations, (2) a structured contact form for general inquiries, (3) email support, and (4) an FAQ page covering returns, customization, and order issues.",
    why: "WhatsApp is the dominant consumer communication channel in Kuwait. Integrating it as the primary support channel aligns with local customer expectations."
  },
  {
    num: 11,
    name: "Customer Reviews & Ratings",
    desc: "Verified purchase reviews and a 5-star rating system on each product page. Customers who have completed an order are prompted post-delivery to submit a photo review. Review scores are aggregated and displayed prominently.",
    why: "Social proof is a powerful purchase trigger, particularly for a premium-priced product. Authentic reviews build trust with first-time buyers."
  },
  {
    num: 12,
    name: "Promotions & Discount Code Management",
    desc: "A promotions system supporting percentage-off codes, fixed-amount discounts, free-shipping coupons, and B2B volume-based pricing tiers. Promo codes can be time-limited and tied to specific product categories.",
    why: "Essential for driving first-time purchases and seasonal campaigns (Eid, National Day). Structured B2B discounts directly support the corporate sales arm."
  },
  {
    num: 13,
    name: "Inventory Management",
    desc: "Real-time inventory tracking for all stock-keeping units (SKUs). The system displays live stock levels on product pages ('Only 3 left!'), prevents overselling, triggers automatic low-stock alerts for the admin, and integrates with the fulfillment workflow.",
    why: "Prevents customer disappointment from out-of-stock orders, especially critical for time-sensitive occasions like birthdays and corporate events."
  },
  {
    num: 14,
    name: "Admin Dashboard",
    desc: "A secure back-office panel for Giftora staff enabling: product and inventory management, order processing and status updates, customer account management, analytics reporting (revenue, top products, conversion rates), and promotional code creation.",
    why: "Centralizes all operational management, allowing the Giftora team to run the business efficiently without requiring direct database access."
  },
];

const sec1 = [
  heading1("Section 1: System Functionalities"),
  body("This section identifies and explains all major functionalities required for the Giftora e-commerce platform. Each functionality is described in terms of what it does and its strategic importance to the Giftora business model."),
  ...emptyLine(1),
];

functionalities.forEach(f => {
  sec1.push(
    new Paragraph({
      children: [
        new TextRun({ text: `${f.num}.  ${f.name}`, bold: true, size: 26, color: DARK, font: "Times New Roman" })
      ],
      spacing: sp(240, 80),
      border: { left: { style: BorderStyle.SINGLE, size: 20, color: GOLD, space: 8 } },
      indent: { left: 200 }
    }),
    new Paragraph({
      children: [new TextRun({ text: "Description: ", bold: true, size: 22, color: MID_GRAY, font: "Times New Roman" }),
                 new TextRun({ text: f.desc, size: 22, color: "2C2C2C", font: "Times New Roman" })],
      spacing: sp(60, 60), indent: { left: 200 }
    }),
    new Paragraph({
      children: [new TextRun({ text: "Why It Matters: ", bold: true, size: 22, color: ACCENT, font: "Times New Roman" }),
                 new TextRun({ text: f.why, size: 22, color: "2C2C2C", font: "Times New Roman" })],
      spacing: sp(60, 160), indent: { left: 200 }
    }),
  );
});

sec1.push(pageBreak());

// ─── SECTION 2: Information Requirements ─────────────────────────────────────
const infoRows = [
  ["Display products & personalization options",   "Product Catalog",           "Product ID, name, description, category, base price, available customization options, stock level, product images, dimensions, materials"],
  ["Enable on-demand personalization",             "Personalization Engine",    "Customer input text, uploaded image file, selected font/color/style, product ID, personalization preview image, additional price"],
  ["Support user accounts & repeat purchases",    "Customer Registration/Login","Customer full name, email address, password (hashed), phone number, delivery addresses, account creation date, loyalty points balance"],
  ["Facilitate multi-item purchasing decisions",   "Shopping Cart",             "Session/user ID, product IDs, quantities, selected personalization details, unit prices, running subtotal, applied discount codes"],
  ["Execute transactions efficiently",            "Checkout & Order Placement", "Delivery address, selected shipping tier, promo code, order line items, total price, VAT (if applicable), order timestamp"],
  ["Process secure payments",                     "Payment Processing",         "Payment method type, transaction ID, amount, currency (KWD), payment status, KNET/card authorization code, timestamp"],
  ["Communicate order status to customers",       "Order Confirmation/Tracking","Order ID, customer contact details, itemized order summary, estimated delivery time, courier tracking ID, current status"],
  ["Manage fulfillment & delivery operations",    "Delivery Management",        "Delivery zone, recipient address, courier assignment, delivery tier, pickup time, delivery confirmation status"],
  ["Resolve customer issues efficiently",         "Customer Service",           "Customer name, email, order number (optional), message subject, message body, submission timestamp, support ticket ID"],
  ["Build social proof and buyer confidence",     "Reviews & Ratings",          "Customer ID, product ID, order ID (verified), star rating (1–5), review text, photo uploads, review date, verified purchase flag"],
  ["Drive conversions through promotional offers","Promotions & Discount Codes","Promo code string, discount type (%, fixed, free-ship), discount value, eligibility conditions, expiry date, usage count, maximum uses"],
  ["Prevent stockouts and overselling",           "Inventory Tracking",         "SKU ID, product variant, current stock quantity, reorder threshold, last restocked date, supplier reference, stock movement history"],
  ["Manage all business operations centrally",   "Admin Dashboard",            "All database records; aggregated metrics: daily revenue, orders, top-selling SKUs, conversion rate, low-stock alerts, customer acquisition data"],
];

const colW = [2200, 2200, 5000];
const totalW = 9400;

const sec2 = [
  heading1("Section 2: Information Requirements"),
  body("The table below maps each business objective to its corresponding system functionality and the specific data elements required by that system component."),
  ...emptyLine(1),
  new Table({
    width: { size: totalW, type: WidthType.DXA },
    columnWidths: colW,
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          hCell("Business Objective", colW[0]),
          hCell("System Functionality", colW[1]),
          hCell("Information Requirements", colW[2]),
        ]
      }),
      ...infoRows.map((row, i) =>
        new TableRow({
          children: row.map((cell, j) =>
            dCell(cell, colW[j], i % 2 !== 0, j === 1)
          )
        })
      )
    ]
  }),
  pageBreak()
];

// ─── SECTION 3: Logical DFD ───────────────────────────────────────────────────
const sec3 = [
  heading1("Section 3: Logical Data Flow Diagram (DFD)"),
  body("The diagram below illustrates the flow of information between all major actors, processes, and data stores within the Giftora e-commerce system. It is presented as a Context-Level DFD expanded to Level 1 to show internal process decomposition."),
  ...emptyLine(1),

  heading2("3.1  External Entities"),
  bullet("Customer (B2C/B2B): Initiates product searches, submits personalization data, places orders, and receives confirmations and delivery updates."),
  bullet("Admin / Manager: Manages inventory, processes orders, creates promotions, and accesses analytics."),
  bullet("Courier Partner (3PL): Receives fulfillment requests and returns delivery status updates."),
  bullet("Payment Gateway (KNET / Visa / Apple Pay): Receives payment authorization requests and returns transaction results."),
  ...emptyLine(1),

  heading2("3.2  Core Processes & Data Flows"),
  new Table({
    width: { size: 9400, type: WidthType.DXA },
    columnWidths: [800, 2400, 3100, 3100],
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          hCell("P#", 800),
          hCell("Process Name", 2400),
          hCell("Inputs (Data In)", 3100),
          hCell("Outputs (Data Out)", 3100),
        ]
      }),
      ...[
        ["P1","Product Browsing & Search","Search keywords, filter parameters (Customer)","Product list, catalog data, stock status → Customer"],
        ["P2","Personalization Processing","Custom text, images, product selection (Customer)","Preview image, personalization record → Cart / Customer"],
        ["P3","User Authentication","Login credentials, registration data (Customer)","Session token, customer profile → Customer DB"],
        ["P4","Cart Management","Product IDs, quantities, personalization refs (Customer)","Updated cart state, subtotal → Customer"],
        ["P5","Order Processing","Cart data, delivery address, shipping tier (Customer)","Order record → Order DB; fulfillment request → Courier"],
        ["P6","Payment Handling","Payment method, amount (Customer/Gateway)","Auth request → Payment Gateway; confirmation → Customer & Order DB"],
        ["P7","Order Fulfillment","Confirmed order, delivery details (Order DB)","Dispatch request → Courier; tracking ID → Customer"],
        ["P8","Customer Support","Inquiry/message (Customer)","Ticket record; WhatsApp/email response → Customer"],
        ["P9","Admin Management","Product data, promo codes, order updates (Admin)","Updated Product DB, Inventory DB, Order statuses"],
        ["P10","Analytics & Reporting","Order DB, Customer DB, Product DB (System)","Dashboards, KPI reports → Admin"],
      ].map(([p, name, inp, outp], i) =>
        new TableRow({
          children: [
            dCell(p, 800, i%2!==0, true, AlignmentType.CENTER),
            dCell(name, 2400, i%2!==0, true),
            dCell(inp, 3100, i%2!==0),
            dCell(outp, 3100, i%2!==0),
          ]
        })
      )
    ]
  }),
  ...emptyLine(1),

  heading2("3.3  DFD — Textual Representation"),
  body("The following narrative describes the data flow at Level 1 across the Giftora system. A formal visual DFD diagram should be drawn from this specification:"),
  ...emptyLine(1),
  new Paragraph({
    children: [new TextRun({ text: "[ CUSTOMER ]", bold: true, size: 22, color: DARK, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(80, 20)
  }),
  new Paragraph({
    children: [new TextRun({ text: "     ↓  search query / filters", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "[ P1: Browse & Search ] ←→ { Product DB }", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "     ↓  personalization inputs", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "[ P2: Personalization Engine ] → preview + record", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "     ↓  add to cart", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "[ P4: Cart Management ] → cart state", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "     ↓  checkout data", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "[ P5: Order Processing ] → { Order DB } → [ P7: Fulfillment ]", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "     ↓  payment request", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "[ P6: Payment Handling ] ←→ [ PAYMENT GATEWAY ]", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "     ↓  confirmed order", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "[ P7: Fulfillment ] → dispatch request → [ COURIER PARTNER ]", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 0)
  }),
  new Paragraph({
    children: [new TextRun({ text: "               ← delivery status ←", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 120)
  }),
  new Paragraph({
    children: [new TextRun({ text: "[ ADMIN ] ←→ [ P9: Admin Management ] ←→ { Product DB / Order DB / Inventory DB }", size: 20, color: MID_GRAY, font: "Courier New" })],
    indent: { left: 360 }, spacing: sp(0, 160)
  }),

  heading2("3.4  Data Stores Referenced in DFD"),
  bullet("{ Customer DB } — stores all registered user profiles, addresses, and authentication data"),
  bullet("{ Product DB } — stores product listings, descriptions, pricing, images, and personalization options"),
  bullet("{ Order DB } — stores all order records, line items, statuses, and delivery assignments"),
  bullet("{ Inventory DB } — stores real-time stock levels, SKU data, and reorder triggers"),
  bullet("{ Payment DB } — stores transaction logs, authorization codes, and payment method references"),
  bullet("{ Review DB } — stores verified customer reviews, ratings, and associated media uploads"),
  pageBreak()
];

// ─── SECTION 4: Databases ─────────────────────────────────────────────────────
const databases = [
  {
    name: "Customer Database",
    purpose: "Central repository of all registered user and corporate client data.",
    fields: [
      "customer_id (PK, UUID)",
      "full_name, email (unique), phone_number",
      "hashed_password",
      "account_type (B2C / B2B)",
      "saved_delivery_addresses (JSON array)",
      "loyalty_points_balance",
      "registration_date, last_login_timestamp",
      "marketing_opt_in (boolean)",
    ]
  },
  {
    name: "Product Database",
    purpose: "Master catalog of all Giftora products, including personalization configurations.",
    fields: [
      "product_id (PK), SKU_code",
      "product_name, description (long text)",
      "category (Mug / Notebook / Gift Box / Accessory Pack)",
      "base_price_KWD, personalization_fee_KWD",
      "image_urls (JSON array), thumbnail_url",
      "available_customizations (JSON: text, image, engraving)",
      "is_active (boolean), created_at, updated_at",
    ]
  },
  {
    name: "Order Database",
    purpose: "Comprehensive record of all customer transactions, from placement to delivery.",
    fields: [
      "order_id (PK, UUID), customer_id (FK)",
      "order_date, order_status (Pending/Processing/Shipped/Delivered/Cancelled)",
      "line_items (JSON: product_id, qty, personalization_data, unit_price)",
      "subtotal_KWD, shipping_fee_KWD, discount_amount_KWD, total_KWD",
      "delivery_address (JSON), shipping_tier (Standard/Express/Same-Day)",
      "courier_tracking_id, estimated_delivery_date, actual_delivery_date",
    ]
  },
  {
    name: "Payment Database",
    purpose: "Secure log of all financial transactions associated with orders.",
    fields: [
      "payment_id (PK), order_id (FK)",
      "payment_method (KNET / Visa / Mastercard / Apple Pay / COD)",
      "transaction_id (gateway reference), authorization_code",
      "amount_KWD, currency (KWD), payment_status (Success/Failed/Pending/Refunded)",
      "payment_timestamp, gateway_response_code",
    ]
  },
  {
    name: "Inventory Database",
    purpose: "Real-time tracking of stock levels across all product SKUs to prevent overselling.",
    fields: [
      "inventory_id (PK), product_id (FK), SKU_code",
      "current_stock_quantity, reorder_threshold",
      "last_restocked_date, supplier_reference",
      "stock_movement_log (JSON: change_type, quantity_delta, timestamp)",
    ]
  },
  {
    name: "Review & Rating Database",
    purpose: "Stores verified customer reviews and star ratings to build social proof.",
    fields: [
      "review_id (PK), product_id (FK), customer_id (FK), order_id (FK)",
      "star_rating (1–5, integer), review_title, review_body (text)",
      "photo_urls (JSON array), is_verified_purchase (boolean)",
      "review_date, admin_approved (boolean), helpful_votes_count",
    ]
  },
  {
    name: "Promotions Database",
    purpose: "Manages all active and historical discount codes and promotional campaigns.",
    fields: [
      "promo_id (PK), promo_code (unique string)",
      "discount_type (percentage / fixed_amount / free_shipping)",
      "discount_value, applicable_categories (JSON array)",
      "minimum_order_value_KWD, expiry_date",
      "max_uses, current_use_count, is_active (boolean)",
      "created_by (admin_id FK), created_at",
    ]
  },
];

const sec4 = [
  heading1("Section 4: Databases Required"),
  body("Giftora's e-commerce system requires seven distinct relational databases. Each is described below with its purpose and primary data fields. These databases are designed to support the full order lifecycle, from product discovery through to post-delivery review."),
  ...emptyLine(1),
];

databases.forEach((db, i) => {
  sec4.push(
    new Paragraph({
      children: [
        new TextRun({ text: `Database ${i + 1}:  ${db.name}`, bold: true, size: 26, color: DARK, font: "Times New Roman" })
      ],
      spacing: sp(240, 80),
      shading: { fill: i % 2 === 0 ? LIGHT_BG : WHITE, type: ShadingType.CLEAR },
      border: { left: { style: BorderStyle.SINGLE, size: 20, color: GOLD, space: 8 } },
      indent: { left: 200 }
    }),
    new Paragraph({
      children: [new TextRun({ text: "Purpose: ", bold: true, size: 22, color: ACCENT, font: "Times New Roman" }),
                 new TextRun({ text: db.purpose, size: 22, color: "2C2C2C", font: "Times New Roman" })],
      spacing: sp(60, 60), indent: { left: 200 }
    }),
    new Paragraph({
      children: [new TextRun({ text: "Key Fields:", bold: true, size: 22, color: MID_GRAY, font: "Times New Roman" })],
      spacing: sp(60, 40), indent: { left: 200 }
    }),
    ...db.fields.map(f =>
      new Paragraph({
        numbering: { reference: "bullets", level: 0 },
        children: [new TextRun({ text: f, size: 22, color: "2C2C2C", font: "Times New Roman", font: "Courier New" })],
        spacing: sp(40, 40), indent: { left: 560 }
      })
    ),
    ...emptyLine(1)
  );
});

// ─── CONTRIBUTION PAGE ────────────────────────────────────────────────────────
const contribPage = [
  pageBreak(),
  heading1("Group Member Contributions"),
  body("The following table outlines the contribution of each group member to this deliverable, as required by the project guidelines."),
  ...emptyLine(1),
  new Table({
    width: { size: 9400, type: WidthType.DXA },
    columnWidths: [1000, 2500, 2500, 3400],
    rows: [
      new TableRow({
        tableHeader: true,
        children: [
          hCell("#", 1000),
          hCell("Member Name", 2500),
          hCell("Student ID", 2500),
          hCell("Contribution", 3400),
        ]
      }),
      ...[
        ["1", "___________________", "___________", "Section 1: System Functionalities (items 1–7)"],
        ["2", "___________________", "___________", "Section 1: System Functionalities (items 8–14)"],
        ["3", "___________________", "___________", "Section 2: Information Requirements Table & Section 3: DFD"],
        ["4", "___________________", "___________", "Section 4: Database Identification & Report Compilation"],
      ].map(([n, name, id, contrib], i) =>
        new TableRow({
          children: [
            dCell(n, 1000, i%2!==0, true, AlignmentType.CENTER),
            dCell(name, 2500, i%2!==0),
            dCell(id, 2500, i%2!==0),
            dCell(contrib, 3400, i%2!==0),
          ]
        })
      )
    ]
  }),
  ...emptyLine(2),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "AI Use Acknowledgment", bold: true, size: 24, color: DARK, font: "Times New Roman" })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "AI tools (Claude by Anthropic) were used to assist with brainstorming, structuring, and editing this report. All business analysis, functional decisions, and database design reflect the group's own academic work.", size: 20, color: MID_GRAY, italics: true, font: "Times New Roman" })]
  }),
];

// ─── ASSEMBLE DOCUMENT ────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: "▸",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: {
      document: { run: { font: "Times New Roman", size: 24, color: "2C2C2C" } }
    }
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1260, right: 1260, bottom: 1260, left: 1260 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [
              new TextRun({ text: "QMIS 351  |  Giftora — Deliverable 2  |  System Functionalities & Logical Design", size: 18, color: MID_GRAY, font: "Times New Roman" }),
            ],
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 4 } },
            alignment: AlignmentType.RIGHT,
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            border: { top: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 4 } },
            children: [
              new TextRun({ text: "Page ", size: 18, color: MID_GRAY, font: "Times New Roman" }),
              new TextRun({ children: [PageNumber.CURRENT], size: 18, color: GOLD, font: "Times New Roman" }),
              new TextRun({ text: "  |  Giftora — Kuwait  |  Premium Personalized Gifting", size: 18, color: MID_GRAY, font: "Times New Roman" }),
            ]
          })
        ]
      })
    },
    children: [
      ...coverPage,
      ...sec1,
      ...sec2,
      ...sec3,
      ...sec4,
      ...contribPage,
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('Giftora_Deliverable2_v2.docx', buffer);
  console.log('✅  Document created successfully.');
});
