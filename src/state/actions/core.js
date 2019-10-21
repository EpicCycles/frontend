export const CORE_DATA = 'core/CORE_DATA';
export const BRANDS = 'core/BRANDS';
export const BRANDS_SAVE = 'core/BRANDS_SAVE';
export const BRAND_SAVE = 'core/BRAND_SAVE';
export const BRAND_DELETE = 'core/BRAND_DELETE';
export const BRANDS_UPDATE = 'core/BRANDS_UPDATE';
export const CHARGE_SAVE = 'core/CHARGE_SAVE';
export const CHARGE_DELETE = 'core/CHARGE_DELETE';
export const QUESTION_SAVE = 'core/QUESTION_SAVE';
export const QUESTION_DELETE = 'core/QUESTION_DELETE';
export const SUPPLIER_SAVE = 'core/SUPPLIER_SAVE';
export const SUPPLIER_DELETE = 'core/SUPPLIER_DELETE';
export const saveBrand = brand => ({
  type: `${BRAND_SAVE}_REQUESTED`,
  payload: { brand },
});
export const saveBrandOK = brand => ({
  type: `${BRAND_SAVE}_OK`,
  payload: { brand },
});
export const saveBrandError = payload => ({
  type: `${BRAND_SAVE}_ERROR`,
  payload: payload,
});
export const deleteBrand = brandId => ({
  type: `${BRAND_DELETE}_REQUESTED`,
  payload: { brandId },
});
export const deleteBrandOK = brandId => ({
  type: `${BRAND_SAVE}_OK`,
  payload: { brandId },
});
export const deleteBrandError = error => ({
  type: `${BRAND_SAVE}_ERROR`,
  payload: error,
});
export const getCoreData = () => ({
  type: `${CORE_DATA}_REQUESTED`,
  payload: {},
});

export const getCoreDataSuccess = (brands, charges, questions, suppliers) => ({
  type: `${CORE_DATA}_OK`,
  payload: { brands, charges, questions, suppliers },
});

export const getCoreDataFailure = error => ({
  type: `${CORE_DATA}_ERROR`,
  payload: error,
});
export const getBrands = () => ({
  type: `${BRANDS}_REQUESTED`,
  payload: {},
});

export const getBrandsSuccess = brands => ({
  type: `${BRANDS}_OK`,
  payload: { brands },
});

export const getBrandsFailure = error => ({
  type: `${CORE_DATA}_ERROR`,
  payload: error,
});

export const updateBrands = brands => ({
  type: `${BRANDS}_UPDATE`,
  payload: brands,
});

export const saveBrands = brands => ({
  type: `${BRANDS_SAVE}_REQUESTED`,
  payload: brands,
});

export const saveBrandsSuccess = brands => ({
  type: `${BRANDS_SAVE}_OK`,
  payload: brands,
});

export const saveBrandsFailure = error => ({
  type: `${BRANDS_SAVE}_ERROR`,
  payload: error,
});

export const saveCharge = charge => ({
  type: `${CHARGE_SAVE}_REQUESTED`,
  payload: { charge },
});
export const addCharge = charge => ({
  type: `${CHARGE_SAVE}_ADD`,
  payload: { charge },
});
export const saveChargeSuccess = charges => ({
  type: `${CHARGE_SAVE}_OK`,
  payload: charges,
});

export const saveChargeFailure = error => ({
  type: `${CHARGE_SAVE}_ERROR`,
  payload: error,
});
export const deleteCharge = chargeId => ({
  type: `${CHARGE_DELETE}_REQUESTED`,
  payload: { chargeId },
});
export const deleteChargeSuccess = charges => ({
  type: `${CHARGE_DELETE}_OK`,
  payload: charges,
});

export const deleteChargeFailure = error => ({
  type: `${CHARGE_DELETE}_ERROR`,
  payload: error,
});

export const saveQuestion = question => ({
  type: `${QUESTION_SAVE}_REQUESTED`,
  payload: { question },
});
export const addQuestion = question => ({
  type: `${QUESTION_SAVE}_ADD`,
  payload: { question },
});
export const saveQuestionSuccess = questions => ({
  type: `${QUESTION_SAVE}_OK`,
  payload: questions,
});

export const saveQuestionFailure = error => ({
  type: `${QUESTION_SAVE}_ERROR`,
  payload: error,
});
export const deleteQuestion = questionId => ({
  type: `${QUESTION_DELETE}_REQUESTED`,
  payload: { questionId },
});
export const deleteQuestionSuccess = questions => ({
  type: `${QUESTION_DELETE}_OK`,
  payload: questions,
});

export const deleteQuestionFailure = error => ({
  type: `${QUESTION_DELETE}_ERROR`,
  payload: error,
});

export const saveSupplier = supplier => ({
  type: `${SUPPLIER_SAVE}_REQUESTED`,
  payload: { supplier },
});
export const saveSupplierSuccess = suppliers => ({
  type: `${SUPPLIER_SAVE}_OK`,
  payload: suppliers,
});

export const saveSupplierFailure = error => ({
  type: `${SUPPLIER_SAVE}_ERROR`,
  payload: error,
});
export const deleteSupplier = supplierId => ({
  type: `${SUPPLIER_DELETE}_REQUESTED`,
  payload: { supplierId },
});
export const deleteSupplierSuccess = suppliers => ({
  type: `${SUPPLIER_DELETE}_OK`,
  payload: suppliers,
});

export const deleteSupplierFailure = error => ({
  type: `${SUPPLIER_DELETE}_ERROR`,
  payload: error,
});
