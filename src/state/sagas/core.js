import history from '../../history';
import * as selectors from '../selectors/user';
import brand from './apis/brand';
import charges from './apis/chargeApi';
import questions from './apis/questionApi';
import supplier from './apis/supplier';
import {
  getCoreDataFailure,
  getBrandsFailure,
  getCoreDataSuccess,
  getBrandsSuccess,
  saveBrandsFailure,
  saveBrandsSuccess,
  saveSupplierSuccess,
  saveSupplierFailure,
  deleteSupplierSuccess,
  deleteSupplierFailure,
  BRANDS,
  CORE_DATA,
  SUPPLIER_DELETE,
  SUPPLIER_SAVE,
  BRANDS_SAVE,
  CHARGE_SAVE,
  CHARGE_DELETE,
  saveChargeFailure,
  saveChargeSuccess,
  deleteChargeSuccess,
  deleteChargeFailure,
  saveQuestionSuccess,
  saveQuestionFailure,
  deleteQuestionSuccess,
  deleteQuestionFailure,
  QUESTION_SAVE,
  QUESTION_DELETE,
} from '../actions/core';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { errorAsMessage, logError } from '../../helpers/api_error';
import { sortObjectsByAttribute, updateObject, updateObjectInArray } from '../../helpers/utils';
import { LOGIN_URL } from '../../helpers/routes';

export function* getCoreData(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const brandsResponse = yield call(brand.getBrands, completePayload);
      const chargesResponse = yield call(charges.getCharges, completePayload);
      const questionsResponse = yield call(questions.getQuestions, completePayload);
      const suppliersResponse = yield call(supplier.getSuppliers, completePayload);
      yield put(
        getCoreDataSuccess(
          brandsResponse.data,
          chargesResponse.data,
          questionsResponse.data,
          suppliersResponse.data,
        ),
      );
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(getCoreDataFailure('Get Brands and Suppliers Failed'));
  }
}
export function* getBrands(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const brandsResponse = yield call(brand.getBrands, completePayload);
      yield put(getBrandsSuccess(brandsResponse.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    // yield put(getCoreDataSuccess(sampleBrands, sampleSuppliers));
    logError(error);
    yield put(getBrandsFailure('Get Brands Failed'));
  }
}

export function* saveBrands(action) {
  try {
    const token = yield select(selectors.token);
    const brandsToSave = action.payload.filter(brand => brand.delete || brand.changed);
    let completeBrandsPostSave = action.payload.filter(brand => !brandsToSave.includes(brand));
    if (token) {
      if (brandsToSave.length > 0) {
        const completePayload = updateObject({ brands: brandsToSave }, { token });
        const saveBrandsResponse = yield call(brand.saveBrands, completePayload);
        saveBrandsResponse.data.forEach(
          returnedBrand =>
            (completeBrandsPostSave = updateObjectInArray(completeBrandsPostSave, returnedBrand)),
        );
      }
      completeBrandsPostSave = sortObjectsByAttribute(completeBrandsPostSave, 'brand_name');
      yield put(saveBrandsSuccess(completeBrandsPostSave));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(saveBrandsFailure('Save Brands Failed'));
  }
}

export function* saveCharge(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      let saveChargeResponse;
      if (action.payload.charge.id) {
        saveChargeResponse = yield call(charges.saveCharge, completePayload);
      } else {
        saveChargeResponse = yield call(charges.createCharge, completePayload);
      }
      yield put(saveChargeSuccess(saveChargeResponse.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(saveChargeFailure(errorAsMessage(error, 'Save Charge Failed')));
  }
}
export function* deleteCharge(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      yield call(charges.deleteCharge, completePayload);
      const chargesResponse = yield call(charges.getCharges, completePayload);
      yield put(deleteChargeSuccess(chargesResponse.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(deleteChargeFailure('Delete Charge Failed'));
  }
}
export function* saveQuestionSaga(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      let saveResponse;
      if (action.payload.question.id) {
        saveResponse = yield call(questions.saveQuestion, completePayload);
      } else {
        saveResponse = yield call(questions.createQuestion, completePayload);
      }
      yield put(saveQuestionSuccess(saveResponse.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(saveQuestionFailure(errorAsMessage(error, 'Save question Failed')));
  }
}
export function* deleteQuestion(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      yield call(questions.deleteQuestion, completePayload);
      const chargesResponse = yield call(questions.getQuestions, completePayload);
      yield put(deleteQuestionSuccess(chargesResponse.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    logError(error);
    yield put(deleteQuestionFailure('Delete question Failed'));
  }
}

export function* saveSupplier(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      let saveSupplierResponse;
      if (action.payload.supplier.id) {
        saveSupplierResponse = yield call(supplier.saveSupplier, completePayload);
      } else {
        saveSupplierResponse = yield call(supplier.createSupplier, completePayload);
      }
      yield put(saveSupplierSuccess(saveSupplierResponse.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    // yield put(getCoreDataSuccess(sampleBrands, sampleSuppliers));
    logError(error);
    yield put(saveSupplierFailure(errorAsMessage(error, 'Save Supplier Failed')));
  }
}

export function* deleteSupplier(action) {
  try {
    const token = yield select(selectors.token);
    if (token) {
      const completePayload = updateObject(action.payload, { token });
      const response = yield call(supplier.deleteSupplier, completePayload);
      yield put(deleteSupplierSuccess(response.data));
    } else {
      yield call(history.push, LOGIN_URL);
    }
  } catch (error) {
    // yield put(getCoreDataSuccess(sampleBrands, sampleSuppliers));
    logError(error);
    yield put(deleteSupplierFailure('Delete Supplier Failed'));
  }
}

export function* watchForGetCoreData() {
  yield takeLatest(`${CORE_DATA}_REQUESTED`, getCoreData);
}
export function* watchForGetBrands() {
  yield takeLatest(`${BRANDS}_REQUESTED`, getBrands);
}

export function* watchForSaveBrands() {
  yield takeLatest(`${BRANDS_SAVE}_REQUESTED`, saveBrands);
}
export function* watchForSaveCharge() {
  yield takeLatest(`${CHARGE_SAVE}_REQUESTED`, saveCharge);
}
export function* watchForDeleteCharge() {
  yield takeLatest(`${CHARGE_DELETE}_REQUESTED`, deleteCharge);
}
export function* watchForSaveQuestion() {
  yield takeLatest(`${QUESTION_SAVE}_REQUESTED`, saveQuestionSaga);
}
export function* watchForDeleteQuestion() {
  yield takeLatest(`${QUESTION_DELETE}_REQUESTED`, deleteQuestion);
}

export function* watchForSaveSupplier() {
  yield takeLatest(`${SUPPLIER_SAVE}_REQUESTED`, saveSupplier);
}

export function* watchForDeleteSupplier() {
  yield takeLatest(`${SUPPLIER_DELETE}_REQUESTED`, deleteSupplier);
}
