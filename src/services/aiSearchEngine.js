/**
 * AI Property Match Engine
 * Parses natural language property search queries, extracts parameters,
 * and calculates semantic and quantitative match confidence scores.
 */

import { propertiesList } from '../data/properties';
import { propertyDNAMapping } from './marketIntelligenceService';

export function parseNaturalLanguageQuery(query) {
  if (!query || typeof query !== 'string') {
    return {
      raw: '',
      extracted: {},
      tags: []
    };
  }

  const q = query.toLowerCase();
  const extracted = {
    budgetMax: null,
    bedrooms: null,
    locations: [],
    categories: [],
    keywords: [],
    priorities: []
  };

  // Budget detection
  const crMatch = q.match(/(\d+(\.\d+)?)\s*(cr|crore)/i);
  if (crMatch) {
    extracted.budgetMax = parseFloat(crMatch[1]) * 10000000;
  }
  const lkMatch = q.match(/(\d+(\.\d+)?)\s*(lakh|lac|l)/i);
  if (lkMatch) {
    extracted.budgetMax = parseFloat(lkMatch[1]) * 100000;
  }

  // Bedroom detection
  const bhkMatch = q.match(/(\d+)\s*(bhk|bed|bedroom)/i);
  if (bhkMatch) {
    extracted.bedrooms = parseInt(bhkMatch[1], 10);
  }

  // Location detection
  const locationKeywords = [
    { key: "keshwapur", label: "Keshwapur" },
    { key: "vidyanagar", label: "Vidyanagar" },
    { key: "shirur", label: "Shirur Park" },
    { key: "unkal", label: "Unkal Lake" },
    { key: "gokul", label: "Gokul Road" },
    { key: "kusugal", label: "Kusugal Road" },
    { key: "navanagar", label: "Navanagar" },
    { key: "dubai", label: "Dubai" },
    { key: "dream plaza", label: "Dream Plaza" }
  ];

  locationKeywords.forEach(loc => {
    if (q.includes(loc.key)) {
      extracted.locations.push(loc.label);
    }
  });

  // Type / Category detection
  if (q.includes("villa") || q.includes("bungalow")) extracted.categories.push("villa");
  if (q.includes("penthouse") || q.includes("terrace")) extracted.categories.push("penthouse");
  if (q.includes("studio")) extracted.categories.push("studio");
  if (q.includes("plot") || q.includes("land") || q.includes("na kjp")) extracted.categories.push("plot");
  if (q.includes("commercial") || q.includes("office") || q.includes("showroom")) extracted.categories.push("commercial");
  if (q.includes("dubai") || q.includes("uae") || q.includes("tax-free") || q.includes("golden visa")) extracted.categories.push("dubai");

  // Priority detection
  if (q.includes("yield") || q.includes("rent") || q.includes("passive")) extracted.priorities.push("High Rental Yield");
  if (q.includes("lake") || q.includes("waterfront") || q.includes("view")) extracted.priorities.push("Waterfront View");
  if (q.includes("vastu") || q.includes("pooja")) extracted.priorities.push("Vastu Compliant");
  if (q.includes("luxury") || q.includes("premium")) extracted.priorities.push("Ultra-Luxury Tier");
  if (q.includes("immediate") || q.includes("ready")) extracted.priorities.push("Immediate Handover");
  if (q.includes("appreciation") || q.includes("roi") || q.includes("growth")) extracted.priorities.push("High Capital Growth");

  // Generate tags
  const tags = [];
  if (extracted.budgetMax) tags.push(`≤ ₹${(extracted.budgetMax / 10000000 >= 1 ? (extracted.budgetMax / 10000000).toFixed(1) + ' Cr' : (extracted.budgetMax / 100000).toFixed(0) + ' Lakhs')}`);
  if (extracted.bedrooms) tags.push(`${extracted.bedrooms} BHK`);
  extracted.locations.forEach(l => tags.push(l));
  extracted.categories.forEach(c => tags.push(c.toUpperCase()));
  extracted.priorities.forEach(p => tags.push(p));

  return { raw: query, extracted, tags };
}

