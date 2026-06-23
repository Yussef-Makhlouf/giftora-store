const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  PageBreak, LevelFormat, VerticalAlign, PageNumber
} = require('docx');
const fs = require('fs'); 

// ── helpers ──────────────────────────────────────────────────────────────────
const FONT = "Times New Roman";
const SZ   = 24; // 12 pt in half-points
const SZ_H1 = 28;
const SZ_H2 = 26;
const BLACK = "000000";
const BLUE  = "1F3864";
const GOLD  = "C17A67";
const LGRAY = "F2F2F2";
const MGRAY = "D9D9D9";

const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };

function p(text, opts = {}) {
  return new Paragraph({
    alignment: opts.center ? AlignmentType.CENTER : opts.right ? AlignmentType.RIGHT : AlignmentType.LEFT,
    spacing: { before: opts.spaceBefore ?? 80, after: opts.spaceAfter ?? 80, line: 360 },
    children: [new TextRun({
      text,
      font: FONT,
      size: opts.size ?? SZ,
      bold: opts.bold ?? false,
      italic: opts.italic ?? false,
      color: opts.color ?? BLACK,
      underline: opts.underline ? {} : undefined,
    })]
  });
}

function h1(text) {
  return new Paragraph({
    spacing: { before: 320, after: 160, line: 360 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 4 } },
    children: [new TextRun({ text, font: FONT, size: SZ_H1, bold: true, color: BLUE })]
  });
}

function h2(text) {
  return new Paragraph({
    spacing: { before: 240, after: 120, line: 360 },
    children: [new TextRun({ text, font: FONT, size: SZ_H2, bold: true, color: GOLD })]
  });
}

function bullet(text, subBullet = false) {
  return new Paragraph({
    numbering: { reference: "bullets", level: subBullet ? 1 : 0 },
    spacing: { before: 60, after: 60, line: 360 },
    children: [new TextRun({ text, font: FONT, size: SZ, color: BLACK })]
  });
}

function bulletBold(label, rest) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 60, after: 60, line: 360 },
    children: [
      new TextRun({ text: label, font: FONT, size: SZ, bold: true, color: BLACK }),
      new TextRun({ text: rest, font: FONT, size: SZ, color: BLACK }),
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
    width: { size: width, type: WidthType.DXA },
    shading: { fill: BLUE, type: ShadingType.CLEAR },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text, font: FONT, size: 22, bold: true, color: "FFFFFF" })]
    })]
  });
}

