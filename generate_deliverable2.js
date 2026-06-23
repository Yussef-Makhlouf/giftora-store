const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, LevelFormat, VerticalAlign, PageNumber
} = require('docx');
const fs = require('fs');

// ── helpers ──────────────────────────────────────────────────────────────────
const FONT   = "Times New Roman";
const SZ     = 24;   // 12 pt in half-points
const SZ_H1  = 28;
const SZ_H2  = 26;
const SZ_H3  = 24;
const BLACK  = "000000";
const BLUE   = "1F3864";
const GOLD   = "C17A67";
const LGRAY  = "F2F2F2";
const MGRAY  = "D9D9D9";

const cellBorder  = { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function p(text, opts = {}) {
  return new Paragraph({
    alignment: opts.center ? AlignmentType.CENTER : opts.right ? AlignmentType.RIGHT : AlignmentType.LEFT,
    spacing: { before: opts.spaceBefore ?? 80, after: opts.spaceAfter ?? 80, line: 360 },
    children: [new TextRun({
      text,
      font:      FONT,
      size:      opts.size ?? SZ,
      bold:      opts.bold ?? false,
      italic:    opts.italic ?? false,
      color:     opts.color ?? BLACK,
      underline: opts.underline ? {} : undefined,
    })]
  });
}

function h1(text) {
  return new Paragraph({
    spacing: { before: 320, after: 160, line: 360 },
    border:  { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 4 } },
    children: [new TextRun({ text, font: FONT, size: SZ_H1, bold: true, color: BLUE })]
  });
}

function h2(text) {
  return new Paragraph({
    spacing: { before: 240, after: 120, line: 360 },
    children: [new TextRun({ text, font: FONT, size: SZ_H2, bold: true, color: GOLD })]
  });
}

function h3(text) {
  return new Paragraph({
    spacing: { before: 180, after: 80, line: 360 },
    children: [new TextRun({ text, font: FONT, size: SZ_H3, bold: true, color: BLACK })]
  });
}

function bullet(text, subBullet = false) {
  return new Paragraph({
    numbering: { reference: "bullets", level: subBullet ? 1 : 0 },
    spacing:   { before: 60, after: 60, line: 360 },
    children:  [new TextRun({ text, font: FONT, size: SZ, color: BLACK })]
  });
}

function bulletBold(label, rest) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing:   { before: 60, after: 60, line: 360 },
    children: [
      new TextRun({ text: label, font: FONT, size: SZ, bold: true,  color: BLACK }),
      new TextRun({ text: rest,  font: FONT, size: SZ, bold: false, color: BLACK }),
    ]
  });
}

function blank(before = 40, after = 40) {
  return new Paragraph({ spacing: { before, after }, children: [new TextRun({ text: "", font: FONT, size: SZ })] });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function headerCell(text, width) {
  return new TableCell({
    borders: cellBorders,
    width:   { size: width, type: WidthType.DXA },
    shading: { fill: BLUE, type: ShadingType.CLEAR },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children:  [new TextRun({ text, font: FONT, size: 22, bold: true, color: "FFFFFF" })]
    })]
  });
}

function dataCell(text, width, shade = false, bold = false) {
  return new TableCell({
    borders: cellBorders,
    width:   { size: width, type: WidthType.DXA },
    shading: { fill: shade ? LGRAY : "FFFFFF", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 140, right: 140 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      children: [new TextRun({ text, font: FONT, size: 22, color: BLACK, bold })]
    })]
  });
}

function dataCellMultiLine(lines, width, shade = false) {
  return new TableCell({
    borders: cellBorders,
    width:   { size: width, type: WidthType.DXA },
    shading: { fill: shade ? LGRAY : "FFFFFF", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 140, right: 140 },
    verticalAlign: VerticalAlign.TOP,
    children: lines.map(({ text, bold }) =>
      new Paragraph({
        spacing: { before: 40, after: 40 },
        children: [new TextRun({ text: text ?? "", font: FONT, size: 20, color: BLACK, bold: bold ?? false })]
      })
    )
  });
}

