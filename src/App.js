import React, { useState } from "react";

const RefiningCalculator = () => {
  const [selectedProfession, setSelectedProfession] = useState("smelting");
  const [quantities, setQuantities] = useState({
    // Smelting
    prismaticIngot: 0,
    orichalcumIngot: 0,
    starmetalIngot: 0,
    steelIngot: 0,
    silverIngot: 0,
    ironIngot: 0,
    // Woodworking
    glitteringEbony: 0,
    ironwoodPlanks: 0,
    wyrdwoodPlanks: 0,
    hardwoodPlanks: 0,
    lumber: 0,
    // Weaving
    phoenixweave: 0,
    infusedSilk: 0,
    silkThread: 0,
    sateen: 0,
    linenThread: 0,
    // Stonecutting
    runestone: 0,
    lodestone: 0,
    obsidian: 0,
    crystalCore: 0,
    stone: 0,
  });

  const recipes = {
    smelting: {
      prismaticIngot: {
        orichalcumIngot: 2,
        voidOre: 8,
        voidEssence: 1,
        deathMote: 1,
      },
      orichalcumIngot: {
        orichalcumOre: 8,
        starmetalIngot: 2,
        charcoal: 2,
      },
      starmetalIngot: {
        starmetalOre: 6,
        steelIngot: 2,
        charcoal: 1,
      },
      steelIngot: {
        ironOre: 3,
        charcoal: 2,
      },
      silverIngot: {
        silverOre: 4,
        charcoal: 1,
      },
      ironIngot: {
        ironOre: 4,
        charcoal: 2,
      },
    },
    woodworking: {
      glitteringEbony: {
        ironwoodPlanks: 2,
        ironwoodLogs: 8,
        sandpaper: 1,
        deathMote: 1,
      },
      ironwoodPlanks: {
        ironwoodLogs: 6,
        wyrdwoodPlanks: 2,
        sandpaper: 1,
      },
      wyrdwoodPlanks: {
        wyrdwoodLogs: 6,
        hardwoodPlanks: 2,
        sandpaper: 1,
      },
      hardwoodPlanks: {
        greenWood: 4,
        lumber: 2,
        sandpaper: 1,
      },
      lumber: {
        greenWood: 4,
        sandpaper: 1,
      },
    },
    weaving: {
      phoenixweave: {
        infusedSilk: 2,
        silkfiber: 8,
        wireweaver: 1,
        deathMote: 1,
      },
      infusedSilk: {
        silkfiber: 6,
        silkThread: 2,
        wireweaver: 1,
      },
      silkThread: {
        silkfiber: 6,
        sateen: 2,
        wireweaver: 1,
      },
      sateen: {
        fiber: 4,
        linenThread: 2,
        wireweaver: 1,
      },
      linenThread: {
        fiber: 4,
        wireweaver: 1,
      },
    },
    stonecutting: {
      runestone: {
        lodestone: 2,
        lodestoneBrick: 8,
        stonechisels: 1,
        deathMote: 1,
      },
      lodestone: {
        lodestoneBrick: 6,
        obsidian: 2,
        stonechisels: 1,
      },
      obsidian: {
        obsidianBrick: 6,
        crystalCore: 2,
        stonechisels: 1,
      },
      crystalCore: {
        stone: 4,
        stoneBrick: 2,
        stonechisels: 1,
      },
      stone: {
        stoneBrick: 4,
        stonechisels: 1,
      },
    },
  };

  const calculateTotalMaterials = (profession) => {
    const professionRecipes = recipes[profession];
    let totals = {};

    // Initialize totals with all possible materials
    Object.values(professionRecipes).forEach((recipe) => {
      Object.keys(recipe).forEach((material) => {
        totals[material] = 0;
      });
    });

    // Calculate for each product
    Object.entries(quantities).forEach(([product, quantity]) => {
      if (professionRecipes[product]) {
        Object.entries(professionRecipes[product]).forEach(
          ([material, amount]) => {
            totals[material] = (totals[material] || 0) + quantity * amount;
          }
        );
      }
    });

    return totals;
  };

  const handleQuantityChange = (product, value) => {
    setQuantities({
      ...quantities,
      [product]: Math.max(0, parseInt(value) || 0),
    });
  };

  const totals = calculateTotalMaterials(selectedProfession);

  return (
    <div className="w-full max-w-4xl p-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">
          New World - Refining Calculator
        </h2>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Select Profession:
            <select
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="ml-2 p-1 border rounded"
            >
              <option value="smelting">Smelting</option>
              <option value="woodworking">Woodworking</option>
              <option value="weaving">Weaving</option>
              <option value="stonecutting">Stonecutting</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {Object.entries(recipes[selectedProfession]).map(([product]) => (
            <div key={product} className="flex flex-col">
              <label className="text-sm font-medium mb-1 capitalize">
                {product.replace(/([A-Z])/g, " $1").trim()}:
              </label>
              <input
                type="number"
                min="0"
                value={quantities[product] || 0}
                onChange={(e) => handleQuantityChange(product, e.target.value)}
                className="p-1 border rounded"
              />
            </div>
          ))}
        </div>

        <h3 className="text-lg font-medium mb-2">Required Materials:</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2 border">Material</th>
                <th className="text-left p-2 border">Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(totals).map(
                ([material, quantity]) =>
                  quantity > 0 && (
                    <tr key={material}>
                      <td className="p-2 border capitalize">
                        {material.replace(/([A-Z])/g, " $1").trim()}
                      </td>
                      <td className="p-2 border">{quantity}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Base Recipes:</h3>
          <div className="bg-gray-100 p-4 rounded-lg space-y-4">
            {Object.entries(recipes[selectedProfession]).map(
              ([product, recipe]) => (
                <div key={product} className="mb-2">
                  <p className="font-medium capitalize">
                    {product.replace(/([A-Z])/g, " $1").trim()}:
                  </p>
                  {Object.entries(recipe).map(([material, quantity]) => (
                    <code key={material} className="block text-sm">
                      {quantity} {material.replace(/([A-Z])/g, " $1").trim()}
                    </code>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefiningCalculator;
