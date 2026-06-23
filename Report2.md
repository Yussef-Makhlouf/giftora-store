# Report 2: E-Commerce System Architecture & Data Specification

**Project:** Giftora Store (B2C Personalized Gift Shop, Kuwait)  
**Currencies:** KD (Kuwaiti Dinar)  
**Target Architecture:** Next.js, TypeScript, Tailwind CSS, Local Storage/Relational Database

---

## 1. System Functionalities

Below is the list of core functionalities required for the Giftora e-commerce storefront and admin dashboard, detailing what each functionality does and why it is vital to the business.

### 1. Browse Products
*   **Description:** Allows visitors to view the product catalog structured into categories (e.g., *Gift Boxes*, *Mugs*, *Notebooks*, *Accessories*, *Home Decor*, *Stationery*). The interface displays premium grid layouts featuring high-quality images, titles, pricing, and visual tags (e.g., `Best Seller`, `New`, `Popular`).
*   **Business Importance:** For a boutique B2C gift store like Giftora, purchase decisions are heavily visual. A clean, premium product catalog draws user interest, displays the scope of inventory, and establishes brand value from the first point of contact.

### 2. Search Products
*   **Description:** Enables customers to search the store using keywords (e.g., "Notebook", "Terracotta") and filter results by categories, availability of customization, or price ranges.
*   **Business Importance:** Reduces user search friction. Shoppers who enter the site looking for a specific type of item can find it instantly, which increases overall storefront conversion rates and prevents bounce rates.

### 3. Product Personalization
*   **Description:** A custom user interface module displayed on the product details page of personalizable items. Customers can input custom strings (e.g., names, dates, or messages up to 50 characters) to be engraved, embroidered, or printed.
*   **Business Importance:** This is the core value proposition of Giftora. Providing custom-tailored merchandise justifies higher retail markup margins and serves as a primary differentiator from generic gift shops in the region.

### 4. Cart Management
*   **Description:** Tracks the selected items, selected personalization parameters, and desired quantities in the active shopping session. It automatically calculates subtotals and displays total items. State is persisted locally via `localStorage` so users do not lose their choices upon navigation.
*   **Business Importance:** Acts as the critical transition step in the customer conversion funnel. By persisting selections and suggesting complementary bundles (e.g., showing a matching notebook for a mug), it increases the Average Order Value (AOV).

### 5. Checkout
*   **Description:** A secure, simplified form capturing customer shipment data (Full Name, Email, Phone Number, Shipping Address, City) and optional delivery/order notes. It also displays a summary breakdown of cart contents, shipping fees, and taxes before order finalization.
*   **Business Importance:** Directly translates user intent into closed sales. A clean checkout form prevents cart abandonment by minimizing user fatigue and streamlining data intake.

### 6. Payments
*   **Description:** Processes order payments, offering options appropriate for the Kuwaiti market, including Card payments (K-Net/Credit Card), Direct Bank Transfer, or Cash on Delivery (COD).
*   **Business Importance:** Essential for revenue capture. Offering local payment methods (such as K-Net) builds local trust and accommodates different customer payment behaviors, widening the customer reach.

### 7. Order Tracking
*   **Description:** Provides the customer and management with real-time updates regarding order status (e.g., `Pending`, `Processing`, `Completed`, `Cancelled`). Post-purchase, the client receives estimated delivery timelines (e.g., next-day delivery in Kuwait) and preparation status.
*   **Business Importance:** Enhances customer reassurance and transparency post-checkout, which dramatically reduces customer service query overhead (e.g., "Where is my order?" phone calls/emails).

### 8. Reviews
*   **Description:** Displays customer-generated star ratings (1 to 5) and written feedback for each item. It can distinguish between general comments and reviews from verified purchasers.
*   **Business Importance:** Builds social proof. In B2C sales, prospective buyers rely heavily on peer validation to confirm the quality of physical goods and the execution accuracy of personalized engravings.