// ── DOCUMENT ─────────────────────────────────────────────────────────────────
const doc = new Document({
  numbering: {
    config: [
      {
        reference: "bullets",
        levels: [
          { level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 720,  hanging: 360 } } } },
          { level: 1, format: LevelFormat.BULLET, text: "\u25E6", alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 1080, hanging: 360 } } } },
        ]
      }
    ]
  },
  styles: {
    default: {
      document: { run: { font: FONT, size: SZ, color: BLACK } }
    }
  },
  sections: [{
    properties: {
      page: {
        size:   { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    children: [

      // ══════════════════════════════════════════════════════════
      // COVER PAGE
      // ══════════════════════════════════════════════════════════
      blank(800),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:   { before: 0, after: 0 },
        children:  [new TextRun({ text: "QMIS 351: E-Commerce", font: FONT, size: 28, bold: true, color: BLUE })]
      }),
      blank(40),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing:   { before: 0, after: 0 },
        children:  [new TextRun({ text: "Deliverable 2: E-Commerce System Architecture & Data Specification", font: FONT, size: 28, bold: true, color: BLUE })]
      }),
      blank(120),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: {
          top:    { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 4 },
          bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 4 }
        },
        spacing: { before: 160, after: 160 },
        children: [new TextRun({ text: "Giftora — Premium Personalized Gifting Platform", font: FONT, size: 32, bold: true, color: GOLD })]
      }),
      blank(240),
      p("Course Name:   QMIS 351 — E-Commerce",      { center: true }),
      p("Section Number:   [Section #]",              { center: true }),
      blank(160),
      p("Group Members:",                             { center: true, bold: true }),
      p("[Student Name 1]   |   ID: [000000]",        { center: true }),
      p("[Student Name 2]   |   ID: [000000]",        { center: true }),
      p("[Student Name 3]   |   ID: [000000]",        { center: true }),
      p("[Student Name 4]   |   ID: [000000]",        { center: true }),
      blank(160),
      p("Instructor Name:   [Instructor Name]",       { center: true }),
      p("Submission Date:   June 28, 2026",           { center: true }),

      // ══════════════════════════════════════════════════════════
      // TABLE OF CONTENTS
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("Table of Contents"),
      blank(60),
      p("1. System Functionalities ................................................... 3",  {}),
      p("2. Information Requirements ................................................ 5",  {}),
      p("3. Logical Data Flow Diagram (DFD) ......................................... 7",  {}),
      p("4. Databases Required ....................................................... 8",  {}),
      p("Group Member Contributions ................................................ 11",  {}),
      p("AI Use Acknowledgment ..................................................... 11",  {}),

      // ══════════════════════════════════════════════════════════
      // SECTION 1: SYSTEM FUNCTIONALITIES
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("1. System Functionalities"),
      blank(40),
      p("Below is the list of core functionalities required for the Giftora e-commerce storefront and admin dashboard, detailing what each functionality does and why it is vital to the business."),
      blank(40),

      // 1. Browse Products
      h2("1. Browse Products"),
      bulletBold("Description: ", "Allows visitors to view the product catalog structured into categories (e.g., Gift Boxes, Mugs, Notebooks, Accessories, Home Decor, Stationery). The interface displays premium grid layouts featuring high-quality images, titles, pricing, and visual tags (e.g., Best Seller, New, Popular)."),
      bulletBold("Business Importance: ", "For a boutique B2C gift store like Giftora, purchase decisions are heavily visual. A clean, premium product catalog draws user interest, displays the scope of inventory, and establishes brand value from the first point of contact."),
      blank(40),

      // 2. Search Products
      h2("2. Search Products"),
      bulletBold("Description: ", "Enables customers to search the store using keywords (e.g., \"Notebook\", \"Terracotta\") and filter results by categories, availability of customization, or price ranges."),
      bulletBold("Business Importance: ", "Reduces user search friction. Shoppers who enter the site looking for a specific type of item can find it instantly, which increases overall storefront conversion rates and prevents bounce rates."),
      blank(40),

      // 3. Product Personalization
      h2("3. Product Personalization"),
      bulletBold("Description: ", "A custom user interface module displayed on the product details page of personalizable items. Customers can input custom strings (e.g., names, dates, or messages up to 50 characters) to be engraved, embroidered, or printed."),
      bulletBold("Business Importance: ", "This is the core value proposition of Giftora. Providing custom-tailored merchandise justifies higher retail markup margins and serves as a primary differentiator from generic gift shops in the region."),
      blank(40),

      // 4. Cart Management
      h2("4. Cart Management"),
      bulletBold("Description: ", "Tracks the selected items, selected personalization parameters, and desired quantities in the active shopping session. It automatically calculates subtotals and displays total items. State is persisted locally via localStorage so users do not lose their choices upon navigation."),
      bulletBold("Business Importance: ", "Acts as the critical transition step in the customer conversion funnel. By persisting selections and suggesting complementary bundles (e.g., showing a matching notebook for a mug), it increases the Average Order Value (AOV)."),
      blank(40),

      // 5. Checkout
      h2("5. Checkout"),
      bulletBold("Description: ", "A secure, simplified form capturing customer shipment data (Full Name, Email, Phone Number, Shipping Address, City) and optional delivery/order notes. It also displays a summary breakdown of cart contents, shipping fees, and taxes before order finalization."),
      bulletBold("Business Importance: ", "Directly translates user intent into closed sales. A clean checkout form prevents cart abandonment by minimizing user fatigue and streamlining data intake."),
      blank(40),

      // 6. Payments
      h2("6. Payments"),
      bulletBold("Description: ", "Processes order payments, offering options appropriate for the Kuwaiti market, including Card payments (K-Net/Credit Card), Direct Bank Transfer, or Cash on Delivery (COD)."),
      bulletBold("Business Importance: ", "Essential for revenue capture. Offering local payment methods (such as K-Net) builds local trust and accommodates different customer payment behaviors, widening the customer reach."),
      blank(40),

      // 7. Order Tracking
      h2("7. Order Tracking"),
      bulletBold("Description: ", "Provides the customer and management with real-time updates regarding order status (e.g., Pending, Processing, Completed, Cancelled). Post-purchase, the client receives estimated delivery timelines (e.g., next-day delivery in Kuwait) and preparation status."),
      bulletBold("Business Importance: ", "Enhances customer reassurance and transparency post-checkout, which dramatically reduces customer service query overhead (e.g., \"Where is my order?\" phone calls/emails)."),
      blank(40),

      // 8. Reviews
      h2("8. Reviews"),
      bulletBold("Description: ", "Displays customer-generated star ratings (1 to 5) and written feedback for each item. It can distinguish between general comments and reviews from verified purchasers."),
      bulletBold("Business Importance: ", "Builds social proof. In B2C sales, prospective buyers rely heavily on peer validation to confirm the quality of physical goods and the execution accuracy of personalized engravings."),
      blank(40),

      // 9. Admin Dashboard
      h2("9. Admin Dashboard"),
      bulletBold("Description: ", "A secure back-office interface for managers to track sales performance, review customer databases, modify product prices or stock numbers, manage order processing queues, and examine business health analytics."),
      bulletBold("Business Importance: ", "Simplifies the operational day-to-day work. It bridges the digital storefront with physical supply-chain fulfillment, enabling managers to adjust inventory levels and fulfill client customized orders efficiently."),

      // ══════════════════════════════════════════════════════════
      // SECTION 2: INFORMATION REQUIREMENTS
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("2. Information Requirements"),
      blank(40),
      p("The table below outlines the specific input and output data fields required to execute each system process and meet business goals."),
      blank(60),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1800, 2000, 5560],
        rows: [
          new TableRow({ children: [
            headerCell("Business Objective", 1800),
            headerCell("System Functionality", 2000),
            headerCell("Information Requirements (Inputs / Outputs)", 5560),
          ]}),
          new TableRow({ children: [
            dataCell("Display Catalog",       1800, true,  true),
            dataCell("Browse Products",       2000, true,  false),
            dataCellMultiLine([
              { text: "Inputs: Category filters, pagination clicks, sorting options.", bold: false },
              { text: "Outputs: Product ID, SKU, Slug, Name, Price (KD), Category, Primary Image URL, Secondary Gallery URLs, Badge (e.g., 'Best Seller'), Personalization Flag, Stock Quantity.", bold: false },
            ], 5560, true),
          ]}),
          new TableRow({ children: [
            dataCell("Locate Items",          1800, false, true),
            dataCell("Search Products",       2000, false, false),
            dataCellMultiLine([
              { text: "Inputs: Text query string, active category filter, price boundary constraints.", bold: false },
              { text: "Outputs: List of matching products, result count, matched search highlights, suggestion keywords.", bold: false },
            ], 5560, false),
          ]}),
          new TableRow({ children: [
            dataCell("Add Custom Value",      1800, true,  true),
            dataCell("Product Personalization", 2000, true, false),
            dataCellMultiLine([
              { text: "Inputs: Customer engraving text string (maximum 50 characters).", bold: false },
              { text: "Outputs: Custom text payload associated with the cart item, validation confirm/error (character length check).", bold: false },
            ], 5560, true),
          ]}),
          new TableRow({ children: [
            dataCell("Consolidate Purchase",  1800, false, true),
            dataCell("Cart Management",       2000, false, false),
            dataCellMultiLine([
              { text: "Inputs: Add to cart command, update quantity, item removal, clearance events.", bold: false },
              { text: "Outputs: Array of products, quantity per item, item subtotal (KD), global cart subtotal, total items count.", bold: false },
            ], 5560, false),
          ]}),
          new TableRow({ children: [
            dataCell("Finalize Checkout Info", 1800, true, true),
            dataCell("Checkout",              2000, true,  false),
            dataCellMultiLine([
              { text: "Inputs: Customer Full Name, Email, Phone, Delivery Address, City/Area, Order Notes.", bold: false },
              { text: "Outputs: Pending Order object, order breakdown summary, billing confirmation, customer contact payload.", bold: false },
            ], 5560, true),
          ]}),
          new TableRow({ children: [
            dataCell("Secure Store Revenue",  1800, false, true),
            dataCell("Payments",             2000, false, false),
            dataCellMultiLine([
              { text: "Inputs: Payment method choice (cash | bank | card), transaction credentials, amount to pay.", bold: false },
              { text: "Outputs: Payment status confirmation (success | fail), reference ID, transaction timestamp, payment receipt.", bold: false },
            ], 5560, false),
          ]}),
          new TableRow({ children: [
            dataCell("Update Customers",      1800, true,  true),
            dataCell("Order Tracking",        2000, true,  false),
            dataCellMultiLine([
              { text: "Inputs: Unique Order ID.", bold: false },
              { text: "Outputs: Current order status (pending | processing | completed | cancelled), shipping carrier name, dispatch time, estimated delivery date.", bold: false },
            ], 5560, true),
          ]}),
          new TableRow({ children: [
            dataCell("Verify Product Quality", 1800, false, true),
            dataCell("Reviews",               2000, false, false),
            dataCellMultiLine([
              { text: "Inputs: Star count (1–5), customer name, review message body, product reference ID.", bold: false },
              { text: "Outputs: Verified buyer indicator, review entry list, computed average rating score, total review count.", bold: false },
            ], 5560, false),
          ]}),
          new TableRow({ children: [
            dataCell("Manage Store Operations", 1800, true, true),
            dataCell("Admin Dashboard",       2000, true,  false),
            dataCellMultiLine([
              { text: "Inputs: Stock adjustments, order status modifications, custom product entries, login credentials.", bold: false },
              { text: "Outputs: Sales performance graphs, low-stock warnings, customer registry lists, active order queues.", bold: false },
            ], 5560, true),
          ]}),
        ]
      }),

      // ══════════════════════════════════════════════════════════
      // SECTION 3: LOGICAL DATA FLOW DIAGRAM
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("3. Logical Data Flow Diagram (DFD)"),
      blank(40),
      p("The following diagram illustrates how information flows between the external entities (Customer and Admin), the core application logic processes, and the database stores. Due to the format of this document, the DFD is described in structured textual form below."),
      blank(40),

      h2("External Entities"),
      bulletBold("Customer (External Entity): ", "Initiates all consumer-facing interactions — browsing, personalization, checkout, payment, and order tracking."),
      bulletBold("Admin / Manager (External Entity): ", "Manages back-office operations — authenticates into the dashboard, views analytics, updates inventory, and modifies order statuses."),
      blank(40),

      h2("Core Processes"),
      bulletBold("Website / Application (Core Process): ", "Central hub that orchestrates all data flows between entities and data stores. Handles business logic for cart, checkout, search, and admin views."),
      bulletBold("Payment Process (External System): ", "External payment gateway integration that receives payment tokens, processes transactions, and returns status/reference IDs."),
      bulletBold("Delivery Process (External System): ", "Third-party logistics (3PL) courier integration that receives order fulfillment requests and returns route status and tracking information."),
      blank(40),

      h2("Data Stores"),
      bulletBold("Product Database: ", "Queried for catalog data, stock availability, and inventory alerts."),
      bulletBold("Customer Database: ", "Stores and retrieves customer profiles, shipping addresses, and account history."),
      bulletBold("Order Database: ", "Persists order records, line items, payment status, and delivery tracking state."),
      blank(40),

      h2("Customer Data Flows"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [600, 5000, 3760],
        rows: [
          new TableRow({ children: [
            headerCell("#", 600),
            headerCell("Flow Description", 5000),
            headerCell("Direction", 3760),
          ]}),
          ...([
            ["1",  "Browse & Search Request",                       "Customer → Web App"],
            ["2",  "Query Catalog & Check Stock",                    "Web App → Product DB"],
            ["3",  "Catalog Data & Inventory Status",                "Product DB → Web App"],
            ["4",  "Display Product List / Details",                 "Web App → Customer"],
            ["5",  "Input Personalization & Add Items to Cart",      "Customer → Web App"],
            ["6",  "Submit Shipping & Billing Form",                 "Customer → Web App"],
            ["7",  "Create / Update Customer Profile",               "Web App → Customer DB"],
            ["8",  "Retrieve Customer Profile History",              "Customer DB → Web App"],
            ["9",  "Generate Order Record",                          "Web App → Order DB"],
            ["10", "Order ID & Details Confirmed",                   "Order DB → Web App"],
            ["11", "Send Payment Total & Token",                     "Web App → Payment Process"],
            ["12", "Return Gateway Status / Reference ID",           "Payment Process → Web App"],
            ["13", "Update Payment Status in Order",                 "Web App → Order DB"],
            ["14", "Fetch Orders to Fulfill",                        "Order DB → Delivery Process"],
            ["15", "Return Route Status & Tracking",                 "Delivery Process → Order DB"],
            ["16", "Output Order Invoice & Tracking Info",           "Web App → Customer"],
          ]).map(([num, desc, dir], i) => new TableRow({ children: [
            dataCell(num,  600,  i % 2 === 0),
            dataCell(desc, 5000, i % 2 === 0),
            dataCell(dir,  3760, i % 2 === 0),
          ]})),
        ]
      }),
      blank(60),

      h2("Admin Data Flows"),
      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [600, 5000, 3760],
        rows: [
          new TableRow({ children: [
            headerCell("#", 600),
            headerCell("Flow Description", 5000),
            headerCell("Direction", 3760),
          ]}),
          ...([
            ["A", "Authenticate & View Metrics",                  "Admin → Web App"],
            ["B", "Read Sales Analytics & Orders",                "Web App → Order DB"],
            ["C", "Read Customer Accounts",                       "Web App → Customer DB"],
            ["D", "Read Stock Alerts",                            "Web App → Product DB"],
            ["E", "Sales Metrics Data",                           "Order DB → Web App"],
            ["F", "Customer Demographics",                        "Customer DB → Web App"],
            ["G", "Stock Quantities",                             "Product DB → Web App"],
            ["H", "Display Dashboards & Metrics",                 "Web App → Admin"],
            ["I", "Update Inventory / Edit Prices",               "Admin → Web App"],
            ["J", "Save New Stock Levels",                        "Web App → Product DB"],
            ["K", "Update Order Status (Processing → Completed)", "Admin → Web App"],
            ["L", "Record Status Change",                         "Web App → Order DB"],
            ["M", "Dispatch Delivery Request",                    "Order DB → Delivery Process"],
          ]).map(([num, desc, dir], i) => new TableRow({ children: [
            dataCell(num,  600,  i % 2 === 0),
            dataCell(desc, 5000, i % 2 === 0),
            dataCell(dir,  3760, i % 2 === 0),
          ]})),
        ]
      }),

      // ══════════════════════════════════════════════════════════
      // SECTION 4: DATABASES REQUIRED
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("4. Databases Required"),
      blank(40),
      p("To persist store configurations, catalog settings, and transaction details, the system uses six logical databases."),
      blank(40),

      // DB 1 – Product
      h2("1. Product Database"),
      p("Stores the definition, structure, metadata, and visual assets of the store's products."),
      blank(40),
      bulletBold("Key Information Stored: ", "Product ID (primary key), SKU, URL Slug, Category, Title, Short Description, Long Description, Price (in KD), Badge (e.g. 'Best Seller'), Image URLs, Personalization Available (Boolean flag)."),
      bulletBold("Purpose: ", "Serves as the single source of truth for the shop grid, search logic, and product detail pages."),
      blank(40),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 1800, 1800, 3360],
        rows: [
          new TableRow({ children: [
            headerCell("Field Name",   2400),
            headerCell("Data Type",   1800),
            headerCell("Constraints", 1800),
            headerCell("Description", 3360),
          ]}),
          ...([
            ["product_id",          "INT",        "Primary Key, Auto-Increment", "Unique product identifier"],
            ["sku",                 "VARCHAR(50)", "Unique, Not Null",            "Stock-keeping unit code"],
            ["slug",                "VARCHAR(100)","Unique, Not Null",            "URL-friendly identifier"],
            ["category",            "VARCHAR(50)", "Not Null",                    "Product category name"],
            ["title",               "VARCHAR(150)","Not Null",                    "Display name of the product"],
            ["short_description",   "TEXT",        "Nullable",                   "Brief one-line summary"],
            ["long_description",    "TEXT",        "Nullable",                   "Full product description"],
            ["price",               "DECIMAL(8,3)","Not Null",                    "Price in KD"],
            ["badge",               "VARCHAR(30)", "Nullable",                   "Label e.g. 'Best Seller'"],
            ["image_url",           "TEXT",        "Not Null",                    "Primary product image URL"],
            ["gallery_urls",        "TEXT",        "Nullable",                   "JSON array of additional images"],
            ["personalization_flag","BOOLEAN",     "Default FALSE",               "Whether item is personalizable"],
            ["stock_quantity",      "INT",         "Default 0",                   "Current available stock"],
          ]).map(([f, t, c, d], i) => new TableRow({ children: [
            dataCell(f, 2400, i % 2 === 0),
            dataCell(t, 1800, i % 2 === 0),
            dataCell(c, 1800, i % 2 === 0),
            dataCell(d, 3360, i % 2 === 0),
          ]})),
        ]
      }),
      blank(60),

      // DB 2 – Customer
      h2("2. Customer Database"),
      p("Stores customer demographic details, authentication keys, and transaction history profiles."),
      blank(40),
      bulletBold("Key Information Stored: ", "Customer ID (primary key), Name, Email, Encrypted Password, Phone Number, Primary Shipping Address, Area/City, Date Registered, Status (Active/Suspended)."),
      bulletBold("Purpose: ", "Allows returning customers to check out faster, saves delivery locations, and keeps order history."),
      blank(40),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 1800, 1800, 3360],
        rows: [
          new TableRow({ children: [
            headerCell("Field Name",   2400),
            headerCell("Data Type",   1800),
            headerCell("Constraints", 1800),
            headerCell("Description", 3360),
          ]}),
          ...([
            ["customer_id",      "INT",         "Primary Key, Auto-Increment", "Unique customer identifier"],
            ["name",             "VARCHAR(100)", "Not Null",                    "Full name of the customer"],
            ["email",            "VARCHAR(150)", "Unique, Not Null",            "Login email address"],
            ["password_hash",    "VARCHAR(255)", "Not Null",                    "Bcrypt-encrypted password"],
            ["phone",            "VARCHAR(20)",  "Nullable",                   "Contact phone number"],
            ["shipping_address", "TEXT",         "Nullable",                   "Primary delivery address"],
            ["area_city",        "VARCHAR(80)",  "Nullable",                   "City or district in Kuwait"],
            ["date_registered",  "DATETIME",     "Default NOW()",               "Account creation timestamp"],
            ["status",           "ENUM",         "Default 'active'",            "active | suspended"],
          ]).map(([f, t, c, d], i) => new TableRow({ children: [
            dataCell(f, 2400, i % 2 === 0),
            dataCell(t, 1800, i % 2 === 0),
            dataCell(c, 1800, i % 2 === 0),
            dataCell(d, 3360, i % 2 === 0),
          ]})),
        ]
      }),
      blank(60),

      // DB 3 – Order
      h2("3. Order Database"),
      p("Tracks the purchase history, line items, shipping destinations, and tracking status."),
      blank(40),
      bulletBold("Key Information Stored (Orders Table): ", "Order ID (primary key), Customer ID (foreign key), Customer Name, Email, Phone, Shipping Address, City, Total Amount (KD), Order Notes, Order Status (pending, processing, completed, cancelled), Date Placed."),
      bulletBold("Key Information Stored (Order Line Items Table): ", "Order Item ID, Order ID, Product ID, Product Name, Quantity Ordered, Unit Price (KD), Personalization Text Input."),
      bulletBold("Purpose: ", "Critical for tracking execution, notifying delivery logistics, compiling sales analytics, and enabling post-sale customer support."),
      blank(40),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 1800, 1800, 3360],
        rows: [
          new TableRow({ children: [
            headerCell("Field Name",   2400),
            headerCell("Data Type",   1800),
            headerCell("Constraints", 1800),
            headerCell("Description", 3360),
          ]}),
          ...([
            ["order_id",         "INT",          "Primary Key, Auto-Increment",        "Unique order identifier"],
            ["customer_id",      "INT",          "Foreign Key → Customer DB, Nullable", "Reference to customer"],
            ["customer_name",    "VARCHAR(100)", "Not Null",                            "Name at time of order"],
            ["email",            "VARCHAR(150)", "Not Null",                            "Email at time of order"],
            ["phone",            "VARCHAR(20)",  "Nullable",                           "Phone at time of order"],
            ["shipping_address", "TEXT",         "Not Null",                            "Delivery address"],
            ["city",             "VARCHAR(80)",  "Not Null",                            "Delivery city/area"],
            ["total_amount",     "DECIMAL(8,3)", "Not Null",                            "Grand total in KD"],
            ["order_notes",      "TEXT",         "Nullable",                           "Customer delivery notes"],
            ["order_status",     "ENUM",         "Default 'pending'",                  "pending|processing|completed|cancelled"],
            ["date_placed",      "DATETIME",     "Default NOW()",                       "Order creation timestamp"],
            ["-- Line Items --", "",             "",                                    ""],
            ["order_item_id",    "INT",          "Primary Key, Auto-Increment",        "Unique line item ID"],
            ["order_id (FK)",    "INT",          "Foreign Key → Orders",                "Parent order reference"],
            ["product_id (FK)",  "INT",          "Foreign Key → Product DB",            "Product reference"],
            ["product_name",     "VARCHAR(150)", "Not Null",                            "Product name snapshot"],
            ["quantity",         "INT",          "Not Null, Min 1",                    "Quantity ordered"],
            ["unit_price",       "DECIMAL(8,3)", "Not Null",                            "Price per unit in KD"],
            ["personalization",  "VARCHAR(50)",  "Nullable",                           "Custom engraving text"],
          ]).map(([f, t, c, d], i) => new TableRow({ children: [
            dataCell(f, 2400, i % 2 === 0, f.startsWith("--")),
            dataCell(t, 1800, i % 2 === 0),
            dataCell(c, 1800, i % 2 === 0),
            dataCell(d, 3360, i % 2 === 0),
          ]})),
        ]
      }),
      blank(60),

      // DB 4 – Payment
      h2("4. Payment Database"),
      p("Records details of all monetary transactions conducted on the storefront."),
      blank(40),
      bulletBold("Key Information Stored: ", "Payment ID (primary key), Order ID (foreign key), Payment Method (cash, bank, card), Transaction Value (KD), Payment Status (pending, completed, failed, refunded), External Transaction Reference, Paid Timestamp."),
      bulletBold("Purpose: ", "Used for cash flow monitoring, sales audit reconciliation, and fraud prevention."),
      blank(40),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 1800, 1800, 3360],
        rows: [
          new TableRow({ children: [
            headerCell("Field Name",   2400),
            headerCell("Data Type",   1800),
            headerCell("Constraints", 1800),
            headerCell("Description", 3360),
          ]}),
          ...([
            ["payment_id",      "INT",          "Primary Key, Auto-Increment",  "Unique payment record ID"],
            ["order_id",        "INT",          "Foreign Key → Order DB",        "Associated order reference"],
            ["payment_method",  "ENUM",         "Not Null",                      "cash | bank | card"],
            ["amount",          "DECIMAL(8,3)", "Not Null",                      "Transaction value in KD"],
            ["payment_status",  "ENUM",         "Default 'pending'",             "pending|completed|failed|refunded"],
            ["reference_id",    "VARCHAR(100)", "Nullable",                      "External gateway reference"],
            ["paid_at",         "DATETIME",     "Nullable",                      "Timestamp of payment completion"],
          ]).map(([f, t, c, d], i) => new TableRow({ children: [
            dataCell(f, 2400, i % 2 === 0),
            dataCell(t, 1800, i % 2 === 0),
            dataCell(c, 1800, i % 2 === 0),
            dataCell(d, 3360, i % 2 === 0),
          ]})),
        ]
      }),
      blank(60),

      // DB 5 – Inventory
      h2("5. Inventory Database"),
      p("Manages product item availability and triggers warnings for restocks."),
      blank(40),
      bulletBold("Key Information Stored: ", "SKU (primary key), Product ID (foreign key), Total Stock Level, Safety Stock Margin, Restock Trigger Level, Last Stock Update Date, Current Status (in-stock, low-stock, out-of-stock)."),
      bulletBold("Purpose: ", "Syncs with checkout to decrease stock counts after purchases, prevents selling out-of-stock items, and warns the warehouse to replenish stock."),
      blank(40),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 1800, 1800, 3360],
        rows: [
          new TableRow({ children: [
            headerCell("Field Name",        2400),
            headerCell("Data Type",        1800),
            headerCell("Constraints",      1800),
            headerCell("Description",      3360),
          ]}),
          ...([
            ["sku",                "VARCHAR(50)", "Primary Key",                    "Stock-keeping unit (links to Product DB)"],
            ["product_id",         "INT",         "Foreign Key → Product DB",        "Product reference"],
            ["stock_level",        "INT",         "Default 0",                       "Current total available units"],
            ["safety_stock",       "INT",         "Default 5",                       "Minimum buffer before restock alert"],
            ["restock_trigger",    "INT",         "Default 10",                      "Level at which reorder is triggered"],
            ["last_updated",       "DATETIME",    "Default NOW()",                   "Last inventory update timestamp"],
            ["status",             "ENUM",        "Default 'in-stock'",              "in-stock | low-stock | out-of-stock"],
          ]).map(([f, t, c, d], i) => new TableRow({ children: [
            dataCell(f, 2400, i % 2 === 0),
            dataCell(t, 1800, i % 2 === 0),
            dataCell(c, 1800, i % 2 === 0),
            dataCell(d, 3360, i % 2 === 0),
          ]})),
        ]
      }),
      blank(60),

      // DB 6 – Reviews
      h2("6. Review / Rating Database"),
      p("Stores user feedback, star metrics, and reviews."),
      blank(40),
      bulletBold("Key Information Stored: ", "Review ID (primary key), Product ID (foreign key), Customer Name, Star Rating (integer value 1-5), Written Review text, Verified Purchase status, Creation Timestamp."),
      bulletBold("Purpose: ", "Powers reviews sections on product detail pages and determines average product ratings to drive customer conversion."),
      blank(40),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2400, 1800, 1800, 3360],
        rows: [
          new TableRow({ children: [
            headerCell("Field Name",     2400),
            headerCell("Data Type",     1800),
            headerCell("Constraints",   1800),
            headerCell("Description",   3360),
          ]}),
          ...([
            ["review_id",        "INT",         "Primary Key, Auto-Increment", "Unique review identifier"],
            ["product_id",       "INT",         "Foreign Key → Product DB",     "Reviewed product reference"],
            ["customer_name",    "VARCHAR(100)","Not Null",                     "Reviewer's display name"],
            ["star_rating",      "TINYINT",     "1–5, Not Null",               "Star rating (1 = lowest, 5 = highest)"],
            ["review_text",      "TEXT",        "Nullable",                    "Written review body"],
            ["verified_purchase","BOOLEAN",     "Default FALSE",                "True if reviewer completed a purchase"],
            ["created_at",       "DATETIME",    "Default NOW()",               "Review submission timestamp"],
          ]).map(([f, t, c, d], i) => new TableRow({ children: [
            dataCell(f, 2400, i % 2 === 0),
            dataCell(t, 1800, i % 2 === 0),
            dataCell(c, 1800, i % 2 === 0),
            dataCell(d, 3360, i % 2 === 0),
          ]})),
        ]
      }),

      // ══════════════════════════════════════════════════════════
      // GROUP CONTRIBUTIONS PAGE
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("Group Member Contributions"),
      blank(40),
      p("The following table outlines the individual contributions of each group member to this report:"),
      blank(60),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [1800, 2400, 5160],
        rows: [
          new TableRow({ children: [
            headerCell("Student ID",   1800),
            headerCell("Name",         2400),
            headerCell("Contribution", 5160),
          ]}),
          ...[1,2,3,4].map((n, i) => new TableRow({ children: [
            dataCell(`[ID ${n}]`,           1800, i % 2 === 0),
            dataCell(`[Student Name ${n}]`, 2400, i % 2 === 0),
            dataCell("[Describe contribution — e.g., drafted Section 1 System Functionalities, built DFD, designed database schemas, etc.]", 5160, i % 2 === 0),
          ]}))
        ]
      }),
      blank(80),
      p("All group members reviewed and approved the final version of this report prior to submission.", { italic: true }),

      blank(80),
      h1("AI Use Acknowledgment"),
      blank(40),
      p("In accordance with QMIS 351 course guidelines, the group acknowledges that AI tools were used during the preparation of this report for purposes of brainstorming, structural outlining, and editorial refinement of language. All system functionality descriptions, data flow diagrams, information requirement definitions, and database schema designs presented in this report reflect the group's own independent work and judgment. The final analytical conclusions and technical specifications were developed and verified by the group members."),

    ]
  }]
});

// ── Write to file ─────────────────────────────────────────────────────────────
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Giftora_Deliverable2_Report.docx", buffer);
  console.log("✅ Document written successfully: Giftora_Deliverable2_Report.docx");
}).catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
