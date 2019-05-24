export const filterPartsAndProducts = (searchCriteria, partsComplete, supplierProductsComplete) => {
  const { brand, supplier, partName, standard, stocked, partType } = searchCriteria;

  let brandToCheck;
  let supplierToCheck;
  let partTypeToCheck;
  let partNameToCheck;
  if (brand) brandToCheck = brand.toString();
  if (supplier) supplierToCheck = supplier.toString();
  if (partType) partTypeToCheck = partType.toString();
  if (brand) brandToCheck = brand.toString();
  if (partName) partNameToCheck = partName.toLowerCase();
  let parts = partsComplete.filter(part => {
    if (brand && !(part.brand.toString() === brandToCheck)) return false;
    if (partType && !(part.partType.toString() === partTypeToCheck)) return false;
    if (standard && !part.standard) return false;
    if (stocked && !part.stocked) return false;
    if (partName && !part.part_name.toLowerCase().includes(partNameToCheck)) return false;
    if (supplier) {
      const supplierProductsForSupplier = supplierProductsComplete.find(sp => {
        return sp.part === part.id && (sp.supplier && sp.supplier.toString() === supplierToCheck);
      });
      if (!supplierProductsForSupplier) return false;
    }
    return true;
  });
  const partIds = parts.map(part => part.id);
  const supplierProducts = supplierProductsComplete.filter(sp => partIds.includes(sp.part));
  return { parts, supplierProducts };
};