### 9. Admin Dashboard
*   **Description:** A secure back-office interface for managers to track sales performance, review customer databases, modify product prices or stock numbers, manage order processing queues, and examine business health analytics.
*   **Business Importance:** Simplifies the operational day-to-day work. It bridges the digital storefront with physical supply-chain fulfillment, enabling managers to adjust inventory levels and fulfill client customized orders efficiently.

---

## 2. Information Requirements

The table below outlines the specific input and output data fields required to execute each system process and meet business goals.

| Business Objective | System Functionality | Information Requirements (Inputs/Outputs) |
| :--- | :--- | :--- |
| **Display Catalog** | Browse Products | **Inputs:** Category filters, pagination clicks, sorting options.<br>**Outputs:** Product ID, SKU, Slug, Name, Price (KD), Category, Primary Image URL, Secondary Gallery URLs, Badge (e.g., 'Best Seller'), Personalization Flag, Stock Quantity. |
| **Locate Items** | Search Products | **Inputs:** Text query string, active category filter, price boundary constraints.<br>**Outputs:** List of matching products, result count, matched search highlights, suggestion keywords. |
| **Add Custom Value** | Product Personalization | **Inputs:** Customer engraving text string (maximum 50 characters).<br>**Outputs:** Custom text payload associated with the cart item, validation confirm/error (character length check). |
| **Consolidate Purchase** | Cart Management | **Inputs:** Add to cart command, update quantity, item removal, clearance events.<br>**Outputs:** Array of products, quantity per item, item subtotal (KD), global cart subtotal, total items count. |
| **Finalize Checkout Info** | Checkout | **Inputs:** Customer Full Name, Email, Phone, Delivery Address, City/Area, Order Notes.<br>**Outputs:** Pending Order object, order breakdown summary, billing confirmation, customer contact payload. |
| **Secure Store Revenue** | Payments | **Inputs:** Payment method choice (`cash` \| `bank` \| `card`), transaction credentials, amount to pay.<br>**Outputs:** Payment status confirmation (`success` \| `fail`), reference ID, transaction timestamp, payment receipt. |
| **Update Customers** | Order Tracking | **Inputs:** Unique Order ID.<br>**Outputs:** Current order status (`pending` \| `processing` \| `completed` \| `cancelled`), shipping carrier name, dispatch time, estimated delivery date. |
| **Verify Product Quality** | Reviews | **Inputs:** Star count (1–5), customer name, review message body, product reference ID.<br>**Outputs:** Verified buyer indicator, review entry list, computed average rating score, total review count. |
| **Manage Store Operations** | Admin Dashboard | **Inputs:** Stock adjustments, order status modifications, custom product entries, login credentials.<br>**Outputs:** Sales performance graphs, low-stock warnings, customer registry lists, active order queues. |

---

## 3. Logical Data Flow Diagram (DFD)

The following diagram illustrates how information flows between the external entities (Customer and Admin), the core application logic processes, and the database stores.

```mermaid
graph TD
    %% Entities
    Customer["Customer (External Entity)"]
    Admin["Admin/Manager (External Entity)"]

    %% Processes
    WebApp["Website/Application (Core Process)"]
    PayProc["Payment Process (External System)"]
    DelivProc["Delivery Process (External System)"]

    %% Databases
    ProdDB[("Product Database (Data Store)")]
    CustDB[("Customer Database (Data Store)")]
    OrderDB[("Order Database (Data Store)")]

    %% Data Flows
    Customer -->|1. Browse & Search Request| WebApp
    WebApp -->|2. Query Catalog & Check Stock| ProdDB
    ProdDB -->|3. Catalog Data & Inventory Status| WebApp
    WebApp -->|4. Display Product List / Details| Customer

    Customer -->|5. Input Personalization & Add items| WebApp
    Customer -->|6. Submit Shipping & Billing Form| WebApp
    
    WebApp -->|7. Create / Update Profile| CustDB
    CustDB -->|8. Retrieve Customer Profile History| WebApp

    WebApp -->|9. Generate Order Record| OrderDB
    OrderDB -->|10. Order ID & Details Confirmed| WebApp
    
    WebApp -->|11. Send Payment Total & Token| PayProc
    PayProc -->|12. Return Gateway Status / Ref ID| WebApp
    WebApp -->|13. Update Payment Status| OrderDB

    OrderDB -->|14. Fetch Orders to Fulfill| DelivProc
    DelivProc -->|15. Return Route Status & Tracking| OrderDB
    
    WebApp -->|16. Output Order Invoice & Tracking| Customer

    %% Admin flows
    Admin -->|A. Authenticate & View Metrics| WebApp
    WebApp -->|B. Read Sales Analytics & Orders| OrderDB
    WebApp -->|C. Read Customer Accounts| CustDB
    WebApp -->|D. Read Stock Alerts| ProdDB
    
    OrderDB -->|E. Sales Metrics Data| WebApp
    CustDB -->|F. Customer Demographics| WebApp
    ProdDB -->|G. Stock Quantities| WebApp
    
    WebApp -->|H. Display Dashboards & Metrics| Admin
    
    Admin -->|I. Update Inventory / Edit Prices| WebApp
    WebApp -->|J. Save New Stock Levels| ProdDB
    
    Admin -->|K. Update Order Status (Processing -> Completed)| WebApp
    WebApp -->|L. Record Status Change| OrderDB
    OrderDB -->|M. Dispatch Delivery Request| DelivProc
```

