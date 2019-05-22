export const filterPartsAndProducts = (searchCriteria, partsComplete, supplierProductsComplete) => {
  const { brand, supplier, partName, standard, stocked } = searchCriteria;
  let parts = partsComplete;
  let supplierProducts = supplierProductsComplete;
  if (supplier) {
    supplierProducts = supplierProducts.filter(
      sp => sp.supplier && sp.supplier.toString() === supplier,
    );
    parts = parts.filter(p => supplierProducts.some(sp => sp.part === p.id));
  }

  if (brand) parts = parts.filter(part => part.brand.toString() === brand);
  if (standard) parts = parts.filter(part => part.standard);
  if (stocked) parts = parts.filter(part => part.stocked);
  if (partName)
    parts = parts.filter(part => part.part_name.toLowerCase().includes(partName.toLowerCase()));
  const partIds = parts.map(part => part.id);
  supplierProducts = supplierProducts.filter(sp => partIds.includes(sp.part));
  return { parts, supplierProducts };
};
