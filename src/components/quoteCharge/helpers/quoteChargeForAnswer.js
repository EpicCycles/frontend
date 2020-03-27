import { findObjectWithId } from '../../../helpers/utils';
import { updateModelArrayOnModel } from '../../app/model/helpers/updateModelArrayOnModel';
import { quoteChargeFieldsBasic } from './quoteChargeFields';
import { quotePrice } from '../../quote/helpers/quotePrice';

export const quoteChargeForAnswer = (quote, answer, questions, charges) => {
  if (!answer.answer) {
    return quote;
  }

  const question = findObjectWithId(questions, answer.question);
  if (question && question.charge) {
    const charge = findObjectWithId(charges, question.charge);
    if (charge) {
      const quoteCharge = quote.charges
        ? quote.charges.find(qc => qc.charge === charge.id)
        : undefined;
      if (!quoteCharge) {
        const newQuoteCharge = { charge: charge.id };
        if (charge.price) {
          newQuoteCharge.price = charge.price;
        }
        const quoteWithCharge = updateModelArrayOnModel(
          quote,
          'charges',
          quoteChargeFieldsBasic,
          newQuoteCharge,
        );
        return quotePrice(quoteWithCharge, undefined, charges);
      }
    }
  }
  return quote;
};
//    if quote_answer.answer is True:
//         if quote_answer.question.charge:
//             if not QuoteCharge.objects.filter(quote=quote_answer.quote,
//             charge=quote_answer.question.charge).exists():
//                 charge_price = quote_answer.question.charge.price
//                 if quote_answer.question.charge.percentage:
//                     quote_total = quote_answer.quote.calculated_price
//                     + quote_answer.quote.fixed_price_total
//                     if quote_answer.quote.quote_price:
//                         quote_total = quote_answer.quote.quote_price
//                         + quote_answer.quote.fixed_price_total
//                     charge_price = quote_total * quote_answer.question.charge.percentage / 100
//
//                 quote_charge = QuoteCharge(quote=quote_answer.quote
//                 , charge=quote_answer.question.charge,
//                                            price=charge_price)
//                 quote_charge.save()
//                 create_note_for_quote_charge(quote_charge, user, 'Auto added')