---

## 4. Databases Required

To persist store configurations, catalog settings, and transaction details, the system uses six logical databases.

### 1. Product Database
Stores the definition, structure, metadata, and visual assets of the store's products.
*   **Key Information Stored:** Product ID (primary key), SKU, URL Slug, Category, Title, Short Description, Long Description, Price (in KD), Badge (e.g. 'Best Seller'), Image URLs, Personalization Available (Boolean flag).
*   **Purpose:** Serves as the single source of truth for the shop grid, search logic, and product detail pages.

### 2. Customer Database
Stores customer demographic details, authentication keys, and transaction history profiles.
*   **Key Information Stored:** Customer ID (primary key), Name, Email, Encrypted Password, Phone Number, Primary Shipping Address, Area/City, Date Registered, Status (Active/Suspended).
*   **Purpose:** Allows returning customers to check out faster, saves delivery locations, and keeps order history.

### 3. Order Database
Tracks the purchase history, line items, shipping destinations, and tracking status.
*   **Key Information Stored:** Order ID (primary key), Customer ID (foreign key), Customer Name, Email, Phone, Shipping Address, City, Total Amount (KD), Order Notes, Order Status (`pending`, `processing`, `completed`, `cancelled`), Date Placed.
*   **Order Line Items Table (Associated Schema):** Order Item ID, Order ID, Product ID, Product Name, Quantity Ordered, Unit Price (KD), Personalization Text Input.
*   **Purpose:** Critical for tracking execution, notifying delivery logistics, compiling sales analytics, and enabling post-sale customer support.

### 4. Payment Database
Records details of all monetary transactions conducted on the storefront.
*   **Key Information Stored:** Payment ID (primary key), Order ID (foreign key), Payment Method (`cash`, `bank`, `card`), Transaction Value (KD), Payment Status (`pending`, `completed`, `failed`, `refunded`), External Transaction Reference, Paid Timestamp.
*   **Purpose:** Used for cash flow monitoring, sales audit reconciliation, and fraud prevention.

### 5. Inventory Database
Manages product items availability and triggers warnings for restocks.
*   **Key Information Stored:** SKU (primary key), Product ID (foreign key), Total Stock Level, Safety Stock Margin, Restock Trigger Level, Last Stock Update Date, Current Status (`in-stock`, `low-stock`, `out-of-stock`).
*   **Purpose:** Syncs with checkout to decrease stock counts after purchases, prevents selling out-of-stock items, and warns the warehouse to replenish stock.

### 6. Review/Rating Database
Stores user feedback, star metrics, and reviews.
*   **Key Information Stored:** Review ID (primary key), Product ID (foreign key), Customer Name, Star Rating (integer value 1-5), Written Review text, Verified Purchase status, Creation Timestamp.
*   **Purpose:** Powers reviews sections on product detail pages and determines average product ratings to drive customer conversion.