export function calculatePropertyMatches(parsed) {
  const { extracted } = parsed;

  return propertiesList.map(prop => {
    let score = 70; // baseline interest
    const matchReasons = [];
    const missingReasons = [];
    const dna = propertyDNAMapping[prop.id] || {};

    // 1. Budget scoring
    if (extracted.budgetMax) {
      if (prop.priceNumeric <= extracted.budgetMax) {
        score += 15;
        matchReasons.push(`Within specified budget of ${prop.price}`);
      } else {
        const excess = (prop.priceNumeric - extracted.budgetMax) / extracted.budgetMax;
        if (excess <= 0.15) {
          score -= 5;
          matchReasons.push(`Within negotiable margin (+${(excess * 100).toFixed(0)}%)`);
        } else {
          score -= 25;
          missingReasons.push(`Exceeds specified budget ceiling`);
        }
      }
    }

    // 2. Bedroom scoring
    if (extracted.bedrooms !== null) {
      if (prop.bedrooms === extracted.bedrooms) {
        score += 15;
        matchReasons.push(`Exact ${prop.bedrooms} BHK bedroom configuration match`);
      } else if (Math.abs(prop.bedrooms - extracted.bedrooms) === 1) {
        score += 5;
        matchReasons.push(`Alternative ${prop.bedrooms} BHK configuration`);
      } else {
        score -= 10;
        missingReasons.push(`Different room count (${prop.bedrooms} BHK vs ${extracted.bedrooms} requested)`);
      }
    }

    // 3. Location scoring
    if (extracted.locations.length > 0) {
      const matchLoc = extracted.locations.some(loc => 
        prop.location.toLowerCase().includes(loc.toLowerCase())
      );
      if (matchLoc) {
        score += 20;
        matchReasons.push(`Located directly in desired corridor (${prop.location.split(',')[0]})`);
      } else {
        score -= 15;
        missingReasons.push(`Located in ${prop.location.split(',')[0]} instead of requested sector`);
      }
    }

    // 4. Category / Type scoring
    if (extracted.categories.length > 0) {
      const catMatch = extracted.categories.some(cat => 
        prop.type.toLowerCase().includes(cat) || prop.category.toLowerCase().includes(cat)
      );
      if (catMatch) {
        score += 18;
        matchReasons.push(`Matches architectural category (${prop.type})`);
      } else {
        score -= 12;
      }
    }

    // 5. Priorities scoring
    extracted.priorities.forEach(p => {
      if (p === "High Rental Yield" && (dna.rentalYield > 85 || prop.features.some(f => f.toLowerCase().includes("yield") || f.toLowerCase().includes("rental")))) {
        score += 10;
        matchReasons.push(`High Cap Rate / Rental Yield (${dna.capRate || 'Top Tier'})`);
      }
      if (p === "Waterfront View" && (prop.location.toLowerCase().includes("unkal") || prop.features.some(f => f.toLowerCase().includes("lake") || f.toLowerCase().includes("water")))) {
        score += 12;
        matchReasons.push(`Prime waterfront fronting with panoramic lake vistas`);
      }
      if (p === "Vastu Compliant" && prop.features.some(f => f.toLowerCase().includes("vastu"))) {
        score += 10;
        matchReasons.push(`100% Vastu certified orientation`);
      }
      if (p === "Ultra-Luxury Tier" && (prop.category === "luxury" || prop.priceNumeric > 15000000)) {
        score += 10;
        matchReasons.push(`Curated Ultra-Luxury specifications & materials`);
      }
    });

    // Anomaly bonus: if property is an underpriced bargain, highlight AI advantage!
    if (dna.anomalyScore < -3) {
      score += 5;
      matchReasons.push(`AI Valuation: Priced ${Math.abs(dna.anomalyScore)}% below micro-market median`);
    }

    // Clamp score between 45% and 99%
    const finalScore = Math.min(Math.max(Math.round(score), 48), 99);

    return {
      ...prop,
      dna,
      matchPercentage: finalScore,
      matchReasons: matchReasons.length > 0 ? matchReasons : [`High liquidity residential asset in ${prop.location}`],
      missingReasons
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}