function dataCell(text, width, shade = false, bold = false) {
  return new TableCell({
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    shading: { fill: shade ? LGRAY : "FFFFFF", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 140, right: 140 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      children: [new TextRun({ text, font: FONT, size: 22, color: BLACK, bold })]
    })]
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
            style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
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
        size: { width: 12240, height: 15840 },
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
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: "QMIS 351: E-Commerce", font: FONT, size: 28, bold: true, color: BLUE })]
      }),
      blank(40),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 0, after: 0 },
        children: [new TextRun({ text: "Deliverable 1: E-Commerce Business Idea and Business Model", font: FONT, size: 28, bold: true, color: BLUE })]
      }),
      blank(120),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 4 },
                  bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 4 } },
        spacing: { before: 160, after: 160 },
        children: [new TextRun({ text: "Giftora — Premium Personalized Gifting Platform", font: FONT, size: 32, bold: true, color: GOLD })]
      }),
      blank(240),
      p("Course Name:   QMIS 351 — E-Commerce", { center: true }),
      p("Section Number:   [Section #]", { center: true }),
      blank(160),
      p("Group Members:", { center: true, bold: true }),
      p("[Student Name 1]   |   ID: [000000]", { center: true }),
      p("[Student Name 2]   |   ID: [000000]", { center: true }),
      p("[Student Name 3]   |   ID: [000000]", { center: true }),
      p("[Student Name 4]   |   ID: [000000]", { center: true }),
      blank(160),
      p("Instructor Name:   [Instructor Name]", { center: true }),
      p("Submission Date:   June 28, 2026", { center: true }),

      // ══════════════════════════════════════════════════════════
      // TABLE OF CONTENTS (manual)
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("Table of Contents"),
      blank(60),
      p("1. Business Idea ............................................................... 3", {}),
      p("2. Business Model ............................................................. 5", {}),
      p("3. Revenue Model ............................................................... 7", {}),
      p("Group Member Contributions ................................................... 10", {}),
      p("AI Use Acknowledgment ........................................................ 10", {}),

      // ══════════════════════════════════════════════════════════
      // SECTION 1: BUSINESS IDEA
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("1. Business Idea"),
      blank(40),

      h2("1.1 Business Name"),
      p("Giftora"),
      blank(40),

      h2("1.2 Product or Service Offered"),
      p("Giftora is an end-to-end e-commerce platform specializing in premium personalized gifts and curated gift boxes. The platform offers the following core product categories:"),
      blank(40),
      bullet("Pre-Curated Gift Boxes: Thoughtfully assembled thematic boxes for occasions such as birthdays, graduations, Eid, and corporate events."),
      bullet("Personalized Accessories: Custom-printed mugs, notebooks, engraved keychains, and photo frames with instant digital preview."),
      bullet("Luxury Gift Wrapping & Cards: Professional wrapping, ribbon selection, and handwritten or printed greeting cards bundled with every order."),
      bullet("Corporate Gifting Packages: Branded onboarding packs, client appreciation gifts, and bulk event merchandise tailored for Kuwaiti businesses."),
      blank(40),
      p("Every product is professionally packaged and delivered directly to the recipient's doorstep anywhere in Kuwait within 2 to 24 hours, depending on the chosen delivery tier."),
      blank(40),

      h2("1.3 Target Customers"),
      p("Giftora serves two primary customer segments:"),
      blank(40),
      bulletBold("Convenience-Seeking B2C Consumers: ", "Tech-savvy youth and busy young professionals in Kuwait, aged 18 to 45, who value convenience, aesthetic presentation, and fast delivery for personal gifting occasions — including birthdays, anniversaries, graduations, and national holidays."),
      bulletBold("Corporate B2B Clients: ", "Kuwaiti businesses, startups, government institutions, and HR departments seeking high-quality, branded gifting solutions for employee onboarding, client appreciation, and seasonal corporate events."),
      blank(40),

      h2("1.4 Customer Problem or Need"),
      p("Gift-giving is a deeply rooted cultural tradition in Kuwait, spanning personal, social, and professional contexts. Despite this cultural importance, consumers currently face four critical pain points in the market:"),
      blank(40),
      bulletBold("Fragmented Search Experience: ", "Locating a unique, high-quality gift requires visiting multiple physical malls or browsing disconnected Instagram vendor accounts with no standardized quality assurance."),
      bulletBold("Absence of Meaningful Personalization: ", "Mass-produced retail gifts lack emotional resonance. The few custom printing services that exist are characterized by long lead times, rigid ordering processes, and poor visual design quality."),
      bulletBold("Packaging and Presentation Gap: ", "Beautiful gift wrapping and card curation are rarely integrated with the actual purchase process, forcing customers to coordinate across multiple vendors."),
      bulletBold("Unreliable Delivery: ", "In Kuwait's fast-paced urban environment, reliable same-day or next-day delivery is a critical expectation that most small gifting vendors consistently fail to fulfill."),
      blank(40),

      h2("1.5 Value Proposition"),
      p("Giftora's core value proposition can be summarized as follows: one platform, zero compromise — from selection and personalization through premium packaging to guaranteed express delivery."),
      blank(40),
      p("The specific pillars of this value proposition are:"),
      blank(40),
      bulletBold("Curated Simplicity: ", "Customers choose from intelligently pre-assembled gift boxes, eliminating the cognitive burden of gift coordination without sacrificing quality or meaning."),
      bulletBold("On-Demand Personalization: ", "A low-friction digital customization interface allows customers to add names, photos, and personal messages with a real-time visual preview before purchase, ensuring the gift feels uniquely theirs."),
      bulletBold("Premium Unboxing Experience: ", "Every order is dispatched in aesthetically designed, sustainable packaging that elevates the perceived value and emotional impact of the gift upon delivery."),
      bulletBold("Logistical Excellence: ", "Giftora offers a tiered delivery structure — Standard (2 KD), Next-Day Express (4 KD), and Same-Day Urgent (6 KD) — providing customers with complete control over delivery timing across all major governorates in Kuwait."),
      blank(40),

      h2("1.6 Type of E-Commerce"),
      p("Giftora operates primarily as a Business-to-Consumer (B2C) e-commerce platform, with a dedicated Business-to-Business (B2B) corporate gifting arm. The platform also incorporates elements of:"),
      blank(40),
      bulletBold("Social Commerce: ", "Instagram and TikTok are used as active discovery and sales channels, enabling product showcase, influencer-driven campaigns, and direct link-to-purchase functionality."),
      bulletBold("Mobile Commerce (m-Commerce): ", "The platform is fully optimized for mobile devices, recognizing that a significant portion of Kuwait's consumer purchasing behavior takes place on smartphones."),
      bulletBold("Local Commerce: ", "Giftora operates exclusively within Kuwait, with a physical showroom in Salmiya enabling in-person browsing, pickup, and B2B consultations."),

      // ══════════════════════════════════════════════════════════
      // SECTION 2: BUSINESS MODEL
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("2. Business Model"),
      blank(40),
      p("Giftora operates under a Direct-to-Consumer (D2C) retail model with a secondary Business-to-Business (B2B) corporate gifting arm. The business creates, curates, personalizes, and delivers premium gift products directly to end customers through a proprietary digital platform, eliminating traditional retail intermediaries."),
      blank(40),

      h2("2.1 How the Business Creates Value"),
      p("Giftora creates value at three distinct levels:"),
      blank(40),
      bulletBold("Product Value: ", "By sourcing raw materials in bulk from wholesale manufacturers and local artisans, applying in-house personalization (printing, engraving, card design), and assembling products into cohesive, aesthetically premium gift sets, Giftora transforms low-cost raw inputs into high-perceived-value finished gifts commanding a gross margin in excess of 65%."),
      bulletBold("Experiential Value: ", "The digitally seamless customization journey — from product selection through live preview to luxury packaging selection — makes the act of gifting as pleasurable as receiving. This experiential dimension is a key differentiator versus commodity retail alternatives."),
      bulletBold("Logistical Value: ", "Giftora's tiered express delivery infrastructure, built on contracted third-party logistics partners, ensures that time-sensitive gifting occasions are never missed, creating reliability trust that converts first-time buyers into repeat customers."),
      blank(40),

      h2("2.2 How Customers Find and Interact with the Business"),
      p("Customer acquisition and interaction occurs through multiple touchpoints:"),
      blank(40),
      bulletBold("Proprietary E-Commerce Storefront: ", "The primary hub for product discovery, real-time customization, cart management, and checkout. Built for intuitive self-service with a mobile-first design."),
      bulletBold("Social Media (Instagram & TikTok): ", "Active brand presence and paid advertising campaigns drive organic and paid traffic to the storefront. Unboxing content, influencer gifting collaborations, and user-generated content (UGC) campaigns create aspirational brand awareness."),
      bulletBold("WhatsApp Business API Integration: ", "Matching local consumer preferences in Kuwait, Giftora uses WhatsApp for post-purchase order tracking notifications, customer support, and B2B negotiation communications."),
      bulletBold("Physical Showroom — Salmiya, Kuwait: ", "A curated physical space where B2C customers can touch and feel materials and where B2B clients can attend consultations, view bulk samples, and arrange enterprise contracts."),
      blank(40),

      h2("2.3 Key Partners and Suppliers"),
      bullet("Local Kuwaiti Artisans and Food Suppliers — for premium chocolates, handmade trinkets, and culturally resonant gift items."),
      bullet("Wholesale Manufacturers — for bulk supply of blank mugs, notebooks, keychains, and premium paper packaging."),
      bullet("Third-Party Logistics (3PL) Courier Partners — for fulfilling 2-hour, same-day, and next-day delivery commitments across Kuwait's governorates."),
      bullet("Design Software Providers — for the in-house customization engine enabling real-time digital previews."),
      blank(40),

      h2("2.4 Main Competitors"),
      blank(40),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2340, 3510, 3510],
        rows: [
          new TableRow({ children: [
            headerCell("Competitor", 2340),
            headerCell("Strengths", 3510),
            headerCell("Weaknesses vs. Giftora", 3510),
          ]}),
          new TableRow({ children: [
            dataCell("Instagram Gifting Vendors", 2340, true),
            dataCell("Established local following; low overhead", 3510, true),
            dataCell("No online checkout; inconsistent quality; slow delivery; no personalization engine", 3510, true),
          ]}),
          new TableRow({ children: [
            dataCell("Mall Retail Stores (e.g., Faces, Virgin)", 2340),
            dataCell("Physical presence; brand recognition", 3510),
            dataCell("No customization; requires in-person visit; no delivery; generic mass-market products", 3510),
          ]}),
          new TableRow({ children: [
            dataCell("Zid & Salla Storefronts", 2340, true),
            dataCell("Easy storefront setup for SMBs", 3510, true),
            dataCell("Generic platform features; no gifting-specific UX; no integrated personalization or wrapping", 3510, true),
          ]}),
          new TableRow({ children: [
            dataCell("International Platforms (e.g., Notonthehighstreet)", 2340),
            dataCell("Strong personalization UX; wide catalog", 3510),
            dataCell("No Kuwait delivery; currency/language mismatch; no local cultural curation", 3510),
          ]}),
        ]
      }),
      blank(40),

      h2("2.5 Competitive Advantage"),
      p("Giftora's sustainable competitive advantage is built on the intersection of four capabilities that no single competitor currently combines in the Kuwaiti market:"),
      blank(40),
      bulletBold("Integrated End-to-End Experience: ", "Competitors either offer products without personalization, personalization without premium packaging, or products without reliable delivery. Giftora is the only platform in Kuwait that integrates all four: product curation, digital personalization, luxury packaging, and express delivery within a single seamless checkout."),
      bulletBold("Cultural and Local Curation: ", "Product selection, card messaging templates, and packaging aesthetics are specifically curated to reflect Kuwaiti cultural gifting traditions — including Eid, National Day, graduation season, and corporate milestones."),
      bulletBold("Superior Delivery Infrastructure: ", "The 2-hour and same-day delivery tiers, supported by a network of contracted 3PL partners, create a logistical moat that small Instagram vendors cannot replicate without significant capital investment."),
      bulletBold("B2B Revenue Diversification: ", "The corporate gifting arm provides predictable, high-volume revenue streams that insulate the business against seasonal B2C demand fluctuations."),

      // ══════════════════════════════════════════════════════════
      // SECTION 3: REVENUE MODEL
      // ══════════════════════════════════════════════════════════
      pageBreak(),
      h1("3. Revenue Model"),
      blank(40),
      p("Giftora's revenue model is anchored on a high-margin product sales strategy, augmented by value-added service charges and a structured B2B volume pricing tier. The selected revenue model is a Sales Revenue Model, with supplementary revenue streams from personalization service fees and delivery margin capture."),
      blank(40),

      h2("3.1 Primary Revenue Streams"),
      blank(40),
      bulletBold("1. Product Sales — Retail Markup (Primary): ", "Giftora purchases all inventory in bulk at wholesale prices and sells finished, packaged products at a significant premium. The gross margin across all product categories exceeds 65%, driven by the elevated perceived value of premium presentation and personalization. This is the core and dominant revenue mechanism."),
      blank(40),
      bulletBold("2. Personalization Service Fees (Secondary): ", "A surcharge is applied for individual customization requests: custom name or message engraving, photo printing, and bespoke label design. These fees typically range from 0.500 KD to 2.000 KD per personalization element, with near-zero marginal cost once the design system infrastructure is established."),
      blank(40),
      bulletBold("3. Delivery Charge Margin (Tertiary): ", "Giftora captures a positive margin on the difference between what customers pay for delivery and the actual 3PL courier cost per drop, enabled by route optimization and order bundling. Delivery pricing tiers are: Standard (2 KD), Next-Day Express (4 KD), and Same-Day Urgent (6 KD)."),
      blank(40),
      bulletBold("4. B2B Bulk Order Contracts (Supplementary): ", "Corporate clients are served under structured volume-based pricing agreements. While individual unit margins are slightly lower due to negotiated bulk discounts, the large order sizes (50–500+ units per engagement) generate predictable, high-cash-flow revenue streams on a recurring basis."),
      blank(40),

      h2("3.2 Unit Economics by Product Category"),
      blank(40),
      p("The following table illustrates the cost structure and gross margin profile across Giftora's core product lines:"),
      blank(60),

      new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [2200, 1430, 1430, 1500, 1500, 1300],
        rows: [
          new TableRow({ children: [
            headerCell("Product Category", 2200),
            headerCell("Raw Cost (KD)", 1430),
            headerCell("Pack & Labor (KD)", 1430),
            headerCell("Retail Price (KD)", 1500),
            headerCell("Gross Profit (KD)", 1500),
            headerCell("Margin (%)", 1300),
          ]}),
          new TableRow({ children: [
            dataCell("Personalized Mug", 2200, true),
            dataCell("0.600", 1430, true),
            dataCell("0.400", 1430, true),
            dataCell("3.500", 1500, true),
            dataCell("2.500", 1500, true),
            dataCell("71%", 1300, true, true),
          ]}),
          new TableRow({ children: [
            dataCell("Custom Notebook", 2200),
            dataCell("1.200", 1430),
            dataCell("0.500", 1430),
            dataCell("6.000", 1500),
            dataCell("4.300", 1500),
            dataCell("72%", 1300, false, true),
          ]}),
          new TableRow({ children: [
            dataCell("Premium Gift Box (Curated)", 2200, true),
            dataCell("6.500", 1430, true),
            dataCell("2.000", 1430, true),
            dataCell("22.000", 1500, true),
            dataCell("13.500", 1500, true),
            dataCell("61%", 1300, true, true),
          ]}),
          new TableRow({ children: [
            dataCell("Customized Accessories Pack", 2200),
            dataCell("3.000", 1430),
            dataCell("1.000", 1430),
            dataCell("12.500", 1500),
            dataCell("8.500", 1500),
            dataCell("68%", 1300, false, true),
          ]}),
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 5, borders: cellBorders,
                width: { size: 8060, type: WidthType.DXA },
                shading: { fill: BLUE, type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 140, right: 140 },
                children: [new Paragraph({ children: [new TextRun({ text: "Blended Average Gross Margin", font: FONT, size: 22, bold: true, color: "FFFFFF" })] })]
              }),
              new TableCell({
                borders: cellBorders, width: { size: 1300, type: WidthType.DXA },
                shading: { fill: GOLD, type: ShadingType.CLEAR },
                margins: { top: 80, bottom: 80, left: 140, right: 140 },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ">65%", font: FONT, size: 22, bold: true, color: "FFFFFF" })] })]
              }),
            ]
          }),
        ]
      }),
      blank(80),
      p("Note: All figures are in Kuwaiti Dinar (KD). Personalization surcharges are not included in the table above and represent additional gross profit over these baseline margins.", { italic: true, size: 20 }),
      blank(40),

      h2("3.3 Justification for Selected Revenue Model"),
      p("The Sales Revenue Model is the most appropriate primary mechanism for Giftora for the following reasons:"),
      blank(40),
      bulletBold("High-Margin Product Nature: ", "Gifting products derive a disproportionate share of their perceived value from presentation, personalization, and convenience rather than raw material cost. This structural characteristic makes a product markup model exceptionally suitable, as it captures the full willingness-to-pay of a convenience-driven consumer segment."),
      bulletBold("No Platform Dependency Risk: ", "Unlike transaction fee or advertising models, which require large marketplace volumes or third-party advertisers, the sales model generates direct revenue from each order independently — making it viable from day one with minimal user base requirements."),
      bulletBold("Supplementary Fee Compatibility: ", "The base sales model is naturally extensible with high-margin personalization service fees, which carry near-zero incremental cost once the design infrastructure is built. This layered approach maximizes revenue per order without adding operational complexity."),
      bulletBold("B2B Scalability: ", "The same sales model scales cleanly to corporate bulk orders, with structured volume discount tiers that maintain positive margins while enabling large, predictable revenue contracts."),
      blank(40),

      h2("3.4 Cost Structure"),
      p("The primary cost categories that underpin Giftora's financial model are:"),
      blank(40),
      bulletBold("Cost of Goods Sold (COGS): ", "Raw materials including blank mugs, notebooks, keychains, candles, chocolate boxes, premium paper boxes, ribbons, shredded paper filler, and greeting cards."),
      bulletBold("Customer Acquisition Cost (CAC): ", "Paid Instagram and TikTok advertising, influencer gifting seeding programs, and localized Google Search campaigns targeting high-intent gifting keywords."),
      bulletBold("Operating Expenses (OPEX): ", "Monthly showroom lease in Salmiya, website hosting and domain fees, design software subscriptions, and packaging staff wages."),
      bulletBold("Fulfillment Costs: ", "Per-drop payments to 3PL courier partners for standard, express, and same-day delivery runs across Kuwait's governorates."),

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
            headerCell("Student ID", 1800),
            headerCell("Name", 2400),
            headerCell("Contribution", 5160),
          ]}),
          ...[1,2,3,4].map((n, i) => new TableRow({ children: [
            dataCell(`[ID ${n}]`, 1800, i % 2 === 0),
            dataCell(`[Student Name ${n}]`, 2400, i % 2 === 0),
            dataCell("[Describe contribution — e.g., drafted Section 1 Business Idea, conducted market research, prepared unit economics table, etc.]", 5160, i % 2 === 0),
          ]}))
        ]
      }),
      blank(80),
      p("All group members reviewed and approved the final version of this report prior to submission.", { italic: true }),

      blank(80),
      h1("AI Use Acknowledgment"),
      blank(40),
      p("In accordance with QMIS 351 course guidelines, the group acknowledges that AI tools were used during the preparation of this report for purposes of brainstorming, structural outlining, and editorial refinement of language. All business ideas, analytical decisions, market insights, financial figures, and strategic conclusions presented in this report reflect the group's own independent work and judgment. The final analysis, business model design, and revenue model rationale were developed and verified by the group members."),

    ]
  }]
});

// ── Write to file ─────────────────────────────────────────────────────────────
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("Giftora_Deliverable1_Report.docx", buffer);
  console.log("✅ Document written successfully.");
}).catch(err => {
  console.error("❌ Error:", err);
  process.exit(1);
});
